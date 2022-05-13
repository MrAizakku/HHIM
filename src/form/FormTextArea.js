import React from 'react';

//PROPS: value, id, title, placeholder, onChange
export default class FormTextArea extends React.Component {
    state = { inputData: this.props.value || '' };

    handleChangeData = (e) => {
        this.setState({inputData: e.target.value}, () => {
            console.log("contents of the input = ", this.state.inputData);
            this.props.onChange(this.state.inputData);
        });
    }

    render() {
        return (
            <div className="mb-3 row">
                <label htmlFor={this.props.id} className="col-sm-2 col-form-label">{this.props.title}</label>
                <div className="col-sm-10">
                <textarea 
                    onChange={this.handleChangeData} 
                    onBlur={this.handleChangeData}
                    value={this.state.inputData}
                    type="text" 
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