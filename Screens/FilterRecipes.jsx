import { View, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { Dropdown } from 'react-native-element-dropdown';
import { data } from '../Utils/data';

export default function FilterRecipes({navigation}) {
  const [filterationType, setFilterationType] = useState(null);
  const [placeholder, setPlaceholder] = useState("Select Basis of Filteration");
  const [mainFilter, setMainFilter] = useState(null);
  const [placeholderSecond, setPlaceholderSecond] = useState("Select you filter...")
  const [buttonPressed, setButtonPressed] = useState(false);


  const data1 = [
    { label: 'Cuisine', value: '1' },
    { label: 'Preparation Time', value: '2' },
    { label: 'Dietary Restriction', value: '3' },
  ];

  const datanull = [
  ]

  const OnPressHandler = (item) => {
    var index = data.findIndex((i) => i === item);
    console.log(index)
    navigation.navigate('RecipeDetails', { index });
  }


  const dataCuisine = [
    { label: 'Indian', value: 'Indian' },
    { label: 'Chinese', value: 'Chinese' },
    { label: 'American', value: 'American' },
    { label: 'Italian', value: 'Italian' }
  ]

  const dataPreparationTime = [
    { label: 'Less than 20 Minutes', value: 20 },
    { label: 'Less than 30 Minutes', value: 31 },
    { label: 'Less than an Hour', value: 61 },
  ]

  const dataDietaryRestrictions = [
    { label: 'Diabetes', value: -1 },
    { label: 'Blood Pressure', value: -2 },
    { label: 'Non Vegitarian', value: -4 },
  ]

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => OnPressHandler(item)}
      >
        <View style={styles.itemContent}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Image source={item.pic} style={styles.itemImage} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderRecipe = () => {
    if (filterationType == 1) {
      return data.filter((val) => val.cuisine === mainFilter);
    }
    if (filterationType == 2) {
      return data.filter((val) => val.preparationTime <= mainFilter);
    }
    if (filterationType == 3) {
      return data.filter((val) => val.dietaryRestriction === mainFilter);
    } else {
      return [];
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0EAD6" />
      <View style={styles.header}>
        <Text style={styles.headingText}>
          Filter Recipe!
        </Text>
      </View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data1}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        onChange={item => {
          setFilterationType(item.value);
          setPlaceholder(item.label)
        }}
        renderItem={item => (
          <View style={styles.filterationView}>
            <Text style={styles.filterationText}>
              {item.label}
            </Text>
          </View>
        )}
      />


      <Dropdown//Second dropdown
        style={styles.dropdownMain}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={filterationType == 1 ? dataCuisine : filterationType == 2 ? dataPreparationTime : filterationType == 3 ? dataDietaryRestrictions : datanull}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholderSecond}
        onChange={item => {
          setMainFilter(item.value);
          setPlaceholderSecond(item.label)
          setButtonPressed(true);
        }}
        renderItem={item => (
          <View style={styles.filterationView}>
            <Text style={styles.filterationText}>
              {item.label}
            </Text>
          </View>
        )}
      />
      <View style={styles.list}>
        <FlatList
          data={buttonPressed ? renderRecipe() : data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EAD6',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: scale(20),
  },
  headingText: {
    fontSize: scale(40),
    textAlign: 'center',
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  dropdown: {
    margin: scale(16),
    height: scale(50),
    borderColor: '#4CAF50',
    borderWidth: scale(1),
    borderRadius: scale(8),
    paddingHorizontal: scale(8),
    backgroundColor: '#FFFFFF'
  },
  placeholderStyle: {
    fontSize: scale(16),
    color: '#000000',
  },
  selectedTextStyle: {
    fontSize: scale(16),
    color: '#000000',
  },
  filterationView: {
    padding: scale(16),
    borderBottomWidth: scale(1),
    borderBottomColor: '#cccccc',
    backgroundColor: '#ffffff',
    borderRadius: scale(16)
  },
  filterationText: {
    fontSize: scale(16),
    color: '#000000',
  },
  dropdownMain: {
    margin: scale(16),
    marginTop: scale(6),
    height: scale(50),
    borderColor: '#4CAF50',
    borderWidth: scale(1),
    borderRadius: scale(8),
    paddingHorizontal: scale(8),
    backgroundColor: '#FFFFFF'
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
    paddingLeft: scale(6)
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
    resizeMode: 'cover'
  },
  list: {
    flex: 1,
    backgroundColor: '#F0EAD6',
    paddingVertical: scale(1),
    marginBottom: scale(30)
  },
});
