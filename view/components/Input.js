import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default class Input extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ margin: 10 }}>
                <Text style={styles.label}>{this.props.label}</Text>
                <View style={styles.card} {...this.props}>
                    <TextInput 
                        onFocus={this.props.onFocus}
                        value={this.props.value}
                        onChangeText={this.props.onChangeText}
                        underlineColorAndroid={'transparent'}
                        placeholder={this.props.placeholder}
                        keyboardType={this.props.keyboardType}
                        autoCorrect={true} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 1,
        backgroundColor: '#FFF',
        elevation: 2,
        borderColor: '#bbb',
        borderWidth: StyleSheet.hairlineWidth,

    },
    label: {
        color: '#1976D2',
        fontSize: 16
    }
})