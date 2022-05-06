import React from 'react';
import dataSource from '../dataSource';
import FormInput from '../form/FormInput';

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
                console.log(result.data);
                alert(result.data.httpMessage);
                this.props.history.push("/");
                this.props.history.go(0);
            });
        }
    }

    updateName = (t) => {
        this.setState({name: t}, () => {
            console.log("State of form = ", this.state);
        });
    }

    updateStreet = (t) => {
        this.setState({street: t}, () => {
            console.log("State of form = ", this.state);
        });
    }
    updateCity = (t) => {
        this.setState({city: t}, () => {
            console.log("State of form = ", this.state);
        });
    }
    updateState = (t) => {
        this.setState({state: t}, () => {
            console.log("State of form = ", this.state);
        });
    }
    updateZip = (t) => {
        this.setState({zip: t}, () => {
            console.log("State of form = ", this.state);
        });
    }

    updateDescripion = (t) => {
        this.setState({description: t}, () => {
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
                                placeholder="State"
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
