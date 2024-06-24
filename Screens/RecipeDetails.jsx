import { Text, View, SafeAreaView, StyleSheet, StatusBar, Image, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { data } from '../Utils/data';
import { Rating } from 'react-native-ratings';
import Tts from 'react-native-tts';

export default function RecipeDetails({ navigation, route }) {
  const { index } = route.params;
  const [clicked, setClicked] = useState(false);
  const [starRating, setStarRating] = useState(null);
  const [initialRating, setInitialRating] = useState(3.5);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const getStarRating = async () => {
      try {
        const starData = await AsyncStorage.getItem('star_key1');
        const starDataParsed = starData ? JSON.parse(starData) : [];
        const rating = starDataParsed.find((i) => i.recipeName === data[index].name);

        if (rating) {
          setInitialRating(rating.starValue);
        }
      } catch (error) {
        console.log(error); 
      }
    };

    getStarRating();
  }, [index]);

  const setAsyncStorage = async (value) => {
    const starValue = {
      recipeName: data[index].name,
      starValue: value
    }
    try {
      const currentData = await AsyncStorage.getItem('star_key1');
      const currentDataParsed = currentData ? JSON.parse(currentData) : [];
      
      const existingIndex = currentDataParsed.findIndex(item => item.recipeName === data[index].name);
      if (existingIndex !== -1) {
        currentDataParsed[existingIndex].starValue = value;
      } else {
        currentDataParsed.push(starValue);
      }
      await AsyncStorage.setItem('star_key1', JSON.stringify(currentDataParsed));
    } catch (error) {
    }
  }

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
    navigation.goBack();
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

  const onPressPlay = () => {
    try {
      const procedureSteps = Object.values(data[index].procedure).join(' ');
      if (isPlaying) {
        Tts.stop();
      } else {
        Tts.speak(procedureSteps, {
          androidParams: {
            KEY_PARAM_PAN: -1,
            KEY_PARAM_VOLUME: 0.5,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
          },
        });
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.log(error);
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.textHeading}>
              Procedure
            </Text>
            <TouchableOpacity
              style={styles.playAudio}
              onPress={onPressPlay}>
              <Text>
                <FontAwesome5 name={isPlaying ? "pause" : "play"} size={scale(20)} color={'#000000'} />
              </Text>
            </TouchableOpacity>
          </View>
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
      <View style={styles.ratingContainer}>
        <Text style={styles.textHeading}>Rate this recipe:</Text>
        <Rating
          type='star'
          ratingCount={5}
          imageSize={scale(30)}
          ratingBackgroundColor='#F0EAD6'
          tintColor='#F0EAD6'
          startingValue={initialRating}
          onFinishRating={(value) => {
            setStarRating(value);
            setAsyncStorage(value);
          }}
        />
      </View>
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
    marginTop: scale(2),
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
    marginLeft: scale(5),
    marginBottom: scale(5),
    textAlign: 'justify',
  },
  ratingContainer: {
    backgroundColor: '#F0EAD6',
    padding: scale(10),
    alignItems: 'center',
  },
  viewImageFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: scale(10),
  },
  playAudio: {
    marginLeft: scale(130),
  },
});
