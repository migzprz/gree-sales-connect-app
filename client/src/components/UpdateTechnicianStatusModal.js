import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form,  Dropdown } from 'react-bootstrap';
import { FaTrash, FaCheck} from 'react-icons/fa';
import axios from 'axios';

const UpdateTechnicianStatusModal = ({ id }) => {
    const [showModal, setShowModal] = useState(false);
    const [record, setRecord] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getTechnician/${id}`)
                console.log(response.data)
                setRecord(response.data[0])
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        console.log('id', id)
        fetchData()
    }, [id])

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setValidated(false); 
        setShowModal(false);
    };

    useEffect(() => {
        console.log(record)
    }, [record])


    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    try {

        if (record.is_active){
            const response = await axios.patch(`http://localhost:4000/api/changeTechnicianState/${id}/0`)
            console.log(response)
        } else {
            const response = await axios.patch(`http://localhost:4000/api/changeTechnicianState/${id}/1`)
            console.log(response)
        }
            
        
        
    } catch (error) {
        console.error(error)
    }
    };
      

    return (
        <div>
        
        {record.is_active ? (
            <Dropdown.Item onClick={handleShowModal}>Deactivate Technician</Dropdown.Item>
        ) : (
            <Dropdown.Item onClick={handleShowModal}>Reactivate Technician</Dropdown.Item>
        )}
        

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header style={{color: "white", backgroundColor: record.is_active ? "#8c1919" : "#014c91"}}>
                    <Modal.Title>{record.is_active ? "Deactivate Technician" : "Reactivate Technician"}</Modal.Title>
                </Modal.Header>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body style={{color: "#014c91", backgroundColor: "#E5EDF4"}}>
                                {record.is_active ? (
                                    <Row>
                                        <Col>
                                            Deactivating <strong> {record.name} </strong> as a technician <br/>
                                            Continue?
                                        </Col>
                                    </Row>
                                ):(
                                    <Row>
                                        <Col>
                                            Reinstating <strong> {record.name} </strong> as a technician<br/>
                                            Continue?
                                        </Col>
                                    </Row>
                                )}
                               
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "#E5EDF4"}}>
                            

                            <button className="btn" style={{color: "white", backgroundColor: record.is_active ? "#8c1919" : "#014c91"}} onClick={handleSubmit}>
                                {record.is_active ? (
                                    <>
                                        {React.createElement(FaTrash, { size: 18, style: { marginRight: '5px' } })} Deactivate Technician
                                    </>
                                ):(
                                    <>
                                        {React.createElement(FaCheck, { size: 18, style: { marginRight: '5px' } })} Reactivate Technician
                                    </>
                                )}
                            </button>
                            

                            <button className="btn" onClick={(e) => { e.preventDefault(); handleCloseModal(); }} style={{color: "white", backgroundColor: "#6c757d"}}>
                                Cancel
                            </button>

                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default UpdateTechnicianStatusModal;
