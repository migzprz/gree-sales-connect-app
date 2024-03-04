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

const QuotationForm = () => {

  const navigate = useNavigate()

  const [hasItems, setHasItems] = useState(true);
  const [validated, setValidated] = useState(false);
  const { products } = useProducts()

  const [offerData, setOfferData] = useState({})
  const [clientData, setClientData] = useState({})
  const [termsData, setTermsData] = useState({})

  const handleSubmit = async () => {

    let id

    try {
      const response = await axios.post('http://localhost:4000/api/postOcular/0', clientData)
      const result = await response.json()

      if (response.ok) {
        id = result.data
      }
    } catch (error) {
      console.error('Error: Problem encountered when posting data', error)
    }

    const data = {
      offer: offerData,
      client: clientData,
      terms: termsData,
      id: id
    }

    try {
      const postReponse = await axios.post('http://localhost:4000/api/postQuotation/', data)
      console.log(postReponse)
      // navigate('/viewoculars')
    } catch (error) {
      console.error('Error: Problem encountered when posting data', error)
    }

    setValidated(true);
  };

  const [selectionType, setSelectionType] = useState('offer'); // Default to offer selection

  const handleOfferSubmission = (data) => {
    setSelectionType('client');
    setOfferData(data)
  };

  const handleClientSubmission = (data) => {
    setSelectionType('terms');
    setClientData(data)
  };

  const handleGetTermsData = (data) => {
    setTermsData(data)
    handleSubmit()
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

  

  return (
    <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91' }}>
      <h1>Generate a New Quotation</h1>

      {selectionType === 'offer' && <OfferSelection offerList={products} onOfferSubmission={handleOfferSubmission} />}
      {selectionType === 'client' && <ClientSelection onClientSubmission={handleClientSubmission}/>}
      {selectionType === 'terms' && <TermsAndConditions onTermsSubmission={handleGetTermsData}/>}

    </div>
  );
};

export default QuotationForm;
