import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

export function login(email, password) {
    return async (dispatch, state) => {
        const user = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
        dispatch({ type: 'AUTHENTICATION', user });

        if (user) {
            Actions.reset("bottombar")
        }
    }

}
