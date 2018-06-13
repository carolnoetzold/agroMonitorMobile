import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import { Mapper } from '../../redux';
import { login } from '../store/login/action'
import Input from '../components/Input';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

class Welcome extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                Actions.reset("bottombar")
            } else {
                Actions.reset("login")
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>

                <ActivityIndicator size={80} color="#0000ff" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFF',
        padding: 20
    }
});

export default Welcome