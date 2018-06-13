import React, { Component } from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { Mapper } from '../../redux';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import Welcome from './Welcome';

class Settings extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Button
                onPress={() => { 
                    firebase.auth().signOut()
                    Actions.reset('welcome')
                }}
                title="Sair"
                color="#FF0000"
            />
        )
    }
}

const redux = {
    props: state => {
        return {

        }
    },
    actions: dispatch => {
        return {

        }
    }
}

export default Mapper(redux.props, redux.actions, Settings);