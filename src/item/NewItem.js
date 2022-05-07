import React from 'react';
import dataSource from '../dataSource';
import FormInput from '../form/FormInput';

export default class NewItem extends React.Component {
    state = {
        name: "",
        description: "",
        quantity: "",
        households_id: this.props.location.state.householdid        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.description === "" || this.state.quantity === 0 ) {
            alert("ERROR: Please fill out the form correctly.");
        } else {
            dataSource.post('/item', this.state)
            .then(result => {
                //console.log(result.data);
                alert(result.data.httpMessage);
                this.props.history.go(0);
            });
        }
    }

    updateName = (t) => {
        this.setState({name: t});
    }

    updateDescripion = (t) => {
        this.setState({description: t});
    }

    updateQuantity = (t) => {
        this.setState({quantity: t});
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
                            <h3>New Item:</h3>
                            <FormInput 
                                id="itemName"
                                title="Name"
                                type="text"
                                placeholder="Item Name"
                                onChange={this.updateName}
                            />
                            <FormInput 
                                id="itemDescription"
                                title="Desc:"
                                type="text"
                                placeholder="Item Description"
                                onChange={this.updateDescripion}
                            />
                            <FormInput 
                                id="itemQuantity"
                                title="Quantity"
                                type="number"
                                placeholder="0"
                                onChange={this.updateQuantity}
                            />
                        </div>
                        <button type="submit" onClick={this.handleSubmit} className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
