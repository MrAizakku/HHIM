import React from 'react';
import dataSource from '../dataSource';
import FormInput from '../form/FormInput';

export default class EditItem extends React.Component {
    state = {
        id: this.props.item.id,  
        name: this.props.item.name,
        description: this.props.item.description,
        quantity: this.props.item.quantity,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.description === "" || this.state.quantity <= 0 ) {
            alert("ERROR: Please fill out the form correctly.");
        } else {
            dataSource.put('/item/', this.state)
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

    updateDescripion = (t) => {
        this.setState({description: t}, () => {
            console.log("State of form = ", this.state);
        });
    }

    updateQuantity = (t) => {
        this.setState({quantity: t}, () => {
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
                            <h3>Edit Item:</h3>
                            <FormInput 
                                id="itemName"
                                title="Name"
                                type="text"
                                value={this.state.name}
                                placeholder="Item Name"
                                onChange={this.updateName}
                            />
                            <FormInput 
                                id="itemDescription"
                                title="Desc:"
                                type="text"
                                value={this.state.description}
                                placeholder="Item Description"
                                onChange={this.updateDescripion}
                            />
                            <FormInput 
                                id="itemQuantity"
                                title="Quantity"
                                type="number"
                                value={this.state.quantity}
                                placeholder="0"
                                onChange={this.updateQuantity}
                            />
                        </div>
                        <button type="button" onClick={this.handleSubmit} className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
