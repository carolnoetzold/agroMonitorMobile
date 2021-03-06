import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, DatePickerAndroid, Picker } from 'react-native';
import Input from './Input';
import firebase from 'react-native-firebase';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

class Medicao extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: moment().format("DD/MM/YYYY"),
            volume: "",
            periodo: "Matutino",
            posto: "1"
        };
    }

    componentDidMount() {
        if (this.props.item) {
            let item = this.props.item
            this.setState({
                data: moment(item.data, "DD/MM/YYYY").format("DD/MM/YYYY"),
                volume: item.volume.toString(),
                periodo: item.periodo,
                posto: item.posto,
            })
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    margin: 10
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Input label="Data:" value={this.state.data} />
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

                    <Picker
                        selectedValue={this.state.periodo}
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
                        onValueChange={(itemValue, itemIndex) => this.setState({ periodo: itemValue })}>
                        <Picker.Item label="Matutino" value="Matutino" />
                        <Picker.Item label="Vespertino" value="Vespertino" />
                        <Picker.Item label="Noturno" value="Noturno" />
                    </Picker>

                    <Input label="Volume:" value={this.state.volume} keyboardType="numeric" onChangeText={(text) => this.setState({ volume: text })} />
                    <Input label="Posto de Coleta:" value={this.state.posto} keyboardType="numeric" onChangeText={(text) => this.setState({ posto: text })} />

                    <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
                        <Button
                            onPress={() => {
                                const medicao = {
                                    volume: parseFloat(this.state.volume),
                                    posto: this.state.posto,
                                    periodo: this.state.periodo,
                                    data: parseInt(moment(this.state.data, "DD/MM/YYYY").format('x')),
                                    ano: moment(this.state.data, "DD/MM/YYYY").format("YYYY"),
                                    mes: moment(this.state.data, "DD/MM/YYYY").format("MM")
                                }
                                let key = this.props.item ? this.props.item.id : firebase.database().ref('medicao').push().key;
                                firebase.database().ref('medicao').child(key).set(medicao)
                                Actions.pop()
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

export default Medicao;