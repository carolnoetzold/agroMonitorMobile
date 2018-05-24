import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from './Routes';
import { Store } from './redux';

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={Store}>
        <Routes />
      </Provider>
    )
  }
}