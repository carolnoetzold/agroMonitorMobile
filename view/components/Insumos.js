import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Mapper } from '../../redux';

class Insumos extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Text>Insumos</Text>
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

export default Mapper(redux.props, redux.actions, Insumos);