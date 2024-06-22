import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RecipeDetails from './Screens/RecipeDetails';
import Main from './Main';
import Favourites from './Screens/Favourites';
import FilterRecipes from './Screens/FilterRecipes';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { scale, verticalScale } from 'react-native-size-matters';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LoginPage from './Screens/LoginPage';
import SignUp from './Screens/SignUp';
import AddRecipe from './Screens/AddRecipe';
import RecipeInput from './Screens/RecipeInput';
import ViewAddedRecipe from './Screens/ViewAddedRecipe';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Hometabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
            color = focused ? '#4CAF50' : 'gray';
          } else if (route.name === 'Filter Recipes') {
            iconName = 'filter';
            color = focused ? '#4CAF50' : 'gray';
          } else if (route.name === 'Favourites') {
            iconName = 'star';
            color = focused ? '#4CAF50' : 'gray';
          } else if( route.name==='AddRecipe'){
            iconName = 'plus';
            color = focused ? '#4CAF50' : 'gray';
          }
          if (route.name === 'Filter Recipes') {
            return <FontAwesome6 name={iconName} size={scale(28)} color={color} />;
          } else {
            return <FontAwesome5 name={iconName} size={scale(28)} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen
        name='Home'
        component={Main}
        options={{
          header: () => null,
        }}
      />
      <Tab.Screen
        name='Filter Recipes'
        component={FilterRecipes}
        options={{
          header: () => null,
        }}
      />
      <Tab.Screen
        name='Favourites'
        component={Favourites}
        options={{
          header: () => null,
        }}
      />
      <Tab.Screen
        name='AddRecipe'
        component={AddRecipe}
        options={{
          header: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={[{ flex: 1 }]}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LoginPage'>
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{
              header: () => null
            }}
          />

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
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              header: () => null
            }}
          />
          <Stack.Screen
            name='RecipeInput'
            component={RecipeInput}
            options={{
              header: () => null
            }}
          />
           <Stack.Screen
            name='ViewAddedRecipe'
            component={ViewAddedRecipe}
            options={{
              header: () => null
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
