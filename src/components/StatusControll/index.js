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
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
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



    return (
        <View>
            <Animated.View style={[styles.headerVideoTop, { top: 50, opacity: controllAim }]}>
                <TouchableOpacity onPress={() => { }}>
                    <MaterialIcons style={{ marginRight: 7 }} name="cast-connected" size={24} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity onPress={controll}>
                    <FontAwesome style={{ marginRight: 7 }} name="expand" size={24} color="#FFF" />
                </TouchableOpacity>
                {
                    statusFavorito === true ?

                        <TouchableOpacity style={{ marginRight: 7 }} onPress={verFavorito}>
                            <MaterialIcons name="favorite-outline" size={24} color="#FFF" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{ marginRight: 7 }} onPress={verFavorito}>
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
                    isMuted={false}
                    positionMillis={0.5}

                />

            </ TouchableNativeFeedback>

        </View>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
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
