import React from 'react';

export default class ListHouseholds extends React.Component {
    handleSelect = (e) => {
        this.props.onClick(e.target.getAttribute('id'));
    }

    render() {
        //console.log(this.props);
        const households = this.props.households.map(
            (household) => {
                return (
                    <button className="list-group-item" 
                        id={household.id}
                        onClick={this.handleSelect} 
                        key={household.id}>
                        {household.name}
                    </button>
                );
            }
        );
        return (
            <div className="list-group">
                {households}
            </div>
        );
    }
}
