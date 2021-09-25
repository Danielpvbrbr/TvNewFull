import React, { useContext } from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

export default function Header() {
    const navigation = useNavigation();
    const { colorText } = useContext(AuthContext);

    return (
        <SafeAreaView style={[styles.container,{ borderBottomColor: colorText,}]}>
            <TouchableOpacity style={styles.buttonMenu} onPress={() => navigation.toggleDrawer()}>
                <Feather name="menu" size={35} color={colorText} />
                <Text style={[styles.titulo, { color: colorText, }]}>New Tv Full</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 11,
        paddingLeft: 10,
        marginBottom: 1,
        width: '100%',
        height: 50,
        borderBottomWidth: 0.5,
        backgroundColor:'#000'
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'relative',
        textAlign: 'center',
        top: -32,
    },
    buttonMenu: {
        justifyContent: 'center'
    }

});
