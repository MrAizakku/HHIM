import React from 'react';
import dataSource from '../dataSource';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faList } from '@fortawesome/free-solid-svg-icons'
import ListItems from '../item/ListItems';
import Card from 'react-bootstrap/Card'

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
            <>
            <Card className="text-center">
                <Card.Header>
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
                </Card.Header>
                <Card.Body>
                    <Card.Title>{this.props.household.name}</Card.Title>
                    <Card.Text>
                        {this.props.household.street}<br/>
                        {this.props.household.city}, {this.props.household.state} {this.props.household.zip}<br/>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">{this.props.household.description}</Card.Footer>
            </Card>  
            <div className="text-center">
                { this.state.showItems ? 
                    <ListItems 
                        items={this.props.household.items} 
                        householdid={this.props.household.id} 
                        onItemSelect={this.handleItemSelect} 
                        history={this.props.history}/> 
                        : null }
            </div>
            </>
            
            
        );
    }
}
