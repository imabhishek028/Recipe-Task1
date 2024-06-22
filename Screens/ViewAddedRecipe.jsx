import { Text, View, SafeAreaView, StyleSheet, StatusBar, Image, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function ViewAddedRecipe({ navigation, route }) {
    const { renderData, index } = route.params;

    const onPressBack = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.totalContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F0EAD6" />
            <View style={styles.header}>
                <Text style={styles.headingText}>
                    {renderData[index].name}
                </Text>
            </View>
            <ScrollView style={styles.list}>
                <View style={styles.oneView}>
                    <Text style={styles.textHeading}>
                        Ingredients
                    </Text>
                    <Text style={styles.contentText}>
                        {renderData[index].ingredients}
                    </Text>

                </View>
                <View style={styles.oneView}>
                    <Text style={styles.textHeading}>
                        Procedure
                    </Text>
                    <Text style={styles.contentText}>
                        {renderData[index].procedure}
                    </Text>
                </View>
            </ScrollView>
            <TouchableOpacity onPress={onPressBack} style={styles.iconButton}>
                <FontAwesome5 name="long-arrow-alt-left" size={40} color="#000000" />
            </TouchableOpacity>
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
        alignItems: 'center',
        justifyContent: 'center'
    }
});
