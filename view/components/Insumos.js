import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import Input from '../components/Input';
import firebase from 'react-native-firebase';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';

class Insumos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            descricao: "",
            itens: []
        }
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

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => (

        <View style={{
            backgroundColor: '#FFF',
            borderBottomWidth: 0.3,
            borderBottomColor: '#DDD',

            marginHorizontal: 10,
            marginVertical: 1,
            padding: 10,
            flexDirection: 'row',
            justifyContent:'space-between'
        }}>
            <Text style={{ fontSize: 18 }}>{item.descricao}</Text>
             <Icon name="edit" size={25} color="#1976D2"         
                value={this.state.data}
                onPress={() => {

                    
                }} />
           
        </View>

    );

    render() {
        return (
            <View>
                <Input label="Descrição:" value={this.state.descricao} onChangeText={(text) => this.setState({ descricao: text })} />
                <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button
                        onPress={() => {
                            const insumos = {
                                descricao: this.state.descricao
                            }
                            firebase.database().ref().child('insumos').push().set(insumos);
                        }}
                        title="Salvar"

                        color="#1976D2"
                        accessibilityLabel="Salvar" />
                </View>
                <FlatList
                    data={this.state.itens}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
            </View>

        )
    }
}
export default Insumos