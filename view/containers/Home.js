import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            medicoes: [],
            mediaMedicao: 0.0,
            mes: "",
            ano: "",
            posto: ""

        }
    }

    componentDidMount() {
        this.loadMedicao()
    }

    loadMedicao() {
        const self = this;
        firebase.database().ref('medicao').on('value', (snapshot) => {
            const medicoes = [];
            snapshot.forEach((child) => {
                let item = child.val()
                item.key = child.key;
                medicoes.push(item)
            })
            self.setState({ medicoes })
            self.gerarMedia()
        })
    }

    gerarMedia() {
        //Filtrar registro das medições

        setTimeout(() => {
            let itens = [];

            for (var i in this.state.medicoes) {
                let medicao = this.state.medicoes[i]

                let ano = this.state.ano.length === 0 ? true : (medicao.ano.contains(this.state.ano))
                let mes = this.state.mes.length === 0 ? true : (medicao.mes.contains(this.state.mes))
                let posto = this.state.posto.length === 0 ? true : (medicao.posto.contains(this.state.posto))

                if (ano && mes && posto) itens.push(medicao)
            }

            //Calculo da média com base no array de itens que foi filtrado do firebase.
            let total = 0.0
            for (var i in itens) {
                let item = itens[i];
                total = total + item.volume
            }
            const media = (total / itens.length).toFixed(2)
            this.setState({
                mediaMedicao: isNaN(media) ? 0.0 : media
            })
        }, 50)
    }

    render() {
        return (
            <View >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <TextInput
                        underlineColorAndroid={'transparent'}
                        placeholder="Mês"
                        style={input.card}
                        keyboardType='numeric'
                        value={this.state.mes}
                        selectTextOnFocus
                        onChangeText={(text) => {
                            this.setState({ mes: text })
                            this.gerarMedia()
                        }} />
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        placeholder="Ano"
                        style={input.card}
                        keyboardType='numeric'
                        value={this.state.ano}
                        selectTextOnFocus
                        onChangeText={(text) => {
                            this.setState({ ano: text })
                            this.gerarMedia()
                        }} />
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        placeholder="Posto"
                        style={input.card}
                        keyboardType='numeric'
                        value={this.state.posto}
                        selectTextOnFocus
                        onChangeText={(text) => {
                            this.setState({ posto: text })
                            this.gerarMedia()
                        }} />

                    <Icon name="filter" size={30} color="#1976D2" style={{ marginTop: 20, marginRight: 10 }} />
                </View>
                <Text style={input.label}>{this.state.mediaMedicao} mm</Text>
            </View>
        )
    }
}
export default Home;

const input = StyleSheet.create({
    card: {
        margin: 5,
        width: 100,
        borderRadius: 2,
        backgroundColor: '#FFF',
        elevation: 2,
        borderColor: '#bbb',
    },
    label: {
        margin: 10,
        textAlign: 'center',
        color: '#1976D2',
        fontSize: 20
    }
})