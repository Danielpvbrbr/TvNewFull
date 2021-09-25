import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import Movies from '../pages/Movies';
import Series from '../pages/Series';
import Favorites from '../pages/Favorites';
import Perfil from '../pages/Perfil';
import Support from '../pages/Support';
import Definitions from '../pages/Definitions';
import CustomDrawer from '../components/CustomDrawer';

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
    return (
        <AppDrawer.Navigator
       
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: 'rgb(26,26,26)'
                },
                labelStyle: {
                    fontWeight: 'bold',
                },
                drawerActiveTintColor: '#FFF',
                drawerActiveBackgroundColor: '#FF0000',
                drawerInactiveBackgroundColor: '#564EFF',
                drawerInactiveTintColor: '#DDD',
                drawerItemStyle: {
                    marginVertical: 5,
                },
                drawerLabelStyle: {
                    fontWeight: 'bold',
                },
               
            }}


        >
            <AppDrawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <AppDrawer.Screen name="Filmes" component={Movies} options={{ headerShown: false }} />
            <AppDrawer.Screen name="Series" component={Series} options={{ headerShown: false }} />
            <AppDrawer.Screen name="Favoritos" component={Favorites} options={{ headerShown: false }} />
            <AppDrawer.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
            {/* <AppDrawer.Screen name="Suporte" component={Support} options={{ headerShown: false }} /> */}
            <AppDrawer.Screen name="Configurações" component={Definitions} options={{ headerShown: false }} />
        </AppDrawer.Navigator>
    );
}

export default AppRoutes;