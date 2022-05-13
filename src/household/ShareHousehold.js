import React from 'react';
import dataSource from '../dataSource';
import { Stack, Form, Button } from 'react-bootstrap';

export default class ShareHousehold extends React.Component {
    state = {
        email: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.email === "") {
            alert("ERROR: Please fill out the form correctly.");
        } else {
            //Does the inputted user exist?
            dataSource.get('/user/email/' + this.state.email)
            .then(result => {
                console.log(result.data);
                //if exists
                if(result.data.numberOfResults > 0) {
                    let user_id = result.data.data[0].id;
                    console.log(user_id);
                    //let's check if user already has access, grab tuples
                    dataSource.get('/householduser/household/' + this.props.id)
                    .then(result => {
                        let exists = false;
                        //go through tuples and check
                        for (let i = 0; i < result.data.numberOfResults; i++) {
                            if(result.data.data[i].user_id === user_id) { exists = true; }
                        }
                        if(!exists) {
                            dataSource.post('/householduser/', {"user_id": user_id, "household_id":this.props.id})
                            .then(result => {                       
                                alert(result.data.httpMessage);
                            })
                        } else {
                            alert("User already has access.");
                        }
                    })
                //if user does not exist
                } else {
                    alert("Adding user failed.");
                }
            });
        }
    }

    updateEmail = (t) => {
        this.setState({email: t.target.value});
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Stack direction="horizontal" gap={3}>
                    <Form.Control 
                        size="sm"
                        className="me-auto"
                        id="email"
                        type="email" 
                        placeholder="Enter Email of user to grant household access to..." 
                        onChange={this.updateEmail} 
                    />
                    <Button size="sm" variant="success" type="submit">Submit</Button>
                </Stack>
            </Form>
        );
    }
}
