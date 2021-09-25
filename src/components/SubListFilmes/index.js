import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/auth';

export default function SubListFilmes({ data }) {
    const { selectFilmes, colorText } = useContext(AuthContext);

    return (
        <View style={styles.container}>

            <View style={{ flex: 1 }}>
                <ScrollView style={styles.scrollView}>
                    <TouchableOpacity onPress={() => selectFilmes(data)} style={styles.button}>
                        <Text style={[styles.titulo, { borderColor: colorText, }]}>{data.title}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 2,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#564EFF'
    },
    titulo: {
        color: '#fff',
        fontWeight: 'bold',
        borderWidth: 0.2,
        padding: 10,
        fontSize: 14,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    }
})