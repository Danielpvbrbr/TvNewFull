import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

export default function CustomDrawer(props) {
    const { user, signOut, image, newImage } = useContext(AuthContext);
    // const [fotoPerfil, setFotoPerfil] = useState('../../assets/perfil/perfil.png');
    const navigation = useNavigation();

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                    {
                        newImage == null ?
                            <Image
                                source={require('../../assets/perfil/perfil.png')}
                                style={{ width: 90, height: 90, borderRadius: 400 / 2 }}
                                resizeMode="contain"
                            />
                            :
                            <Image
                                source={{ uri: image || newImage }}
                                style={{ width: 90, height: 90, borderRadius: 400 / 2 }}
                                resizeMode="contain"
                            />
                    }

                </TouchableOpacity>

                <View style={{ marginLeft: 15, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Text style={{ color: '#fff', fontSize: 18, marginRight: 5 }}>
                        Bem-Vindo!
                    </Text>

                    <TouchableOpacity onPress={() => signOut()}>
                        <MaterialCommunityIcons name="location-exit" size={16} color="#ff0000" />
                    </TouchableOpacity>

                </View>
                <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold', paddingBottom: 25 }}>
                    {user && user.nome}
                </Text>
            </View>

            <DrawerItemList {...props} />


        </DrawerContentScrollView>
    );
}