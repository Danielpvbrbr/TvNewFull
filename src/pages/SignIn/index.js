import React, { useState, useContext } from 'react';
import {
    Button, ImageBackground, Text, View,
    StyleSheet, TouchableOpacity, Image,
    TextInput, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

export default function SignIn() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, loadingAuth,clearField } = useContext(AuthContext);

    function handleLogin() {
        signIn(email, password);

        if (clearField != false){
            setPassword('')
          }
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../src/assets/bg/bg.png')}
                style={styles.fundo}
            >
                <View style={styles.areaLogin}>
                    <View style={styles.header}>
                        <Image
                            source={require('../../../src/assets/logo/Logo.png')}
                            style={styles.logo}
                        />
                    </View>


                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="E-mail:"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        value={email}
                        autoCorrect={false}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Senha:"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        value={password}
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                    />

                    <TouchableOpacity onPress={handleLogin} style={styles.submitText}>
                        {
                            loadingAuth ? (
                                <ActivityIndicator size={20} color="#fff" />
                            ) : (
                                <Text style={{ fontSize: 18, color: '#fff' }}>Acessar</Text>
                            )
                        }

                    </TouchableOpacity>

                    <View style={styles.areaEsqRegist}>

                        <TouchableOpacity>
                            <Text style={{ color: '#fff', }}>Esqueci minha senha?</Text>
                        </TouchableOpacity>

                        <Text style={{ marginLeft: 5, marginRight: 5, color: '#fff', }}>|</Text>

                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{ color: '#fff', }}>Criar uma conta!</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </ImageBackground>

        </View >

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    fundo: {
        flex: 1,
        resizeMode: "cover",
    },
    header: {
        marginTop: -30,
        marginBottom: 94,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    areaLogin: {
        flex: 1,
        justifyContent: 'center',
        padding: 27,
    },
    submitText: {
        alignItems: 'center',
        backgroundColor: '#1152ff',
        padding: 10,
        borderRadius: 8,
    },
    areaEsqRegist: {
        marginTop: 7,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    input: {
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.20)',
        marginBottom: 22
    }
})