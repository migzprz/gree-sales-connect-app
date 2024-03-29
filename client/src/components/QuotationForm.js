import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import '../index.css';
import OfferSelection from './QuotationComponents/OfferSelection';
import ClientSelection from './QuotationComponents/ClientSelection';
import TermsAndConditions from './QuotationComponents/TermsAndConditions';
import useProducts from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PreviewQuotation from './PreviewQuotation';
import { useParams, useSearchParams } from 'react-router-dom';

const QuotationForm = () => {

  const navigate = useNavigate()
  const { id } = useParams();


  const [searchParams] = useSearchParams()
  const salesId = searchParams.get('sales')
  const type = searchParams.get('type')
  const quoId = searchParams.get('id')

  useEffect(() => {
    if (type === 'view') {
      const fetchData = async () => {
        try {
            const res = (await axios.get(`http://localhost:4000/api/getQuotationDetailsById/${id}`)).data
            setClientData((res.client)[0])
            setOfferData(res.quotation)
            setTermsData(res.term[0])
            setSelectionType('download')
        } catch (error) {
            console.log(error)
        }
    }
    fetchData()
    }
  }, [type])

  const [hasItems, setHasItems] = useState(true);
  const [validated, setValidated] = useState(false);
  const { products, services, parts } = useProducts()
  const offer = { products, services, parts }

  const [offerData, setOfferData] = useState({})
  const [clientData, setClientData] = useState({})
  const [termsData, setTermsData] = useState({})

  const [selectionType, setSelectionType] = useState('offer'); // Default to offer selection

  const handleSubmit = async () => {

    let client_id 
    console.log(offerData, clientData, termsData)
    try {

      if (id) {
        console.log('ID in param detected, search quotation client id')
        const response = await axios.get(`http://localhost:4000/api/getQuoClientIdByOcularId/${id}`);

        client_id = response.data[0].quotation_client_id
      } 
      else if (salesId) {
        console.log('Adding additional quotation for existing sales record, searching quotation client id')
        const response = await axios.get(`http://localhost:4000/api/getQuoClientIdBySalesId/${salesId}`);

        client_id = response.data[0].quotation_client_id
      } 
      else if (type === 'edit') {
        console.log('Editing eixsting quotation recrod... fetching client id')
        const response = await axios.get(`http://localhost:4000/api/getQuoClientIdByQuoId/${quoId}`);

        client_id = response.data[0].quotation_client_id
      } 
      else {
        console.log('Posting new client data...')
        const response = await axios.post('http://localhost:4000/api/postOcular/0', clientData)
        
        client_id = response.data.data
      }

      const data = {
        offer: offerData,
        terms: termsData,
        id: client_id,
        sales_id: salesId
      }

      console.log('POST DATA FOR QUOTATION SUBMISSION', data)
      
      const postReponse = await axios.post('http://localhost:4000/api/postQuotation/', data)

      // cancel id in search parameter if type is edit
      if (type === 'edit') {
        console.log('Successfully posted edited quotation, cancelling old record')
        const cancelResponse = await axios.patch(`http://localhost:4000/api/cancelQuotation/${quoId}`)
        console.log(cancelResponse)
      }

      console.log(postReponse)

      if (salesId) {
        navigate(`/generateinvoice?id=${postReponse.data.quotation_id}&type=add&sales=${salesId}`)
      } else {
        navigate('/viewquotations')
      }

    } catch (error) {
      console.error('Error: Problem encountered when posting data', error)
    }

    setValidated(true);
  };

  const handleOfferSubmission = (data) => {
    setOfferData(data)
    id || salesId || type==='edit' ? setSelectionType('terms') : setSelectionType('client')
  };

  const handleClientSubmission = (data) => {
    setClientData(data)
    setSelectionType('terms');
  };

  const handleGetTermsData = (data) => {
    setTermsData(data)
    setSelectionType('download');
  }

  useEffect(() => {
    console.log('Offer data passed to parent', offerData)
  }, [offerData])
  useEffect(() => {
    console.log('Client data passed to parent', clientData)
  }, [clientData])
  useEffect(() => {
    console.log('Terms data passed to parent', termsData)
  }, [termsData])
  useState(() => {
    console.log(selectionType)
  }, [selectionType])

  const displayHeader = () => {
    if (type === 'edit') {
      return 'Editing Existing Record'
    } else if (type === 'add' || salesId) {
      return 'Adding Quotation to Existing Sales Record'
    } else if (type === 'view') {
      return 'View Quotation'
    } else {
      return 'Generate A New Quotation'
    }
  }
  
  useEffect(() => {
    if (id) {
      console.log('ID detected from Ocular Conversion!!')
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:4000/api/getOcular/${id}`)
          console.log(res.data)
          setClientData(res.data[0])
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    }
  }, [id])

  return (
    <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91' }}>
      <h1>{displayHeader()}</h1>

      {selectionType === 'offer' && <OfferSelection offerList={offer} onOfferSubmission={handleOfferSubmission} type={type} id={quoId} />}
      {selectionType === 'client' && <ClientSelection onClientSubmission={handleClientSubmission}/>}
      {selectionType === 'terms' && <TermsAndConditions onTermsSubmission={handleGetTermsData}/>}
      {selectionType === 'download' && <PreviewQuotation offers={offerData} terms={termsData} client={clientData} POST={handleSubmit} type={type}/>}

    </div>
  );
};

export default QuotationForm;
