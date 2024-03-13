import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table } from 'react-bootstrap';
import '../index.css';
import OfferSelection from './QuotationComponents/OfferSelection';
import ClientSelection from './QuotationComponents/ClientSelection';
import TermsAndConditions from './QuotationComponents/TermsAndConditions';
import useProducts from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PreviewQuotation from './PreviewQuotation';
import { useParams } from 'react-router-dom';

const QuotationForm = () => {

  const navigate = useNavigate()
  const { id } = useParams();

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
      } else {
        console.log('Posting new client data...')
        const response = await axios.post('http://localhost:4000/api/postOcular/0', clientData)
        client_id = response.data.data
      }

      const data = {
        offer: offerData,
        terms: termsData,
        id: client_id
      }

      const postReponse = await axios.post('http://localhost:4000/api/postQuotation/', data)
      console.log(postReponse)
      navigate('/viewquotations')

    } catch (error) {
      console.error('Error: Problem encountered when posting data', error)
    }

    setValidated(true);
  };

  const handleOfferSubmission = (data) => {
    setOfferData(data)
    id ? setSelectionType('terms') : setSelectionType('client')
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
      <h1>Generate a New Quotation</h1>

      {selectionType === 'offer' && <OfferSelection offerList={offer} onOfferSubmission={handleOfferSubmission} />}
      {selectionType === 'client' && <ClientSelection onClientSubmission={handleClientSubmission}/>}
      {selectionType === 'terms' && <TermsAndConditions onTermsSubmission={handleGetTermsData}/>}
      {selectionType === 'download' && <PreviewQuotation offers={offerData} terms={termsData} client={clientData} POST={handleSubmit}/>}

    </div>
  );
};

export default QuotationForm;
