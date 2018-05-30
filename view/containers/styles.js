import { StyleSheet } from 'react-native'

export default () => {
    return StyleSheet.create({
        TextInput: {
            borderWidth: 1,
            height: 45,
            backgroundColor: '#FFF',
            alignSelf: 'stretch',
            borderColor: '#EEE',
            paddingHorizontal: 20,
            marginBottom: 10
        },
        card: {
            borderRadius: 1,
            backgroundColor: '#FFF',
            elevation: 2,
            borderColor: '#bbb',
            borderWidth: StyleSheet.hairlineWidth
        }
    });
}