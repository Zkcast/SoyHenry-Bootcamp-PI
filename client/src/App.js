import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Index from './components/Index/Index'
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { CountryDetail } from './components/CountryDetails/CountryDetail';
import Activities from './components/Activities/Activities'
import { AddActivity } from './components/AddActivity/AddActivity'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
       <div className="App">

        <Route exact path='/' component={Index} />


        <Route path='/home' component={NavBar} />


        <Route exact path='/home' component={Home} />


        <Route path='/detail/:id' component={CountryDetail} />


        <Route exact path='/activities' component={Activities} />


        <Route exact path='/activities/:id' component={Activities} />


        <Route exact path='/activity/add' component={AddActivity} />


        <Route exact path='/activity/add/:id' component={AddActivity} />


      </div>
      </BrowserRouter>
     );
    }
    }
  

export default App;
