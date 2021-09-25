import React, { useState, useContext, useEffect } from 'react';
import { Alert, View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header'
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import ListFavorit from '../../components/ListFavorites';
const numColumns = 3;


export default function Favorites() {
    const { user, listFavorites, setListFavorites, valueColor } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function loadingFavorites() {
            setLoading(true)
            await firebase.database().ref('favorites').child(user.uid).on('value', (snapshot) => {
                setLoading(false)
                setListFavorites([]);
                snapshot.forEach((childItem) => {
                    let data = {
                        id: childItem.key,
                        logo: childItem.val().logo,
                        url: childItem.val().url,
                        title: childItem.val().title
                    }
                    setListFavorites(oldArray => [...oldArray, data]);

                })
            })
        }
        loadingFavorites()

    }, []);

    function verifyDelete(data) {

        Alert.alert(
            'Atenção!',
            `Você deseja excluir ${data.title}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuir',
                    onPress: () => handleDelete(data)
                }
            ]
        )

    };

    async function handleDelete(data) {
        await firebase.database().ref('favorites')
            .child(user.uid).child(data.id).remove()
            .then(async () => {
                alert('Deletado com sucesso!')
            }).catch((err) => {
                alert(err.code)
            })
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: valueColor || user.cor }]}>
            <Header />
            <View>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={listFavorites}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (<ListFavorit data={item} deleteItem={verifyDelete} />)}
                    horizontal={false}
                    numColumns={numColumns}
                />
                {
                    loading === true ?
                        (
                            < ActivityIndicator style={{ zIndex: 1, position: 'absolute', top: 350, left: '45%' }} size={50} color="#FFF" />
                        )
                        :
                        (
                            <View />
                        )
                }
              
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "rgb(26,26,26)",
    },
    list: {
        flexDirection: 'column',
    }

});
