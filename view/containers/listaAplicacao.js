import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Aplicacao from '../components/Aplicacao';
import moment from 'moment';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Feather';


export default class ListaAplicacao extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itens: [],
            insumos: []
        }
    }

    componentDidMount() {
        const self = this
        this.loadInsumos(this);
    }

    loadInsumos(self) {
        firebase.database().ref(`insumos`).on('value', (snapshot) => {
            const insumos = [];
            snapshot.forEach((child) => {
                insumos.push({
                    id: child.key,
                    descricao: child.val().descricao
                })
            })
            self.setState({ insumos })
            self.loadAplicacoes(this);
        })
    }

    loadAplicacoes(self) {
        const ref = firebase.database().ref('aplicacao');
        ref.on('value', function (snapshot) {
            var itens = [];
            snapshot.forEach((child) => {
                itens.push({
                    id: child.key,
                    data: moment(child.val().data).format('DD/MM/YYYY'),
                    insumo: child.val().insumo,
                    dosagem: child.val().dosagem,
                    talhao: child.val().talhao,
                    area: child.val().area
                })
            })
            itens = itens.reverse()
            self.setState({ itens })
        });

    }

    _keyExtractor = (item, index) => item.id;

    getInsumoDesc(insumo) {
        let item = this.state.insumos.find(o => o.id === insumo);
        return item ? item.descricao : ""
    }

    _renderItem = ({ item }) => (
        <TouchableNativeFeedback
        onPress={()=>{
            Actions.aplicacao({item})
        }}
        >
            <View style={styles.card}>
                <Text style={styles.titulo}>{item.data}</Text>
                <Text style={styles.valor}>Insumo - {this.getInsumoDesc(item.insumo)}</Text>
                <Text style={styles.subtitulo}>Dose de {item.dosagem}KGS</Text>
                <Text style={styles.subtitulo}>Aplicado no talhão {item.talhao}</Text>
                <Text style={styles.subtitulo}>{item.area} de área</Text>
            
            </View>
        </TouchableNativeFeedback>
    );

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.itens}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    list: {
        padding: 5,
        height: '100%'
    },
    card: {
        paddingLeft: 10,
        paddingRight: 10,
        margin: 5,
        borderRadius: 2,
        backgroundColor: '#FFF',
        elevation: 1,
        borderColor: '#bbb',
        borderWidth: StyleSheet.hairlineWidth
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    titulo: {
        fontSize: 16,
        color: '#607D8B'
    },
    subTitulo: {
        fontSize: 11,
        marginTop: 5
    },
    valor: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1976D2'
    },
    status: {
        color: '#607D8B',
        fontWeight: '600',
        fontSize: 12
    },
    icone: {
        justifyContent: 'flex-end'
    }
});