import React, { useState , useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image, TextInput, Keyboard, Alert,  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale } from 'react-native-size-matters';

const SignUp = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const onPressLogin = () => {
        navigation.navigate('LoginPage');
    };

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

    const onPressSignUp = async () => {
        Keyboard.dismiss();


        if (userName.trim().length < 6) {
            Alert.alert('Error!', 'Username should be at least 6 characters long and should not contain spaces.');
            return;
        }
        if (password.trim().length < 6) {
            Alert.alert('Error!', 'Password should be at least 6 characters long.');
            return;
        }
        if (/\s/.test(userName)) {
            Alert.alert('Error!', 'Username should not contain spaces.');
            return;
        }

        try {
            const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
            const userExists = users.some(user => user.userName === userName);

            if (userExists) {
                Alert.alert('Error!', 'Username already exists, try another username!');
            } else {
                await AsyncStorage.clear()

                const newUser = { userName, password };
                const updatedUsers = [...users, newUser];

                await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
                Alert.alert('Success', 'You are signed up, enjoy some meals.');
                await AsyncStorage.setItem('userToken', 'abc123'); 
                navigation.navigate('HomeTabs');
            }
        } catch (error) {
            console.log('Error signing up:', error);
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
                    <Image source={require('../Utils/SignUp2.png')} style={styles.image} />
                </View>
                <TextInput
                    style={styles.UsernameInput}
                    placeholder="Enter Username"
                    value={userName}
                    onChangeText={setUserName}
                />
                <TextInput
                    style={styles.UsernameInput}
                    placeholder="Enter Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.buttonView} onPress={onPressSignUp}>
                    <Text style={styles.textButton}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.signupView}>
                    <Text style={styles.signupText}>
                        Already a user?
                    </Text>
                    <TouchableOpacity onPress={onPressLogin}>
                        <Text
                            style={styles.signupLink}
                        >
                            Login
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

export default SignUp;
