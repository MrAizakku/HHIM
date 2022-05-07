import React from 'react';
import dataSource from '../dataSource';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrash, faFlag } from '@fortawesome/free-solid-svg-icons'

export default class ListItems extends React.Component {
    state = {
        items: this.props.items
    }

    renderFlag = (id) => {
        return (<div><FontAwesomeIcon id={id} icon={faFlag} /></div>);
    }

    renderToggle = (id) => {
        return (<div></div>);
    }

    handleSelect = (e) => {
        this.props.onItemSelect(e.currentTarget.id);
        this.props.history.push("/edit/item");
    }

    handleDelete = (e) => {
        //console.log(e.currentTarget.id);
        var eid = e.currentTarget.id;
        var index = 0;
        for (var i = 0; i < this.state.items.length; i++) {
            //console.log("i=", i);
            //console.log("items id=", this.state.items[i].id);
            // eslint-disable-next-line eqeqeq
            if(this.state.items[i].id == eid) {
                //console.log("updating index");
                index = i;
                break;
            }
        }
        //console.log("eid=", eid);
        //console.log("index=", index);
        //console.log("state=", this.state);
        // eslint-disable-next-line no-restricted-globals
        if(confirm('Are you sure you want to delete?')) {
            dataSource.delete('/item/'+eid)
            .then(result => {
                alert(result.data.httpMessage);
                var newArr = this.state.items;
                newArr.splice(index,1);
                //console.log("new array:", newArr);
                this.setState({items: newArr});
            });
        }
    }

    render() {
        //console.log(this.props);
        //console.log("ListItems=", this.props.items);
        const items = this.state.items.map(
            (item) => {
                return (                    
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td>{item.created_at}</td>
                        <td>{item.updated_at}</td>
                        <td>
                            {item.donation_flag != null ? this.renderFlag(item.id) : this.renderToggle(item.id) }
                            
                        </td>
                        <td>
                            <div className="nav-link" id={item.id} onClick={this.handleSelect}><FontAwesomeIcon id={item.id} icon={faEdit} /></div>
                        </td>
                        <td>
                            <div className="nav-link" id={item.id} onClick={this.handleDelete}><FontAwesomeIcon id={item.id} icon={faTrash} /></div>
                        </td>
                    </tr>
                );
            }
        );
        return (
            <div>
                <h1>Inventory <Link to={{pathname: "/create/item", state: {householdid: this.props.householdid} }} ><FontAwesomeIcon icon={faPlus} /></Link></h1>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Created</th>
                            <th scope="col">Updated</th>
                            <th scope="col">Donation?</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        );
    }
}
