import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Mapper } from '../../redux';
import { login } from '../store/login/action'

class LoginView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: 'caroline.tads@gmail.com',
      password: '123456',
      isAuthenticated: false
    };

    this.fazerLogin = this.fazerLogin.bind(this);
  }


  fazerLogin() {
    this.props.login(this.state.email, this.state.password)
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />

        <TouchableOpacity style={styles.button} onPress={this.fazerLogin}>
          <Text>Logar</Text>
        </TouchableOpacity>

        <Text style={{ color: '#FFF' }}>{JSON.stringify(this.props.user)}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 20
  },
  input: {
    height: 45,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    borderColor: '#EEE',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  button: {
    height: 45,
    backgroundColor: '#069',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  }
});

const redux = {
  props: state => {
    return {
      user: state.login.user
    }
  },
  actions: dispatch => {
    return {
      login: (email, password) => {
        dispatch(login(email, password))
      }
    }
  }
}

export default Mapper(redux.props, redux.actions, LoginView)