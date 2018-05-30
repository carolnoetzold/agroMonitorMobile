import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, DatePickerAndroid, Picker } from 'react-native';
import Input from '../components/Input';
import firebase from 'react-native-firebase';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';

class Medicao extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: moment().format("DD/MM/YYYY"),
            volume: "",
            periodo: "matutino",
            posto: "1"
        };
    }
    render() {
        return (
            <ScrollView>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginLeft: 10
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
                        <Picker.Item label="Matutino" value="matutino" />
                        <Picker.Item label="Vespertino" value="vespertino" />
                        <Picker.Item label="Noturno" value="noturno" />
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
                                firebase.database().ref().child('medicao').push().set(medicao);
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

export default Medicao