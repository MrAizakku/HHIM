import React from 'react';
import dataSource from '../dataSource';
import FormInput from '../form/FormInput';
import { ReactSession } from 'react-client-session';

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
        this.setState({email: t});
    }

    updatePassword = (t) => {
        this.setState({password: t});
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
                            <h3>Login:</h3>
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
