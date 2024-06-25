import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { scale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function RecipeInput({ navigation }) {
    const [nameRecipe, setNameRecipe] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [procedure, setProcedure] = useState('');

    const onPressBack = () => {
        navigation.goBack();
    };

    const saveRecipe = async () => {
        if (!nameRecipe.trim() || !ingredients.trim() || !procedure.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            const recipe = {
                name: nameRecipe,
                ingredients: ingredients,
                procedure: procedure,
            };
            const recipeTillNow = await AsyncStorage.getItem('recipe_added1');
            const recipeTillNowParsed = recipeTillNow ? JSON.parse(recipeTillNow) : [];
            const newRecipeList = [...recipeTillNowParsed, recipe];
            await AsyncStorage.setItem('recipe_added1', JSON.stringify(newRecipeList));
            Alert.alert('Success', 'Recipe saved successfully');
            navigation.navigate('AddRecipe');
            setNameRecipe('');
            setIngredients('');
            setProcedure('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F0EAD6" />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity onPress={onPressBack} style={styles.iconButton}>
                            <FontAwesome5 name="long-arrow-alt-left" size={40} color="#000000" />
                        </TouchableOpacity>
                        <View style={styles.header}>
                            <Text style={styles.headingText}>Add details of your Recipe!</Text>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Enter Name Here'
                            value={nameRecipe}
                            onChangeText={(value) => setNameRecipe(value)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Ingredients:</Text>
                        <TextInput
                            style={[styles.input, { height: scale(100) }]}
                            placeholder='Enter Ingredients Here'
                            multiline
                            numberOfLines={4}
                            value={ingredients}
                            onChangeText={(value) => setIngredients(value)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Procedure:</Text>
                        <TextInput
                            style={[styles.input, { height: scale(160) }]}
                            placeholder='Enter Procedure Here'
                            multiline
                            numberOfLines={8}
                            value={procedure}
                            onChangeText={(value) => setProcedure(value)}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={saveRecipe}>
                        <Text style={styles.buttonText}>Save Recipe</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0EAD6',
    },
    inner: {
        flex: 1,
        paddingHorizontal: scale(20),
        paddingTop: scale(20),
    },
    header: {
        alignItems: 'center',
        marginBottom: scale(20),
    },
    headingText: {
        fontSize: scale(25),
        textAlign: 'center',
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: scale(20),
    },
    label: {
        fontSize: scale(18),
        marginBottom: scale(6),
        color: '#000000',
    },
    input: {
        height: scale(40),
        width: '100%',
        borderWidth: scale(2),
        borderColor: '#CCCCCC',
        backgroundColor: '#F0F0F0',
        borderRadius: scale(12),
        paddingHorizontal: scale(10),
        fontSize: scale(16),
        color: '#000000',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: scale(12),
        borderRadius: scale(12),
        alignItems: 'center',
        marginTop: scale(20),
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: scale(18),
        fontWeight: 'bold',
    },
    iconButton: {
       marginLeft:scale(5)
    },
});
