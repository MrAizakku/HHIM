import React from 'react';
import dataSource from '../dataSource';
import FormInput from '../form/FormInput';
import { ReactSession } from 'react-client-session';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default class Login extends React.Component {
    state = {
        email: "",
        password: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitting");
        if(this.state.email === "" || this.state.password === "") {
            alert("ERROR: Please fill out the form correctly.");
        } else {
            dataSource.post('/authenticate/', this.state)
            .then(result => {
                //console.log(result.data);
                if(result.data === true) {
                    dataSource.get('/user/email/' + this.state.email)
                    .then(result => {
                        ReactSession.set("email", result.data.data[0].email);
                        ReactSession.set("id", result.data.data[0].id);
                        ReactSession.set("first_name", result.data.data[0].first_name);
                        //console.log(ReactSession.get("email"));
                        
                        alert("Welcome back " + result.data.data[0].first_name);
                        //console.log(result);
                        this.props.history.push("/");
                        this.props.history.go(0);
                    })
                } else {
                    alert("Login Failed.");
                    this.props.history.push("/login");
                    this.props.history.go(0);
                }
            });
        }
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
                        <h3 className="my-3">Login:</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email" 
                                    placeholder="Enter email" 
                                    onChange={this.updateEmail}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
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
