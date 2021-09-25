import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header'
import { AuthContext } from '../../contexts/auth';


export default function Support() {
    const { user, valueColor } = useContext(AuthContext);
  
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: valueColor || user.cor }]}>
            <Header />

            <Text>Support</Text>
            <Text>{user && user.nome}</Text>
            <Text>{user && user.email}</Text>
            <Text>{user && user.uid}</Text>
            <Text>{user && user.cor}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },


});
