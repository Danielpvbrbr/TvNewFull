import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
const AuthStack = createNativeStackNavigator();

export default function AuthRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
            />

            <AuthStack.Screen
                name="SignUp"
                component={SignUp}

                options={{
                    headerStyle:{
                        backgroundColor: '#1053ff',
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(0,0,0,0.5)'
                    },
                    headerTintColor: '#FFF',
                    headerTitle: 'Voltar',
                    headerTransparent: true,
                    headerBackTitleVisible:false
                }}
            />
        </AuthStack.Navigator>
    );
}
