import React, { useState, useContext } from 'react';
import {
    Button, ImageBackground, Text, View,
    StyleSheet, TouchableOpacity, Image,
    TextInput, ActivityIndicator
} from 'react-native';
import { AuthContext } from '../../contexts/auth';

export default function SignUp() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContext)

    function handleSignUp() {
        if (confPassword === password) {
            signUp(email, password, nome)
        } else {
            alert('Senha não correspondente!')
        }

    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../src/assets/bg/bg.png')}
                style={styles.fundo}
            >
                <View style={styles.areaRegister}>

                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setNome(text)}
                        placeholder="Nome:"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        value={nome}
                        autoCorrect={false}
                        autoCapitalize="none"
                    />

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
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setConfPassword(text)}
                        placeholder="Comfirma sua senha:"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        value={confPassword}
                        secureTextEntry={true}
                    />

                    <TouchableOpacity onPress={handleSignUp} style={styles.submitText}>
                        {
                            loadingAuth ? (
                                <ActivityIndicator size={20} color="#fff" />
                            ) : (
                                <Text style={{ fontSize: 18, color: '#fff', }}>Registrar</Text>
                            )
                        }

                    </TouchableOpacity>


                </View>
            </ImageBackground>

        </View>

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
    areaRegister: {
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
    input: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.20)',
        marginBottom: 22
    }
})