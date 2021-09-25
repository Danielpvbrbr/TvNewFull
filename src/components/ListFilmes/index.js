import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/auth';

export default function ListFilmes({ data }) {
    const { getVal, colorText } = useContext(AuthContext);

    return (
        <View style={styles.container}>

            <View style={{ flex: 1 }}>
                <ScrollView style={styles.scrollView}>
                    <TouchableOpacity onPress={() => getVal(data.group_title)} style={styles.button}>
                        <Text style={[styles.titulo, { color: colorText, borderColor: colorText }]}>{data.group_title}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 4,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#000"
    },
    titulo: {
        fontWeight: 'bold',
        padding: 10,
        fontSize: 17,
        borderWidth: 0.2,
    }
})