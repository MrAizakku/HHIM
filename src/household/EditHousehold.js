import React from 'react';
import dataSource from '../dataSource';
import FormInput from '../form/FormInput';

export default class EditHousehold extends React.Component {
    state = {
        id: this.props.household.id,
        name: this.props.household.name,
        street: this.props.household.street,
        city: this.props.household.city,
        state: this.props.household.state,
        zip: this.props.household.zip,
        description: this.props.household.description,
        items: this.props.household.items
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.description === "" || this.state.street === "" || this.state.city === "" || this.state.state === "" || this.state.zip === "" ) {
            alert("ERROR: Please fill out the form correctly.");
        } else {
            dataSource.put('/household/', this.state)
            .then(result => {
                //console.log(result.data);
                alert(result.data.httpMessage);
                this.props.history.push("/");
                this.props.history.go(0);
            });
        }
    }

    updateName = (t) => {
        this.setState({name: t});
    }

    updateStreet = (t) => {
        this.setState({street: t});
    }
    updateCity = (t) => {
        this.setState({city: t});
    }
    updateState = (t) => {
        if(t.length > 2)
            t = t.substring(0,2);
        this.setState({state: t});
    }
    updateZip = (t) => {
        if(t.length > 5)
            t = t.substring(0,5);
        this.setState({zip: t});
    }

    updateDescripion = (t) => {
        this.setState({description: t});
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
                            <h3>Edit Household:</h3>
                            <FormInput 
                                id="householdName"
                                title="Name"
                                value={this.state.name}
                                placeholder="Household Name"
                                onChange={this.updateName}
                            />
                            <FormInput 
                                id="householdStreet"
                                title="Street"
                                value={this.state.street}
                                type="text"
                                placeholder="123 fake street"
                                onChange={this.updateStreet}
                            />
                            <FormInput 
                                id="householdCity"
                                title="City"
                                value={this.state.city}
                                type="text"
                                placeholder="City"
                                onChange={this.updateCity}
                            />                            
                            <FormInput 
                                id="householdState"
                                title="State"
                                value={this.state.state}
                                type="text"
                                placeholder="State"
                                onChange={this.updateState}
                            />
                            <FormInput 
                                id="householdZip"
                                title="Zip"
                                value={this.state.zip}
                                type="text"
                                placeholder="00000"
                                onChange={this.updateZip}
                            />
                            <FormInput 
                                id="householdDescription"
                                title="Desc:"
                                value={this.state.description}
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
