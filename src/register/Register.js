import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import dataSource from '../dataSource';
import FormInput from '../form/FormInput';

export default class Register extends React.Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.first_name === "" || this.state.last_name === "" || this.state.email === "" || this.state.password === "") {
            alert("ERROR: Please fill out the form correctly.");
        } else {
            dataSource.post('/user/', this.state)
            .then(result => {
                //console.log(result.data);
                alert(result.data.httpMessage);
                this.props.history.push("/");
                this.props.history.go(0);
            });
        }
    }

    updateFirstName = (t) => {
        this.setState({first_name: t.target.value});
    }

    updateLastName = (t) => {
        this.setState({last_name: t.target.value});
    }

    updateEmail = (t) => {
        this.setState({email: t.target.value});
    }

    updatePassword = (t) => {
        this.setState({password: t.target.value});
    }
    
    handleCancel = (e) => {
        this.props.history.push("/");
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg={6}>
                        <h3 className="my-3">Register:</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="first_name">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter First Name" 
                                    onChange={this.updateFirstName}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="last_name">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Last Name" 
                                    onChange={this.updateLastName}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter Email Address" 
                                    onChange={this.updateEmail}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter Password" 
                                    onChange={this.updatePassword}
                                />
                            </Form.Group>
                            <Button variant="success" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
