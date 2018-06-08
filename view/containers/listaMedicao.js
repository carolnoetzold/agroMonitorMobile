import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Medicao from '../components/Medicao';
import moment from 'moment';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Feather';

export default class ListaMedicao extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itens: []
        }
    }

    componentDidMount() {
        const self = this
        const ref = firebase.database().ref('medicao');
        ref.on('value', function (snapshot) {
            var itens = [];
            snapshot.forEach((child) => {
                itens.push({
                    id: child.key,
                    data: moment(child.val().data).format('DD/MM/YYYY'),
                    periodo: child.val().periodo,
                    posto: child.val().posto,
                    volume: child.val().volume,

                })
            })
             itens = itens.reverse()
            self.setState({ itens })
        });
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => (

        <TouchableNativeFeedback
            onPress={() => {
                Actions.medicao({ item })
            }}>
            <View style={styles.card}>
                <Text style={styles.titulo}>{item.data}</Text>
                <Text style={styles.valor}>Volume: {item.volume}</Text>
                <Text style={styles.subtitulo}>Posto {item.posto}</Text>
                <Text style={styles.subtitulo}>Periodo {item.periodo}</Text>

                {/* <Icon style={styles.icone} name="edit-2" size={25} color="#1976D2" /> */}
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