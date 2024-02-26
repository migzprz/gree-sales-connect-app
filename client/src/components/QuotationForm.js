import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table } from 'react-bootstrap';
import '../index.css';
import OfferSelection from './QuotationComponents/OfferSelection';
import ClientSelection from './QuotationComponents/ClientSelection';
import TermsAndConditions from './QuotationComponents/TermsAndConditions';
import useProducts from '../hooks/useProducts';

const QuotationForm = () => {
  const [hasItems, setHasItems] = useState(true);
  const [validated, setValidated] = useState(false);
  const { products } = useProducts()

  const [offerData, setOfferData] = useState({})
  const [clientData, setClientData] = useState({})
  const [termsData, setTermsData] = useState({})

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
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
  }



  

  return (
    <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91' }}>
      <h1>Generate a New Quotation</h1>

      {selectionType === 'offer' && <OfferSelection offerList={products} onOfferSubmission={handleOfferSubmission} />}
      {selectionType === 'client' && <ClientSelection onClientSubmission={handleClientSubmission}/>}
      {selectionType === 'terms' && <TermsAndConditions/>}

    </div>
  );
};

export default QuotationForm;
