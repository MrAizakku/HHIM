import React from 'react';
import dataSource from '../dataSource';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faList } from '@fortawesome/free-solid-svg-icons'
import ListItems from '../item/ListItems';

export default class OneHousehold extends React.Component {
    state = {
        showItems: false
    }
    
    showItems = () => {
        this.setState(prevState => ({ showItems: !prevState.showItems}));
    }
    
    handleDelete = () => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm('Are you sure you want to delete?')) {
            dataSource.delete('/household/'+this.props.household.id)
            .then(result => {
                //console.log(result);
                alert(result.data.httpMessage);
                this.props.history.push("/");
                this.props.history.go(0);
            });
        }
    }

    handleItemSelect = (id) => {
        this.props.onItemSelect(id);
    }

    render() {
        //console.log("one", this.props);
        return (
            <div align="center">
                <div className="card text-center">
                    <div className="card-header">
                        <ul className="nav nav-pills card-header-pills">
                            <li className="nav-item mx-auto">
                                <span className="nav-link" onClick={this.showItems}><FontAwesomeIcon icon={faList} /></span>
                            </li>
                            <li className="nav-item mx-auto">
                                <Link className="nav-link" to="/edit/household"><FontAwesomeIcon icon={faEdit} /></Link>
                            </li>
                            <li className="nav-item mx-auto">
                                <span className="nav-link" onClick={this.handleDelete}><FontAwesomeIcon icon={faTrash} /></span>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.household.name}</h5>
                                <p className="card-text">{this.props.household.street}</p>
                                <p className="card-text">{this.props.household.city}, {this.props.household.state} {this.props.household.zip}</p>
                                <p className="card-text"><small className="text-muted">{this.props.household.description}</small></p>
                    </div>
                </div>
                { this.state.showItems ? <ListItems items={this.props.household.items} householdid={this.props.household.id} onItemSelect={this.handleItemSelect} 
                                        history={this.props.history}/> : null }
            </div>
            
        );
    }
}
