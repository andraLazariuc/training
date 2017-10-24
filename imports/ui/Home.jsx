import Login from '/imports/ui/pages/user/Login.jsx';
import route from '/imports/routing/router.js';

import React from 'react';
//import Paginator from 'react-paginator';
//import { createContainer } from 'meteor/react-meteor-data';
//import Donuts from '/imports/api/donuts/collection.js'
//import '/imports/api/donuts/methods.js';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {loading: false};
       /* this.state = {loading: true, donuts: [], mood: {}, pages: 0, nbItemsPage: 3};
        this.updateMood = this.updateMood.bind(this);*/
        //var Paginator = require('react-paginator');
    }

   /* updateMood(value) {
        if(value){
            this.state.mood = { price : { $lt : 200} }; 
            this.state.loading = false; 
        }
        else{
            this.state.mood = {}; 
            this.state.loading = false; 
        }
        
        Meteor.call('donuts.list_filtered', this.state.mood , (err, res) => {
            this.setState({
                loading: false,
                donuts: res, // assuming the method returns an array of donuts               
                pages:  Math.ceil(res.length / this.state.nbItemsPage)
            })
        })
      }*/
    
    componentDidMount() {
       /* Meteor.call('donuts.list', (err, res) => {
            this.setState({
                loading: false,
                donuts: res, // assuming the method returns an array of donuts
                pages:  Math.ceil(res.length / this.state.nbItemsPage)

            })
        })*/
    }
    
    onClickChangeRoute(location) { route.go(location); }

    render() {

        if (  Meteor.userId()) {
            if (this.state.loading) {
                return <div>Loading </div>
            }
            return (
                <div>
                    <p className="text-center">Logged In </p>

                    <button className="btn btn-primary" onClick={_ => this.onClickChangeRoute('/post/create')}>Add Post</button>
                    </div>
                )
            /*return (
                    <div>
                        
                        <FilterDonuts updateMood={this.updateMood}></FilterDonuts>

                        <div>
                            {
                                this.state.donuts.map(donut => {
                                    return <div key={donut._id}>{donut._id}</div>
                                })
                            }
                        </div>
    
                        <button className="btn btn-primary" onClick={_ => this.onClickChangeRoute('/add_donut')}>Add Donut</button>
                    </div>
                )*/
        }
        else{
            
            return <div>You need to log in first! <button className="btn btn-primary" onClick={_ => this.onClickChangeRoute('/login')}>Login</button></div>

        }
    }
}