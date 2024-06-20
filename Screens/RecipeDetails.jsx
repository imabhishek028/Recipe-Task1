import { Text, View, SafeAreaView, StyleSheet, StatusBar, Image, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { data } from '../Utils/data';

export default function RecipeDetails({ navigation, route }) {
  const { index } = route.params;
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const checkIfRecipeIsFav = async () => {
      const favList = await getExistingFavouriteRecipe();
      const found = favList.some(item => item.name === data[index].name);
      if (found) {
        setClicked(true);
      }
    };
    checkIfRecipeIsFav();
  }, [index]);

  const onPressBack = () => {
    navigation.goBack()
  };

  const onPressStar = async () => {
    let updatedFavouriteRecipe = [];
    if (!clicked) {
      Alert.alert('Recipe saved!', 'Navigate to Favourites to view.');
      setClicked(true);
      try {
        const recipeToBeAdded = data[index];
        let existingFavouriteRecipe = await getExistingFavouriteRecipe();
        updatedFavouriteRecipe = [...existingFavouriteRecipe, recipeToBeAdded];
        await AsyncStorage.setItem(
          'FavouriteRecipes',
          JSON.stringify(updatedFavouriteRecipe)
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Recipe has now been removed from Favourite!', 'Click again to add.');
      setClicked(false);
      try {
        const recipeToBeRemoved = data[index];
        let existingFavouriteRecipe = await getExistingFavouriteRecipe();
        updatedFavouriteRecipe = existingFavouriteRecipe.filter(item => item.name !== recipeToBeRemoved.name);
        await AsyncStorage.setItem(
          'FavouriteRecipes',
          JSON.stringify(updatedFavouriteRecipe)
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getExistingFavouriteRecipe = async () => {
    try {
      let listFav = await AsyncStorage.getItem('FavouriteRecipes');
      if (listFav) {
        return JSON.parse(listFav);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return (
    <SafeAreaView style={styles.totalContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0EAD6" />
      <View style={styles.header}>
        <Text style={styles.headingText}>
         {data[index].name}
        </Text>
        <View style={styles.viewImageFlex}>
          <TouchableOpacity onPress={onPressBack} style={styles.iconButton}>
            <FontAwesome5 name="long-arrow-alt-left" size={40} color="#000000" />
          </TouchableOpacity>
          <Image
            source={data[index].pic}
            style={styles.imageStyle}
          />
          <TouchableOpacity onPress={onPressStar} style={styles.iconButton}>
            <FontAwesome name="star" size={50} color={clicked ? "#4CAF50" : "#FFFFFF"} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.list}>
        <View style={styles.oneView}>
          <Text style={styles.textHeading}>
            Ingredients
          </Text>
          {Object.keys(data[index].ingredients).map(ingredient => (
            <Text key={ingredient} style={styles.contentText}>
              {data[index].ingredients[ingredient]}
            </Text>
          ))}
        </View>
        <View style={styles.oneView}>
          <Text style={styles.textHeading}>
            Procedure
          </Text>
          {Object.keys(data[index].procedure).map(step => (
            <Text key={step} style={styles.contentText1}>
              {data[index].procedure[step]}
            </Text>
          ))}
        </View>
        <View style={styles.oneView}>
          <Text style={styles.textHeading}>
            Preparation Time
          </Text>
          <Text style={styles.contentText}>
            {data[index].preparationTime} Minutes
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  totalContainer: {
    backgroundColor: '#F0EAD6',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: scale(20),
  },
  headingText: {
    fontSize: scale(30),
    textAlign: 'center',
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: scale(10),
  },
  imageStyle: {
    width: scale(120),
    height: verticalScale(120),
    margin: scale(10),
    borderRadius: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scale(2),
    },
    shadowOpacity: 0.2,
    shadowRadius: scale(4),
    elevation: scale(5),
    resizeMode: 'cover',
  },
  list: {
    backgroundColor: '#FFFFFF',
    margin: scale(10),
    borderRadius: scale(10),
    padding: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: scale(4),
    width: '90%',
    alignSelf: 'center',
  },
  textHeading: {
    color: '#4CAF50',
    fontSize: scale(22),
    padding: scale(5),
    fontWeight: 'bold',
  },
  contentText: {
    fontSize: scale(18),
    color: '#333333',
    marginLeft: scale(5),
    marginBottom: scale(5),
  },
  oneView: {
    padding: scale(5),
    borderBottomWidth: scale(1),
    borderBottomColor: '#ccc',
  },
  contentText1: {
    fontSize: scale(18),
    color: '#333333',
    padding: scale(2),
    marginLeft: scale(5),
    marginBottom: scale(5),
  },
  viewImageFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: scale(20),
  },
  iconButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  }
});
