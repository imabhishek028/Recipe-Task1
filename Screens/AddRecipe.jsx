import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { scale } from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddRecipe({ navigation }) {
  const [renderData, setRenderData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('recipe_added1');
        const parsedValue = value ? JSON.parse(value) : [];
        setRenderData(parsedValue);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const onPressItem = (item) => {
    var index = renderData.findIndex((i) => i.procedure === item.procedure);
    navigation.navigate('ViewAddedRecipe', { renderData, index });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      try {
        const value = await AsyncStorage.getItem('recipe_added1');
        const parsedValue = value ? JSON.parse(value) : [];
        setRenderData(parsedValue);
      } catch (e) {
        console.log(e);
      }
      setRefreshing(false);
    }, 2000);
  }, []);

  const onPressRecipeInput = () => {
    navigation.navigate('RecipeInput');
  };

  const deleteItem = async (item) => {
    const newData = renderData.filter(i => i.procedure !== item.procedure);
    setRenderData(newData);
    await AsyncStorage.setItem('recipe_added1', JSON.stringify(newData));
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContent}>
        <TouchableOpacity style={styles.itemTextContainer} onPress={() => onPressItem(item)}>
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteIcon} onPress={() => deleteItem(item)}>
          <FontAwesome5 name='trash-alt' size={scale(20)} color='#FF0000' />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0EAD6" />
      <View style={styles.headingView}>
        <Text style={styles.headingText}>My Recipes</Text>
        <Text style={styles.subheadingText}>Pull down to Refresh!</Text>
      </View>
      <View style={styles.bodyView}>
        <FlatList
          data={renderData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>
      <View style={styles.addRecipe}>
        <TouchableOpacity onPress={onPressRecipeInput}>
          <FontAwesome5 name='plus' size={scale(40)} color='#FFFFFF' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EAD6',
  },
  headingView: {
    alignItems: 'center',
    marginBottom: scale(20),
  },
  headingText: {
    fontSize: scale(38),
    textAlign: 'center',
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  bodyView: {
    flex: 1,
    marginHorizontal: scale(10),
  },
  addRecipe: {
    position: 'absolute',
    bottom: scale(20),
    right: scale(20),
    backgroundColor: '#4CAF50',
    height: scale(70),
    width: scale(70),
    borderRadius: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 1,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: scale(18),
    color: '#000000',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: scale(10),
    borderRadius: scale(8),
    marginBottom: scale(10),
    elevation: 2,
  },
  deleteIcon: {
    paddingLeft: scale(10),
  },
  subheadingText: {
    textAlign: 'center',
    margin: scale(2),
    fontSize: scale(14),
    color: '#333333',
  },
});
