import React from 'react';
import dataSource from '../dataSource';

export default class Report extends React.Component {
    state = {
        report: []
    }
        
    componentDidMount() {
        this.loadReport();
    }

    loadReport = async () => {
        const response = await dataSource.get('/report/');
        //console.log(response.data.data);
        this.setState({report: response.data.data});
    }

    render() {
        //console.log(this.state);
        const items = this.state.report.map(
            (item) => {
                return (                    
                    <tr key={item.item_id}>
                        <th scope="row">{item.item_id}</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td>{item.state}</td>
                        <td>{item.email}</td>
                        <td>{item.updated_at.substring(0,10)}</td>
                    </tr>
                );
            }
        );

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">State</th>
                            <th scope="col">Email</th>
                            <th scope="col">Updated</th>
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
