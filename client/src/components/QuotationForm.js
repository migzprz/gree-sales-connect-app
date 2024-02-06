import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaFilter, FaSort, FaSearch, FaSave} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table } from 'react-bootstrap';
import '../index.css';
import OfferSelection from './QuotationComponents/OfferSelection';
import ClientSelection from './QuotationComponents/ClientSelection';
import TermsAndConditions from './QuotationComponents/TermsAndConditions';

const QuotationForm = () => {
  const [hasItems, setHasItems] = useState(true);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [selectionType, setSelectionType] = useState('offer'); // Default to offer selection

  const handleOfferSubmission = () => {
    setSelectionType('client');
  };

// Sample data for different products and services
const offerList = [
    {
      name: '1.5HP Split Type Inverter',
      code: 'GW12-6DR',
      price: 'Php 36,999.00',
      type: 'Split-type',
    },
    {
      name: 'Product 2',
      code: 'DEF-56789',
      price: 'Php 45,000.00',
      type: 'Window-type',
    },
    {
      name: 'Service 1',
      code: 'SRV-98765',
      price: 'Php 10,000.00',
      type: 'Service',
    },
    {
      name: 'Part 1',
      code: 'PART-12345',
      price: 'Php 5,000.00',
      type: 'Parts',
    },
    {
      name: 'Product 3',
      code: 'GHI-54321',
      price: 'Php 75,000.00',
      type: 'Split-type',
    },
    {
      name: 'Product 4',
      code: 'JKL-67890',
      price: 'Php 55,000.00',
      type: 'Window-type',
    },
    {
      name: 'Service 2',
      code: 'SRV-54321',
      price: 'Php 15,000.00',
      type: 'Service',
    },
    {
      name: 'Part 2',
      code: 'PART-67890',
      price: 'Php 8,000.00',
      type: 'Parts',
    },
    {
      name: 'Product 5',
      code: 'MNO-98765',
      price: 'Php 70,000.00',
      type: 'Split-type',
    },
    {
      name: 'Product 6',
      code: 'PQR-54321',
      price: 'Php 50,000.00',
      type: 'Window-type',
    },
    {
      name: 'Service 3',
      code: 'SRV-34567',
      price: 'Php 12,000.00',
      type: 'Service',
    },
    {
      name: 'Part 3',
      code: 'PART-87654',
      price: 'Php 7,000.00',
      type: 'Parts',
    },
    {
      name: 'Product 7',
      code: 'STU-12345',
      price: 'Php 80,000.00',
      type: 'Split-type',
    },
    {
      name: 'Product 8',
      code: 'VWX-67890',
      price: 'Php 60,000.00',
      type: 'Window-type',
    },
    {
      name: 'Service 4',
      code: 'SRV-87654',
      price: 'Php 18,000.00',
      type: 'Service',
    },
    {
      name: 'Part 4',
      code: 'PART-23456',
      price: 'Php 9,000.00',
      type: 'Parts',
    },
    {
      name: 'Product 9',
      code: 'YZA-98765',
      price: 'Php 90,000.00',
      type: 'Split-type',
    },
    {
      name: 'Product 10',
      code: 'BCD-54321',
      price: 'Php 70,000.00',
      type: 'Window-type',
    },
    {
      name: 'Service 5',
      code: 'SRV-56789',
      price: 'Php 20,000.00',
      type: 'Service',
    },
    {
      name: 'Part 5',
      code: 'PART-65432',
      price: 'Php 12,000.00',
      type: 'Parts',
    },
  ];
  

  return (
    <div style={{ width: '100%', padding: '20px', background: '#E5EDF4', color: '#014c91' }}>
      <h1>Generate a New Quotation</h1>

      {selectionType === 'offer' && <OfferSelection offerList={offerList} onOfferSubmission={handleOfferSubmission}/>}
      {selectionType === 'client' && <ClientSelection/>}
      {selectionType === 'terms' && <TermsAndConditions/>}

    </div>
  );
};

export default QuotationForm;
