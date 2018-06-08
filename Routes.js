import React, { Component } from 'react';
import { View, Image, Platform, StyleSheet } from 'react-native';
import { ToolbarButton } from './view/components';
import { Store, medicao } from './redux';
import { Router, Tabs, Scene, Stack, Actions } from 'react-native-router-flux';

import Home from './view/containers/Home';
import ListaAplicacao from './view/containers/listaAplicacao';
import ListaMedicao from './view/containers/listaMedicao';
import Aplicacao from './view/components/Aplicacao';
import Medicao from './view/components/Medicao';
import Settings from './view/containers/Settings';
import LoginView from './view/containers/Login';
import Insumos from './view/components/Insumos';

let color = {
    grey_800: '#DDD',
    green: '#61d800'
}

export default class Routes extends Component {

    constructor(props) {
        super(props)
        this.renderTabIcon = this.renderTabIcon.bind(this);
        this.getIcon = this.getIcon.bind(this);
    }

    getIcon(name) {
        switch (name) {
            case "Inicio":
                return require('./view/assets/home.png');
            case "Medição":
                return require('./view/assets/chuvas.png');
            case "Aplicação":
                return require('./view/assets/aplicacao.png');
            case "Opções":
                return require('./view/assets/settings.png');
        }
    }

    renderTabIcon({ focused, title }) {
        const self = this;
        return (
            <Image
                source={self.getIcon(title)}
                style={[
                    {
                        marginBottom: Platform.OS === 'android' ? -2.5 : 1,
                        width: Platform.OS === 'android' ? 22.5 : 25,
                        height: Platform.OS === 'android' ? 22.5 : 25,
                        tintColor: focused ? '#1976D2' : '#DDD',
                    },
                ]}
            />
        )
    }

    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar>
                    {/* <Scene key='login' component={LoginView} title="Login" /> */}

                    <Tabs key="bottombar" tabBarPosition="bottom" tabBarStyle={{ backgroundColor: '#FFF' }} labelStyle={{ fontSize: 12, fontWeight: '600' }}>
                        <Scene key='home' component={Home} title="Inicio" icon={this.renderTabIcon} />

                        <Stack key='rootMedicao' title='Medições' navigationBarStyle={[styles.navbar]}>
                            <Scene key='listaMedicao' initial component={ListaMedicao} title="Medição" icon={this.renderTabIcon}
                                renderRightButton={() => {
                                    return <ToolbarButton icon="plus" color="#000" onPress={() => {
                                        Actions.medicao();
                                    }} />
                                }} />
                            <Scene key='medicao' component={Medicao} title="Medição" modal swipeEnabled={false} hideTabBar />
                        </Stack>

                        <Stack key='rootaplicacao' title='Aplicações' navigationBarStyle={[styles.navbar]}>
                        <Scene key='listaAplicacao' initial component={ListaAplicacao} title="Aplicação" icon={this.renderTabIcon}
                                renderRightButton={() => {
                                    return <ToolbarButton icon="plus" color="#000" onPress={() => {
                                        Actions.aplicacao();
                                    }} />
                                }} />
                            <Scene key='insumos' component={Insumos} title="Insumos" modal swipeEnabled={false} hideTabBar />
                            <Scene key='aplicacao' component={Aplicacao} title="Aplicação" modal swipeEnabled={false} hideTabBar />
                        </Stack>

                        <Scene key='settings' component={Settings} title="Opções" icon={this.renderTabIcon} />
                    </Tabs>

                </Stack>
            </Router>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        color: '#61d800'
    }
});