import firebase from 'firebase';
import React, { Component } from 'react';
import { AppRegistry, View, Text, Button } from 'react-native';

class App extends Component {

  componentWillMount() {

    var config = {
      apiKey: "AIzaSyDuuY8Bq1x6Ssl4PBlWL8wL_wUB6ougC4U",
      authDomain: "configuracaofirebasereact.firebaseapp.com",
      databaseURL: "https://configuracaofirebasereact.firebaseio.com",
      storageBucket: "configuracaofirebasereact.appspot.com",
      messagingSenderId: "263541257878"
    };

    firebase.initializeApp(config);

  }

  cadastrarUsuario(){
    var email = "jamilton.cursos2@gmail.com";
    var senha = "jamilton12345";

    const usuario = firebase.auth();

    usuario.createUserWithEmailAndPassword(
      email,
      senha
    ).catch(
      (erro) => {
        var mensagemErro = "";
        if( erro.code == "auth/weak-password" ){
          mensagemErro = "A senha precisa ter no mínimo 6 caracteres!";
        }
        //erro.code, erro.message
        alert( mensagemErro );
      }
    );

  }

  verificarUsuarioLogado(){

    const usuario = firebase.auth();

    usuario.onAuthStateChanged(
      (usuarioAtual) => {
        if( usuarioAtual ){
          alert("Usuário está logado");
        }else{
          alert("Usuário não está logado");
        }
      }
    );

    /*const usuarioAtual = usuario.currentUser;

    if( usuarioAtual ){
      alert("Usuário está logado");
    }else{
      alert("Usuário não está logado");
    }*/

  }

  deslogarUsuario(){
    const usuario = firebase.auth();
    usuario.signOut();
  }

  logarUsuario(){
    var email = "jamilton.cursos2@gmail.com";
    var senha = "jamilton12345";

    const usuario = firebase.auth();

    usuario.signInWithEmailAndPassword(
      email,
      senha
    ).catch(
      (erro) => {
        alert( erro.message );
      }
    );

  }

  render(){
    
    return(
      <View>
        <Button
          onPress={ ()=>{ this.cadastrarUsuario(); } }
          title="Cadastrar Usuário"
          color="#841584"
          accessibilityLabel="Cadastrar Usuário"/>
          
          <Button
          onPress={ ()=>{ this.verificarUsuarioLogado(); } }
          title="Verificar usuário logado"
          color="#841584"
          accessibilityLabel="Verificar usuário logado"/>

          <Button
          onPress={ ()=>{ this.deslogarUsuario(); } }
          title="Deslogar usuário"
          color="#841584"
          accessibilityLabel="Deslogar usuário"/>

          <Button
          onPress={ ()=>{ this.logarUsuario(); } }
          title="Logar usuário"
          color="#841584"
          accessibilityLabel="Logar usuário"/>

      </View>
    );
  }

}

AppRegistry.registerComponent('firebaseTeste', () => App );