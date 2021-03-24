import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import './App.css';
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import Search from './components/layouts/Search';
import Alert from './components/layouts/Alert';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }
  //search github user
  searchUsers= async text =>{
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({users: res.data.items, loading: false});
  }
  //clear github users from state
  clearUsers =()=> this.setState({users:[], loading: false});
  //set alert
  setAlert= (msg, type) => {
    this.setState({alert: {msg: msg, type: type} });

    setTimeout(() => this.setState({alert: null}), 5000);
  }
    
  render() {
      const {users, loading} = this.state;

      return(
      <div className="App">
          <Navbar  />
         
          <div className="container">
            <Alert alert={this.state.alert} />
            <Search 
            searchUsers= {this.searchUsers} clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
            />
            <Users loading={loading} users={users} />
          </div>
      </div>
      )
    }
}

export default App;
