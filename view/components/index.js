import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
//var RNFS = require('react-native-fs');

const properties = {
    defaultFont: 'normal',
    style: {
        card: {
            borderRadius: 1,
            backgroundColor: '#FFF',
            elevation: 2,
            borderColor: '#bbb',
            borderWidth: StyleSheet.hairlineWidth,
            margin: 5
        },
        Toolbar: {
            margin: 0,
            flex: 1,
            flexDirection: 'row',
            marginTop: -1,
            marginRight: -1,
            marginLeft: -1,
            alignItems: 'center',
            justifyContent: 'space-between',
            maxHeight: 55
        }
    },
    color: {
        DefaultButton: '#2196F3',
        white: '#FFFFFF',
        grey_800: '#424242',
        orange: '#FF6B00',
        darkOrange: '#8b3b00',
        lightOrange: '#fff1e7',
        red: '#F44336',
        green: '#4CAF50',
        teal_500: '#009688',
        grey_300: '#E0E0E0',
        grey_500: '#9E9E9E',
        grey_100: '#F5F5F5',
        grey_200: '#EEEEEE',
        black: '#000'
    }
}

const styles = StyleSheet.create({
    Label: {
        fontFamily: properties.defaultFont
    },
    DefaultButton: {
        margin: 0,
        padding: 10,
        ...properties.style.card
    }
});

export class Label extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text
                allowFontScaling={false}
                {...this.props}
                style={[styles.Label, this.props.style, { opacity: this.props.visible === false ? 0 : 1 }]}>
                {this.props.children}
            </Text>
        )
    }
}

export class DefaultButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                {...this.props}
                onPress={() => {
                    if (!this.props.disabled) {
                        this.props.onPress();
                    }
                }}
                style={[
                    styles.DefaultButton,
                    this.props.style,
                    {
                        opacity: this.props.visible === false ? 0 : (this.props.disabled ? 0.4 : 1),
                        borderRadius: 2,
                        borderColor: '#BDBDBD',
                        backgroundColor: this.props.color || properties.color.DefaultButton,
                        margin: 0
                    }]}>
                <Label style={{ textAlign: 'center', fontSize: 16, fontWeight: '600', fontFamily: properties.defaultFont, color: this.props.textColor || properties.color.white }}>{this.props.children}</Label>
            </TouchableOpacity>
        )
    }
}

export class ToolbarButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} disabled={this.props.disabled || this.props.visible === false} style={{ flex: 2, alignItems: 'center' }}>
                <Icon style={{ padding: 12, marginRight: 5, opacity: this.props.visible === false ? 0 : (this.props.disabled ? 0.4 : 1) }} name={this.props.icon} size={this.props.size || 26} color={this.props.disabled ? properties.color.darkOrange : (this.props.color || properties.color.white)} />
            </TouchableOpacity>
        )
    }
}

export const { defaultFont, style, color } = properties