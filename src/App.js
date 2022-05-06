import React from 'react';
import dataSource from './dataSource';
import { Router, Route, Switch } from 'react-router-dom'; 
import { createBrowserHistory } from 'history';
import NavBar from './NavBar';
import NewHousehold from './household/NewHousehold';
import ListHouseholds from './household/ListHouseholds';
import EditHousehold from './household/EditHousehold';
import OneHousehold from './household/OneHousehold';
import NewItem from './item/NewItem';
import EditItem from './item/EditItem';
import Welcome from './Welcome';

const history = createBrowserHistory(); 

export default class App extends React.Component {
    state = {
        households: [],
        item: "",
        currentlySelectedHouseholdID: -1
    }

    componentDidMount() {
        this.loadHouseholds();
    }

    loadHouseholds = async () => {
        const response = await dataSource.get('/households');
        console.log(response.data.data);
        this.setState({households: response.data.data});
    }

    selectItem = (id) => {
        //console.log("id", id);
        var index = 0;
        //console.log("length",this.state.households[this.state.currentlySelectedHouseholdID].items.length);
        for (var i = 0; i < this.state.households[this.state.currentlySelectedHouseholdID].items.length; i++) {
            //console.log(i);
            // eslint-disable-next-line eqeqeq
            if(this.state.households[this.state.currentlySelectedHouseholdID].items[i].id == id) {
                //console.log("setting index");
                index = i;
                break;
            }
        }
        this.setState({item: this.state.households[this.state.currentlySelectedHouseholdID].items[index]});
    }

    viewSingleHousehold = (id) => {
        var index = 0;
        for (var i = 0; i < this.state.households.length; i++) {
            // eslint-disable-next-line eqeqeq
            if(this.state.households[i].id == id)
                index = i;
        }
        this.setState({currentlySelectedHouseholdID: index},
            history.push('/show/' + index));
    }

    render() {
        return (
            <Router history={history}>
                <div className="container">
                    <NavBar />
                    <Switch>
                        <Route 
                            exact path="/" 
                            component={Welcome} 
                        />
                        <Route 
                            exact path="/create/household" 
                            component={NewHousehold} 
                        />
                        <Route 
                            exact path="/create/item" 
                            component={NewItem} 
                        />
                        <Route exact path="/list/households" 
                            render={ () => {
                                return (
                                    <ListHouseholds 
                                        households={this.state.households}
                                        onClick={this.viewSingleHousehold}
                                    />
                                );
                            }} 
                        />
                        <Route exact path="/show/:id" 
                            render={ () => { 
                                return (
                                    <OneHousehold 
                                        history={history} 
                                        household={this.state.households[this.state.currentlySelectedHouseholdID]} 
                                        onItemSelect={this.selectItem}
                                    /> 
                                );
                            }} 
                        />
                        <Route 
                            exact path="/edit/household" 
                            render={ () => { 
                                return (
                                    <EditHousehold 
                                        history={history} 
                                        household={this.state.households[this.state.currentlySelectedHouseholdID]}
                                        item={this.state.item} 
                                    /> 
                                );
                             }} 
                        />
                        <Route 
                            exact path="/edit/item" 
                            render={ () => { 
                                return (
                                    <EditItem 
                                        history={history}
                                        household={this.state.households[this.state.currentlySelectedHouseholdID]}
                                        item={this.state.item}
                                    /> 
                                );
                             }} 
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}