import React from 'react';

//PROPS: value, id, title, placeholder, onChange
export default class FormInput extends React.Component {
    state = { inputData: this.props.value };

    handleChangeData = (e) => {
        this.setState({inputData: e.target.value}, () => {
            this.props.onChange(this.state.inputData);
        });
    }

    render() {
        return (
            <div className="mb-3 row">
                <label htmlFor={this.props.title} className="col-sm-4 col-form-label">{this.props.title}</label>
                <div className="col-sm-8">
                <input 
                    onChange={this.handleChangeData} 
                    onBlur={this.handleChangeData}
                    value={this.state.inputData}
                    type={this.props.type} 
                    className="form-control" 
                    id={this.props.id} 
                    placeholder={this.props.placeholder}
                    required 
                />
                </div>    
            </div>
        );
    }
}
