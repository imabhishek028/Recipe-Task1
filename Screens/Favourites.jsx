import { View, Text, StyleSheet, SafeAreaView, StatusBar, RefreshControl, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { scale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { data } from '../Utils/data';

export default function Favourites({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [renderData, setRenderData] = useState([]);

  const onPressHandler = (item) => {
    var index = data.findIndex((i) => i.name === item.name);
    console.log(index)
    navigation.navigate('RecipeDetails', { index });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onPressHandler(item)}
      >
        <View style={styles.itemContent}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Image source={item.pic} style={styles.itemImage} />
        </View>
      </TouchableOpacity>
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      try {
        const favList = await AsyncStorage.getItem('FavouriteRecipes');
        setRenderData(favList != null ? JSON.parse(favList) : []);
      } catch (e) {
        console.log(e);
      }
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const favList = await AsyncStorage.getItem('FavouriteRecipes');
        setRenderData(favList != null ? JSON.parse(favList) : []);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.totalContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0EAD6" />
      <View style={styles.header}>
        <Text style={styles.headingText}>Favourites!</Text>
        <Text style={styles.subheadingText}>Pull down to Refresh!</Text>
      </View>
      <View style={styles.list}>
        {/* {Array.isArray(renderData) && renderData.length === 0 ? (
          <View style={[{ justifyContent: 'center', alignContent: 'center', flex: 1 }]}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <Text style={[{ alignSelf: 'center', fontSize: scale(16), color: '#000000' }]}>
              Add recipes to favourite and view them here!
            </Text>
          </View>
        ) : ( */}
          <FlatList
            data={renderData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        {/* )} */}
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
    fontSize: scale(38),
    textAlign: 'center',
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  subheadingText: {
    textAlign: 'center',
    margin: scale(2),
    fontSize: scale(14),
    color: '#333333',
  },
  item: {
    padding: scale(5),
    borderColor: '#848782',
    borderWidth: scale(0.2),
    marginVertical: scale(1),
  },
  itemText: {
    fontSize: scale(15),
    color: '#000000',
    paddingLeft: scale(6),
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: scale(12),
    padding: scale(2),
    marginVertical: scale(4),
    marginHorizontal: scale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scale(1),
    },
    shadowOpacity: 0.2,
    shadowRadius: scale(1.41),
    elevation: scale(2),
    borderWidth: scale(1),
    borderColor: '#ddd',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemImage: {
    width: scale(60),
    height: scale(40),
    borderRadius: scale(12),
    resizeMode: 'cover',
  },
  list: {
    flex: 1,
    backgroundColor: '#F0EAD6',
    paddingVertical: scale(1),
  },
});
