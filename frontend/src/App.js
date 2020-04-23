import React, { Component } from 'react';
import './App.css';
import Main from './components/Main.js'

// Redux
import { Provider } from 'react-redux';
import store from './store'
import { loadUser, setAuthTokenToHeaders } from "./actions/auth";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
