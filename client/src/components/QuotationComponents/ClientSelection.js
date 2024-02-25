import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { FaCheck} from 'react-icons/fa';
import { Row, Col, Form, CardBody, Card, Table } from 'react-bootstrap';
import ReturningClientModal from '../ReturningClientModal';
import FormComponent from '../subcomponents/FormComponent'

const ClientSelection = ({onClientSubmission}) => {

    const [isNew, setIsNew] = useState(true);
    const [activeOption, setActiveOption] = useState('newClient');
    const [clientData, setClientData] = useState({})

    const handleOptionClick = (option) => {
        setActiveOption(option);
        setIsNew(option === 'newClient');
    };

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        onClientSubmission()
      }
  
      setValidated(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData({
          ...clientData,
          [name]: value,
        });
    };

  return (
    <>
        <FormComponent formData={clientData} setFormData={setClientData} handleChange={handleChange} validated={validated} handleSubmit={handleSubmit} />

        <Row className="mt-5">
            <Col lg="3">
                <button className="btn w-100" style={{color: "white", backgroundColor: "#014c91"}}>
                {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })}   Confirm Client
                </button>
            </Col>
        </Row>

    </>
  );
};

export default ClientSelection;
