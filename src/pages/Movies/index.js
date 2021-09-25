import React, { useState, useContext, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header'
import { AuthContext } from '../../contexts/auth';
import { Video, AVPlaybackStatus } from 'expo-av';
import api from '../../services/api';
import { MaterialIcons, FontAwesome, Octicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

import firebase from '../../services/firebaseConnection';
import ListFilmes from '../../components/ListFilmes';
import SubListFilmes from '../../components/SubListFilmes/index';

export default function Home() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
    const {
        user,
        urlFilmes,
        altCategory,
        controllAim,
        controllOpc,
        controllView,
        valueFavorites,
        statusFavorito,
        setStatusFavorito,
        deleteFavorito,
        valueColor,
        colorText
    } = useContext(AuthContext);
    const videofilmes = useRef(null);
    const [listaFilmes, setListaFilmes] = useState(null);
    const [listaCategory, setListaCategory] = useState(null);
    const [expand, setExpande] = useState(false);
    const [height, setHeight] = useState(220);
    const [orientationStatus, setOrientationStatus] = useState(null);
    const [volume, setVolume] = useState(0.5);
    const [slidePosit, setSlidePosit] = useState(290);
    const [statusBar, setStatusBar] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [mute, setMute] = useState(false);

    useEffect(() => {
        async function run() {
            try {
                const response2 = await api.get('/api/list/grupo/filmes');
                setListaCategory(response2.data);
            } catch (error) {
                console.log('ERRO:' + error)
            }

            try {
                const response = await api.get(`/api/list/filmes/${altCategory || 'Terror'}`);
                setListaFilmes(response.data);
            } catch (error) {
                console.log('ERRO:' + error)
            }
        }
        run()

    }, [altCategory]);


    function controll() {
        videofilmes.current.presentFullscreenPlayer()
        expand != false ? setExpande(false) : setExpande(true);
    };


    useEffect(() => {
        async function verf() {
            await ScreenOrientation.getOrientationAsync()
                .then(res => {

                    if (res === 1) {
                        setOrientationStatus('vertical')
                        setHeight(250)
                        return;
                    }
                    if (res === 3) {
                        setOrientationStatus('Horizontal')
                        setSlidePosit(720)
                        setStatusBar(true)
                        return;
                    }
                })
        }
        verf()
    }, []);

    function handleAdd(statusFavorito) {
        if (statusFavorito === true) {
            let favorites = firebase.database().ref('favorites').child(user.uid);
            let chave = favorites.push().key;

            favorites.child(chave).set({
                title: valueFavorites.title,
                logo: valueFavorites.logo,
                url: valueFavorites.url
            })
                .then(() => {
                    setStatusFavorito(false)
                    // alert('SALVO');
                })
                .catch(() => {
                    alert('ERRO AO SALVAR');
                })

        } else {
            alert('Não SALVO')
        }

    };

    async function handleDelete(id) {
        await firebase.database().ref('favorites')
            .child(user.uid).child(id).remove()
            .then(async () => {
                setStatusFavorito(true)
                // setStatusFavorito(statusFavorito)
            }).catch((err) => {
                alert(err.code);
            })
    };

    function verFavorito() {
        if (statusFavorito === true)
            handleAdd(statusFavorito);

        else {
            handleDelete(deleteFavorito.toString());

        };
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: valueColor || user.cor }]}>
            <Header />

            <Animated.View style={[styles.headerVideoTop, { top: 50, opacity: controllAim }]}>
                {mute === true ?
                <TouchableOpacity onPress={() =>  setMute(!mute)}>
                    <Octicons name="mute" style={styles.iconControll} size={24} color="#FFF" />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => setMute(!mute)}>
                    <Octicons name="unmute" style={styles.iconControll} size={24} color="#FFF" />
                </TouchableOpacity>
                }


                <TouchableOpacity onPress={() => { }}>
                    <MaterialIcons style={styles.iconControll} name="cast-connected" size={24} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity onPress={controll}>
                    <FontAwesome style={styles.iconControll} name="expand" size={24} color="#FFF" />
                </TouchableOpacity>
                {
                    statusFavorito === true ?

                        <TouchableOpacity style={styles.iconControll} onPress={verFavorito}>
                            <MaterialIcons name="favorite-outline" size={24} color="#FFF" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.iconControll} onPress={verFavorito}>
                            <MaterialIcons name="favorite" size={24} color="#FF0000" />
                        </TouchableOpacity>
                }
            </Animated.View >

            <Animated.View style={{
                position: 'absolute',
                top: 130,
                left: slidePosit,
                zIndex: 1,
                opacity: controllOpc
            }}>
                <Slider
                    style={{
                        width: 150,
                        height: 45,
                        transform: [
                            { rotate: "270deg" },
                        ],
                    }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#564EFF"
                    maximumTrackTintColor="#FF0000"
                    value={volume}
                    onValueChange={value => setVolume(value)}
                />
            </Animated.View>

            {/* <Entypo style={styles.play} name="controller-play" size={40} color="#fff" /> */}

            < TouchableNativeFeedback onPress={controllView}>
                <Video
                    ref={videofilmes}
                    style={[styles.preview, { borderBottomColor: colorText, height: height }]}
                    source={{
                        uri: urlFilmes
                    }}
                    useNativeControls={true}
                    resizeMode={Video.RESIZE_MODE_STRETCH}
                    isLooping={true}
                    shouldPlay={true}
                    rate={1.0}
                    volume={volume}
                    isMuted={mute}
                    positionMillis={0.5}
                />

            </ TouchableNativeFeedback>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <FlatList
                    data={listaCategory}
                    renderItem={({ item }) => <ListFilmes data={item} />}
                    keyExtractor={item => item.id}
                    style={{ marginRight: 2 }}
                    extraData={selectedId}
                />

                <FlatList
                    data={listaFilmes}
                    renderItem={({ item }) => <SubListFilmes data={item} />}
                    keyExtractor={item => item.id}
                />
            </View>

        </SafeAreaView  >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconControll: {
        marginRight: 10
    },
    play: {
        top: 145,
        left: '45%',
        zIndex: 1,
        position: 'absolute',
    },
    preview: {
        width: '100%',
        marginBottom: 0,
        borderBottomWidth: 0.5,
    },
    headerVideoTop: {
        zIndex: 1,
        position: 'absolute',
        width: '100%',
        height: 25,
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

});
