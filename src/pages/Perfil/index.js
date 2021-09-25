import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Text, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import firebase from '../../services/firebaseConnection';


export default function Perfil() {
    const { user, valueColor, image, setImage, setNewImage, newImage } = useContext(AuthContext);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [inputStatus, setInputStatus] = useState(false);

    useEffect(() => {

        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'gratend') {
                    alert('Desculpe, precisamos de permissões de rolo da câmera para fazer isso funcionar!')
                }
            }
        })
    }, []);

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        // console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
        }
        uploadImage(result)
    };

    async function uploadImage(uri) {
        const response = await fetch(uri.uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child(user && user.uid);
        console.log(ref.put(blob))
        // alert('Foto alterada')
        setNewImage(uri.uri);
        return ref.put(blob);
    };

    function updateDados() {
        setNewName(user && user.nome)
        setNewEmail(user && user.email)
        setInputStatus(true);
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: valueColor || user.cor }]}>
            <Header />

            <View style={styles.perfil}>

                {
                    newImage == null ?
                        <Image
                            source={require('../../assets/perfil/perfil.png')}
                            style={{ width: 120, height: 120, borderRadius: 400 / 2 }}
                            resizeMode="contain"
                        />
                        :
                        <Image
                            source={{ uri: image || newImage }}
                            style={{ width: 120, height: 120, borderRadius: 400 / 2 }}
                            resizeMode="contain"
                        />
                }
                <TouchableOpacity style={{ position: 'absolute', top: 90, }} onPress={pickImage}>
                    <FontAwesome name="edit" size={25} color="#F2F2F2" />
                </TouchableOpacity>
            </View>


            <View style={styles.info}>
                <View style={styles.subInfo}>
                    <Text style={styles.texto}>Nome:</Text>
                    {
                        inputStatus === false ?
                            <TouchableOpacity onPress={updateDados}>
                                <Text style={styles.subTexto}>{user && user.nome}</Text>
                            </TouchableOpacity>
                            :
                            <TextInput
                                style={styles.input}
                                value={newName}
                                onChangeText={name => setNewName(name)}
                            />
                    }
                </View>

                <View style={styles.subInfo}>
                    <Text style={styles.texto}>E-mail:</Text>
                    {
                        inputStatus === false ?
                            <TouchableOpacity onPress={updateDados}>
                                <Text style={styles.subTexto}>{user && user.email}</Text>
                            </TouchableOpacity>
                            :
                            <TextInput
                                style={styles.input}
                                value={newEmail}
                                onChangeText={email => setNewEmail(email)}
                            />
                    }
                </View>

                <View style={styles.subInfo}>
                    <Text style={styles.texto}>Definir Senha:</Text>
                    <Text style={styles.subTexto}>********</Text>
                </View>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    perfil: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        height: 130
    },
    info: {
        marginTop: 10,
    },
    subInfo: {
        borderBottomWidth: 0.2,
        borderBottomColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    texto: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
    },
    subTexto: {
        color: '#fff',
        fontSize: 16,
        paddingRight: 10,
    },
    input: {
        fontSize: 18,
        borderWidth: 0.2,
        borderColor: '#FFF',
        padding: 6,
        width: '50%',
        height: 35,
        color: '#fff',
        marginRight: 10,
    }
})