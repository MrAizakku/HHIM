import React from "react";
import Report from './report/Report';

export default class Welcome extends React.Component {
    state = {
        report: this.props.report
    }

    render () {
        return (
            <div>
            <h1>Welcome to the Household Inventory Management system.</h1>
                <div className="container">
                    <p>Please feel free to review the items below and contact the item owners via the listed email address.</p>
                    <br />
                </div>
                <h3>Items up for donation:</h3>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Report />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
