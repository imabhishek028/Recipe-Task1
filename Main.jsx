import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { data } from './Utils/data';
import { scale, verticalScale } from 'react-native-size-matters';


export default function Main({navigation}) {
  const ddata = [
    { label: 'Potato', value: 1 },
    { label: 'Broccoli', value: 2 },
    { label: 'Cheese', value: 3 },
    { label: 'Garlic', value: 4 },
    { label: 'Chicken', value: 5 },
  ];

  const [selected, setSelected] = useState([]);
  const [renderRecipe, setRenderRecipe] = useState([]);
  const [buttonPressed, setButtonPressed] = useState(false);

  const OnPressHandler = (item) => {
    var index = data.findIndex((i) => i === item);
    console.log(index)
    navigation.navigate('RecipeDetails', { index });
  }

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

  const onPressShowRecipes = (selected) => {
    setButtonPressed(true);
    let matchedRecipes = [];
    var sizeOfSelected = selected.length;
    data.forEach((x) => {
      let matched = true;
      for (let i = 0; i < sizeOfSelected; i++) {
        if (!x.main.includes(selected[i])) {
          matched = false;
          break;
        }
      }
      if (matched) {
        matchedRecipes.push(x);
      }
    });
    setRenderRecipe(matchedRecipes);
  };

  return (
    <SafeAreaView style={styles.totalContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0EAD6" />
      <View style={styles.header}>
        <Text style={styles.headingText}>Recipes</Text>
        <Text style={styles.subheadingText}>Cook your delight!</Text>
      </View>
      <View style={styles.container}>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={ddata}
          labelField="label"
          valueField="value"
          placeholder="Select Ingredient(s)"
          value={selected}
          onChange={(items) => {
            if (items.length <= 3) {
              setSelected(items);
            } else {
              Alert.alert('Are you sure you can eat it?', 'You can\'t choose more than 3 ingredients as that will make the Recipe bad.');
            }
          }}
          multiple={true}
          containerStyle={styles.dropdownContainer}
          renderItem={item => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.label}</Text>
            </View>
          )}
          renderSelectedItem={(item, unSelect) => (
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <Text style={styles.icon} onPress={() => unSelect && unSelect(item)}>×</Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={selected.length === 0 || selected.length >= 4 ? styles.disabledButton : styles.submitButton}
          onPress={() => onPressShowRecipes(selected)}
          disabled={selected.length === 0 || selected.length >= 4}
        >
          <Text style={styles.submitButtonText}>Show Recipes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        {buttonPressed === false ?
          <View style={[{ justifyContent: 'center', alignContent: 'center', flex: 1 }]}>
            <Text style={[{ alignSelf: 'center', fontSize: scale(16), color: '#000000' }]}>
              Choose the ingredients and work that magic!
            </Text>
          </View>
          : (
            <FlatList
              data={renderRecipe}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
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
    fontSize: scale(40),
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
  container: {
    padding: scale(16),
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: scale(12),
    padding: scale(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scale(1),
    },
    shadowOpacity: 0.2,
    shadowRadius: scale(1.41),
    elevation: scale(2),
  },
  placeholderStyle: {
    fontSize: scale(16),
    color: '#555',
  },
  selectedTextStyle: {
    fontSize: scale(4),
    color: '#333',
  },
  iconStyle: {
    color: '#555',
  },
  icon: {
    fontSize: scale(16),
    color: '#555',
    marginLeft: scale(5),
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(14),
    backgroundColor: '#E0E0E0',
    marginTop: scale(8),
    marginRight: scale(12),
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderWidth: scale(1),
    borderColor: '#ccc',
  },
  textSelectedStyle: {
    marginRight: scale(4),
    fontSize: scale(13),
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: scale(12),
    padding: scale(12),
    marginTop: scale(16),
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
    borderRadius: scale(12),
    padding: scale(12),
    marginTop: scale(16),
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    elevation: scale(25),
    borderColor: '#4CAF50',
    borderWidth: scale(0.2),
  },
  dropdownContainerText: {
    color: '#333333',
    fontSize: scale(18),
    marginBottom: scale(10),
  },
  item: {
    padding: scale(5),
    borderColor: '#848782',
    borderWidth: scale(0.2),
    marginVertical: scale(1),
  },
  itemText: {
    fontSize: scale(15),
    color: '#333333',
    paddingLeft:scale(6)
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
    resizeMode:'cover'
  },
  list: {
    flex: 1,
    backgroundColor: '#F0EAD6',
    paddingVertical: scale(1),
  },
});
