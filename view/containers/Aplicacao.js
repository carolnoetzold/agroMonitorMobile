import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Mapper } from '../../redux';

class Aplicacao extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Text>Aplicacao</Text>
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

export default Mapper(redux.props, redux.actions, Aplicacao);