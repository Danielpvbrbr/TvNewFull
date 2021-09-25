import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';
import ListSeries from '../../components/ListSeries';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Picker } from '@react-native-picker/picker';
require('react-native').unstable_enableLogBox();
console.disableYellowBox = true;

const numColumns = 3;

export default function Series() {
    const { user, colorText, valueColor } = useContext(AuthContext);
    const videofilmes = useRef(null);
    const [filmes, setFilmes] = useState([]);
    const [categorySeries, setCategorySeries] = useState([]);
    const [valueCategory, setvalueCategory] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [urlSeries, setUrlSeries] = useState(null);
    const [loading, setLoading] = useState(false);
    const [height, setHeight] = useState(220);

    useEffect(() => {
        setLoading(true);
        async function run() {
            try {
                const res = await api.get('/api/list/grupo/filmes');
                setCategorySeries(res.data);
                setLoading(false);
            } catch (error) {
                console.log('ERRO:' + error)
                setLoading(false);
            }

            try {
                const response = await api.get(`/api/list/filmes/${valueCategory || 'Terror'}`);
                setFilmes(response.data);
                setLoading(false);

            } catch (error) {
                console.log('ERRO:' + error);
                setLoading(false);
            }
        }
        run();

    }, [valueCategory]);

    function handleValue(value, data) {
        setOpenModal(value)
        setUrlSeries(data.url)
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: valueColor || user.cor }]}>
            <Header />

            {
                openModal === true ?
                    <View style={styles.centeredView}>

                        < TouchableNativeFeedback onPress={() => { }}>
                            <Video
                                ref={videofilmes}
                                style={[styles.preview, { borderBottomColor: colorText, height: height }]}
                                source={{
                                    uri: urlSeries
                                }}
                                useNativeControls={true}
                                resizeMode={Video.RESIZE_MODE_STRETCH}
                                isLooping={true}
                                shouldPlay={true}
                                rate={1.0}
                                // volume={volume}
                                isMuted={false}
                                positionMillis={0.5}
                            />

                        </ TouchableNativeFeedback>

                    </View>
                    :
                    <View />
            }

            <Picker
                selectedValue={valueCategory}
                onValueChange={(v, i) => setvalueCategory(v)}
                style={{ marginLeft: 5, marginRight: 5, }}
            >
                {
                    categorySeries.map(value =>
                        < Picker.item style={{ color: colorText }} label={value.group_title} value={value.group_title} />
                    )
                }

            </Picker>
            {
                loading === true ?
                    (
                        < ActivityIndicator style={{ zIndex: 1, position: 'absolute', top: '45%', left: '45%' }} size={40} color={colorText} />
                    )
                    :
                    (
                        <View />
                    )
            }

            <FlatList
                contentContainerStyle={{ flexDirection: 'column' }}
                data={filmes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (<ListSeries data={item} handleValue={handleValue} />)}
                horizontal={false}
                numColumns={numColumns}
            />


        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        width: '100%',
        marginBottom: 0,
        borderBottomWidth: 0.5,
    },


});
