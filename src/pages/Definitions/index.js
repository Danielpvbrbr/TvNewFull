import React, { useState, useContext, useEffect } from 'react';
import { TouchableOpacity, View, Text, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header'
import { AuthContext } from '../../contexts/auth';
import { Picker } from '@react-native-picker/picker';
import firebase from '../../services/firebaseConnection';

export default function Definitions() {
    const { user, statusBack, valueColor, setStatusBack, colorText } = useContext(AuthContext);
  
    useEffect(() => {
        async function handleColor() {
            await firebase.database().ref('users').child(user.uid).update({
                dark: statusBack
            }).then(() => {
                // alert('Alterado para: ' + valueColor)
            }).catch((err) => {
                // alert('Não alterado Alterado')
            });
        }
        handleColor();

    }, [statusBack]);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: valueColor || user.cor }]}>
            <Header />
            <View style={{ flex: 1, marginRight: 7, marginLeft: 7, marginTop: 7 }}>


                <View style={styles.campoTitulo}>
                    <Text style={[styles.text, { color: colorText }]}>Meu perfil</Text>
                </View>

                <View style={[styles.campoTitulo, { flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }]}>
                    <Text style={{ color: colorText, fontSize: 17, fontWeight: 'bold' }}>Modo escuro:</Text>
                    <Switch
                        value={statusBack}
                        onValueChange={(statusBack) => setStatusBack(statusBack)}
                        thumbColor="#FFF"
                    />
                </View>

                <View style={styles.campoTitulo}>
                    <Text style={[styles.text, { color: colorText }]}>Sobre</Text>
                    <Text>O TvNewFull foi criado para ajudar! Assistindo seus canais favoritos, </Text>
                </View>

            </View>



            <View style={styles.versao}>
                <Text style={[styles.text, { color: colorText }]}>1.0.0</Text>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    campoTitulo: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#3437',
        paddingBottom: 10
    },
    textTitulo: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 17,
    },
    versao: {
        flex: 0.1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    }

});
