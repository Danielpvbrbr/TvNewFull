import React, { useState, useContext, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Animated,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';
import { Video, AVPlaybackStatus } from 'expo-av';
import api from '../../services/api';
import * as ScreenOrientation from 'expo-screen-orientation';

import List from '../../components/List';
import SubList from '../../components/SubList';


export default function Home() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
    const { user,
        urlC,
        urlValue,
        altCategory,
        valueColor,
        colorText,
        controllAim,
        controllView,
        controllOpc,
    } = useContext(AuthContext);
    const video = useRef(null);
    const [listaCanais, setListaCanais] = useState(null);
    const [listaCategory, setListaCategory] = useState(null);
    const [height, setHeight] = useState(220);
    const [expand, setExpande] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [slidePosit, setSlidePosit] = useState(290);

    useEffect(() => {
        async function run() {
            try {
                const response2 = await api.get('/api/list/grupo');
                setListaCategory(response2.data);
            } catch (error) {
                console.log('ERRO:' + error)
            }

            try {
                const response = await api.get(`/api/list/canais/${altCategory || 'CANAL ABERTO'}`);
                setListaCanais(response.data);
            } catch (error) {
                console.log('ERRO:' + error)
            }
        }
        run()

    }, [altCategory])

    function controll() {
        video.current.presentFullscreenPlayer();
        expand != false ? setExpande(false) : setExpande(true);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: valueColor || user.cor }]}>
            <Header />

            <Animated.View style={[styles.headerVideoTop, { top: 50, opacity: controllAim }]}>
                <TouchableOpacity onPress={() => { }}>
                    <MaterialIcons style={{ marginRight: 7 }} name="cast-connected" size={24} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity onPress={controll}>
                    <FontAwesome style={{ marginRight: 7 }} name="expand" size={24} color="#FFF" />
                </TouchableOpacity>
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
                    ref={video}
                    style={[styles.preview, { borderBottomColor: colorText, height: height }]}
                    source={{
                        uri: urlValue || urlC
                    }}
                    useNativeControls={false}
                    resizeMode={Video.RESIZE_MODE_STRETCH}
                    isLooping={true}
                    shouldPlay={true}
                    rate={1.0}
                    volume={volume}
                    isMuted={false}
                    positionMillis={0.5}

                />

            </ TouchableNativeFeedback>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <FlatList
                    data={listaCategory}
                    renderItem={({ item }) => <List data={item} />}
                    keyExtractor={item => item.id}
                    style={{ marginRight: 2 }}
                />

                <FlatList
                    data={listaCanais}
                    renderItem={({ item }) => <SubList data={item} />}
                    keyExtractor={item => item.id}
                />
            </View>


        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        width: '100%',
        height: 225,
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
