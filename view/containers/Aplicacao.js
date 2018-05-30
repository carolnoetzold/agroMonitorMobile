import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, ScrollView, Picker, DatePickerAndroid } from 'react-native';
import { Mapper } from '../../redux';
import Input from '../components/Input';
import Icon from 'react-native-vector-icons/Feather';
import Insumos from '../components/Insumos';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import moment from 'moment';

class Aplicacao extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: moment().format("DD/MM/YYYY"),
            talhao: "1",
            dosagem: "",
            area: "",
            itens: []
        };
    }

    componentDidMount() {
        const self = this
        const ref = firebase.database().ref('insumos');
        ref.on('value', function (snapshot) {
            const itens = [];
            snapshot.forEach((child) => {
                itens.push({
                    id: child.key,
                    descricao: child.val().descricao
                })
            })
            self.setState({ itens })
        });
    }

    render() {
        return (
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        margin: 5
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Input label="Data:" value={this.state.data}/>
                        <Icon name="calendar" size={30} color="#1976D2"
                            style={{ marginTop: 40 }}
                            value={this.state.data}
                            onPress={() => {
                                let self = this;
                                let datePicker = async () => {
                                    try {
                                        const { action, year, month, day } = await DatePickerAndroid.open({
                                            date: new Date()
                                        });
                                        if (action !== DatePickerAndroid.dismissedAction) {
                                            let data = moment(new Date(year, month, day)).format('DD/MM/YYYY')
                                            self.setState({ data })
                                        }
                                    } catch ({ code, message }) {
                                        console.warn('Cannot open date picker', message);
                                    }
                                }
                                datePicker()
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Picker
                            selectedValue={this.state.language}
                            style={{
                                backgroundColor: '#FFF',
                                margin: 10,
                                color: '#1976D2',
                                borderRadius: 1,
                                backgroundColor: '#FFF',
                                elevation: 2,
                                borderColor: '#bbb',
                                width: 290,
                                borderWidth: 1,
                            }}
                            onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                            {
                                this.state.itens.map((item) => {
                                    return <Picker.Item key={item.id} label={item.descricao} value={item.id} />
                                })
                            }
                        </Picker>
                        <Icon name="plus" size={30}
                            onPress={() => { Actions.insumos(); }}
                            color="#1976D2"
                            style={{ marginTop: 20 }}
                            accessibilityLabel="Novo" />
                    </View>
                    <Input label="Talhão:" value={this.state.talhao} keyboardType="numeric" onChangeText={(text) => this.setState({ talhao: text })} />
                    <Input label="Dosagem:" value={this.state.dosagem} keyboardType="numeric" onChangeText={(text) => this.setState({ dosagem: text })} />
                    <Input label="Área:" value={this.state.area} keyboardType="numeric" onChangeText={(text) => this.setState({ area: text })} />

                    <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 5 }}>
                        <Button
                            onPress={() => {
                                const aplicacao = {
                                    talhao: parseFloat(this.state.talhao),
                                    dosagem: this.state.dosagem,
                                    area: this.state.area,
                                    data: parseInt(moment(this.state.data, "DD/MM/YYYY").format('x')),
                                    ano: moment(this.state.data, "DD/MM/YYYY").format("YYYY"),
                                    mes: moment(this.state.data, "DD/MM/YYYY").format("MM")
                                }
                                firebase.database().ref().child('aplicacao').push().set(aplicacao);
                            }}
                            title="Salvar"
                            color="#1976D2"
                            accessibilityLabel="Salvar" />

                    </View>
                </View>
            </ScrollView>
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