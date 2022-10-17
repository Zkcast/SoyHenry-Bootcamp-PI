import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route ,Switch} from 'react-router-dom'
import Index from './components/Index/Index'
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { CountryDetail } from './components/CountryDetails/CountryDetail';
import { Activities } from './components/Activities/Activities'
import { AddActivity } from './components/AddActivity/AddActivity'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
       <div className="App">
        <Switch>
        <Route exact path='/' component={Index} />
      </Switch>

      <Switch>
        <Route path='/home' component={NavBar} />
      </Switch>
  
      <Switch>
        <Route exact path='/home' component={Home} />
      </Switch>

      <Switch>
        <Route path='/detail/:id' component={CountryDetail} />
      </Switch>

      <Switch>
        <Route exact path='/activities' component={Activities} />
      </Switch>

      <Switch>
        <Route exact path='/activities/add' component={AddActivity} />
      </Switch>

      <Switch>
        <Route exact path='/activities/add/:id' component={AddActivity} />
      </Switch>

      </div>
      </BrowserRouter>
     );
    }
    }
  

export default App;
