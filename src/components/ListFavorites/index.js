import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

export default function ListFavorites({ data, deleteItem }) {
    const { setUrlFilmes } = useContext(AuthContext);
    const navigation = useNavigation();

    function openShow() {
        setUrlFilmes(data.url)
        navigation.navigate('Filmes')
    };

    return (
        <TouchableWithoutFeedback onPress={openShow} onLongPress={() => deleteItem(data)}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Image
                        source={{ uri: data.logo }}
                        resizeMode="contain"
                        style={styles.preview}
                    />
                </ScrollView>
            </View>
        </TouchableWithoutFeedback >

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        paddingRight: 0,
    },
    preview: {
        width: '100%',
        height: 180,

    },



})