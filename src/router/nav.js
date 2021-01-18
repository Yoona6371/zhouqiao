import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 该文件还没有链接到App.js上
// 路由
import Index from '../pages/home/index'
import Tabbar from '../router/tabbar'

const Stack = createStackNavigator();

function App() {
    console.log("进入Nav")
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Tabbar" headerMode="none">
                <Stack.Screen name="Index" component={Index} />
                <Stack.Screen name="Tabbar" component={Tabbar} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;