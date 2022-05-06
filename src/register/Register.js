import React from 'react';
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
                console.log(result.data);
                alert(result.data.httpMessage);
                this.props.history.push("/");
                this.props.history.go(0);
            });
        }
    }

    updateFirstName = (t) => {
        this.setState({first_name: t}, () => {
            console.log("State of form = ", this.state);
        });
    }

    updateLastName = (t) => {
        this.setState({last_name: t}, () => {
            console.log("State of form = ", this.state);
        });
    }

    updateEmail = (t) => {
        this.setState({email: t}, () => {
            console.log("State of form = ", this.state);
        });
    }

    updatePassword = (t) => {
        this.setState({password: t}, () => {
            console.log("State of form = ", this.state);
        });
    }
    
    handleCancel = (e) => {
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="container">
                <div className="col mx-auto w-50">
                    <form>
                        <div className="form-group">
                            <h3>Register:</h3>
                            <FormInput 
                                id="first_name"
                                title="First Name"
                                type="text"
                                placeholder="John"
                                onChange={this.updateFirstName}
                            />
                            <FormInput 
                                id="last_name"
                                title="Last Name"
                                type="text"
                                placeholder="Smith"
                                onChange={this.updateLastName}
                            />
                            <FormInput 
                                id="email"
                                title="Email"
                                type="email"
                                placeholder="me@email.com"
                                onChange={this.updateEmail}
                            />
                            <FormInput 
                                id="password"
                                title="Password"
                                type="password"
                                placeholder="****"
                                onChange={this.updatePassword}
                            />
                        </div>
                        <button type="button" onClick={this.handleSubmit} className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
