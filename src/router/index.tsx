/**
 * @file index.js
 * @description 路由配置文件，使用 react-navigation 进行路由导航
 * @reference https://reactnavigation.org/docs/getting-started/
 */
import React from 'react';
import { Image } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { navigationRef } from './navigation';
import commonStyle from '../styles';

import HomeScreen from '../views/home';
import DetailsScreen from '../views/detail';
import SettingsScreen from '../views/setting';
import LoginScreen from '../views/login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// tabbar 导航方式
// https://reactnavigation.org/docs/tab-based-navigation
const BottomTabBar = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = focused
              ? require('@/assets/tabbar/icon_sx_active.png')
              : require('@/assets/tabbar/icon_sx.png');
            break;
          case 'Details':
            iconName = focused
              ? require('@/assets/tabbar/icon_msg_active.png')
              : require('@/assets/tabbar/icon_msg.png');
            break;
          case 'Mine':
            iconName = focused
              ? require('@/assets/tabbar/icon_mine_active.png')
              : require('@/assets/tabbar/icon_mine.png');
            break;
        }

        return <Image source={iconName} style={commonStyle.tabbarIcon} />;
      },
      tabBarActiveTintColor: '#3577FF',
      tabBarInactiveTintColor: '#333333',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: '实习' }} />
    <Tab.Screen
      name="Details"
      component={DetailsScreen}
      options={{ tabBarBadge: 3, title: '消息' }}
    />
    <Tab.Screen name="Mine" component={DetailsScreen} options={{ title: '我的' }} />
  </Tab.Navigator>
);

const Router = () => {
  return (
    // RNBootSplash.hide()方法用于关闭启动屏
    // https://github.com/zoontek/react-native-bootsplash
    <NavigationContainer ref={navigationRef} onReady={() => RNBootSplash.hide()}>
      {/* stack 导航方式  */}
      {/* https://reactnavigation.org/docs/hello-react-navigation */}
      <Stack.Navigator
        screenOptions={{
          headerBackTitle: '',
        }}
      >
        <Stack.Screen name="Tabbar" component={BottomTabBar} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
