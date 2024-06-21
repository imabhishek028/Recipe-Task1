import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image, TextInput, Keyboard, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale } from 'react-native-size-matters';

const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const checkLoggedIn = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                navigation.navigate('HomeTabs');
            }
        } catch (error) {
            console.error('Error checking logged in status:', error);
        }
    };

    const onPressSignUp = () => {
        navigation.navigate('SignUp');
    };

    const onPressLogin = async () => {
        Keyboard.dismiss();

        try {
            const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
            const user = users.find(user => user.userName === username && user.password === password);

            if (user) {
                await AsyncStorage.setItem('userToken', 'abc123'); 

                navigation.navigate('HomeTabs');
            } else {
                Alert.alert('Error', 'Username or password is incorrect. Please sign up.');
            }
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#0080FF" />
            <View style={styles.welcomeView}>
                <Text style={styles.welcomeText}>Welcome!</Text>
            </View>
            <View style={styles.containerBody}>
                <View style={styles.imageView}>
                    <Image source={require('../Utils/login.png')} style={styles.image} />
                </View>
                <TextInput
                    style={styles.UsernameInput}
                    placeholder="Enter Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.UsernameInput}
                    placeholder="Enter Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.buttonView} onPress={onPressLogin}>
                    <Text style={styles.textButton}>Login</Text>
                </TouchableOpacity>
                <View style={styles.signupView}>
                    <Text style={styles.signupText}>
                        New User?
                    </Text>
                    <TouchableOpacity onPress={onPressSignUp}>
                        <Text
                            style={styles.signupLink}
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0080FF',
    },
    welcomeText: {
        color: '#FFFFFF',
        fontSize: scale(35),
    },
    welcomeView: {
        marginTop: scale(40),
        alignItems: 'center',
        marginBottom: scale(50),
    },
    containerBody: {
        backgroundColor: '#D5DADA',
        flex: 1,
        borderTopRightRadius: scale(40),
        borderTopLeftRadius: scale(40),
        alignItems: 'center',
        paddingTop: scale(30),
    },
    image: {
        height: scale(85),
        width: scale(85),
    },
    imageView: {
        marginTop: scale(50),
        alignItems: 'center',
        marginBottom: scale(30),
    },
    UsernameInput: {
        height: scale(40),
        width: '80%',
        borderWidth: scale(2),
        borderColor: '#555',
        backgroundColor: '#89CFF0',
        alignSelf: 'center',
        marginVertical: scale(10),
        borderRadius: scale(12),
        textAlign: 'center',
        fontSize: scale(16),
        color: '#000000',
    },
    buttonView: {
        marginVertical: scale(20),
        backgroundColor: '#0080FF',
        height: scale(40),
        width: scale(100),
        borderRadius: scale(12),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        fontSize: scale(18),
        color: '#FFFFFF',
    },
    signupView: {
        flexDirection: 'row',
        marginTop: scale(20),
    },
    signupText: {
        fontSize: scale(16),
        color: '#000000',
    },
    signupLink: {
        fontSize: scale(16),
        color: '#0080FF',
        marginLeft: scale(10),
    },
});

export default LoginPage;
