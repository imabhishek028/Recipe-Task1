import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RecipeDetails from './Screens/RecipeDetails'
import Main from './Main';
import Favourites from './Screens/Favourites';
import FilterRecipes from './Screens/FilterRecipes';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { scale, verticalScale } from 'react-native-size-matters';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Hometabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: '#4CAF50',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#fff',
        inactiveBackgroundColor: '#999',
        tabBarActiveBackgroundColor: '#D5DADA',
        showLabel: true,
        labelStyle: { fontSize: scale(16) }
      }}
    >
      <Tab.Screen
        name='Home'
        component={Main}
        options={{
          header: () => null,
          tabBarIcon: () => <Text><FontAwesome5 name="home" size={24} color="black" /></Text>
        }}
      />
      <Tab.Screen
        name='Filter Recipes'
        component={FilterRecipes}
        options={{
          header: () => null,
          tabBarIcon: () => <Text><FontAwesome6 name="filter" size={24} color="black" /></Text>
        }}
      />
      <Tab.Screen
        name='Favourites'
        component={Favourites}
        options={{
          header: () => null,
          tabBarIcon: () => <Text><FontAwesome5 name="star" size={24} color="black" /></Text>
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={[{ flex: 1 }]}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name="HomeTabs"
            component={Hometabs}
            options={{
              header: () => null
            }}
          />
          <Stack.Screen
            name="RecipeDetails"
            component={RecipeDetails}
            options={{
              header: () => null
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
