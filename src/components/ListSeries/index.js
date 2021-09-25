import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { AuthContext } from '../../contexts/auth';


export default function ListFilmes({ handleValue, data }) {
    const { getVal, } = useContext(AuthContext);

    return (

        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <TouchableOpacity onPress={() => handleValue(true, data)}>
                    <Image
                        source={{ uri: data.logo }}
                        resizeMode="contain"
                        style={styles.preview}
                    />
                </TouchableOpacity>
            </ScrollView>
        </View>


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