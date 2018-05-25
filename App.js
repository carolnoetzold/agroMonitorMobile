import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from './Routes';
import { Store } from './redux';
import {YellowBox} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props)
  }
  componentDidMount(){
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
  }

  render() {
    return (
      <Provider store={Store}>
        <Routes />
      </Provider>
    )
  }
}