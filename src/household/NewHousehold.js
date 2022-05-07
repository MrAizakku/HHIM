import React from 'react';
import dataSource from '../dataSource';
import FormInput from '../form/FormInput';
import { ReactSession } from 'react-client-session';

export default class NewHousehold extends React.Component {
    state = {
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        description: "",
        items: []
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.description === "" || this.state.street === "" || this.state.city === "" || this.state.state === "" || this.state.zip === "" ) {
            alert("ERROR: Please fill out the form correctly.");
        } else {
            dataSource.post('/household/', this.state)
            .then(result => {                
                dataSource.post('/householduser/', {"user_id": ReactSession.get("id"),"household_id": result.data.data.id})
                .then(result => {
                    //console.log(result.data);
                    alert("Success!");
                    this.props.history.push("/");
                    this.props.history.go(0);
                })                
            });
        }
    }

    updateName = (t) => {
        this.setState({name: t}, () => {
            console.log("State of form = ", this.state.name);
        });
    }

    updateStreet = (t) => {
        this.setState({street: t}, () => {
            console.log("State of form = ", this.state.street);
        });
    }
    updateCity = (t) => {
        this.setState({city: t}, () => {
            console.log("State of form = ", this.state.city);
        });
    }
    updateState = (t) => {
        if(t.length > 2)
            t = t.substring(0,2);
        this.setState({state: t}, () => {            
            console.log("State of form = ", this.state.state);
        });
    }
    updateZip = (t) => {
        if(t.length > 5)
            t = t.substring(0,5);
        this.setState({zip: t}, () => {
            console.log("State of form = ", this.state.zip);
        });
    }

    updateDescripion = (t) => {
        this.setState({description: t}, () => {
            console.log("State of form = ", this.state.description);
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
                            <h3>New Household:</h3>
                            <FormInput 
                                id="householdName"
                                title="Name"
                                type="text"
                                placeholder="Household Name"
                                onChange={this.updateName}
                            />
                            <FormInput 
                                id="householdStreet"
                                title="Street"
                                type="text"
                                placeholder="123 fake street"
                                onChange={this.updateStreet}
                            />
                            <FormInput 
                                id="householdCity"
                                title="City"
                                type="text"
                                placeholder="City"
                                onChange={this.updateCity}
                            />                            
                            <FormInput 
                                id="householdState"
                                title="State"
                                type="text"
                                placeholder="State Eg: AZ, TX, NY"
                                onChange={this.updateState}
                            />
                            <FormInput 
                                id="householdZip"
                                title="Zip"
                                type="text"
                                placeholder="00000"
                                onChange={this.updateZip}
                            />
                            <FormInput 
                                id="householdDescription"
                                title="Desc:"
                                type="text"
                                placeholder="Household Description"
                                onChange={this.updateDescripion}
                            />
                        </div>
                        <button type="button" onClick={this.handleSubmit} className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
