import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image, TextInput, Touchable } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function LoginPage() {

  
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#0080FF" />
            <View style={styles.welcomeView}>
                <Text style={styles.welcomeText}>
                    Welcome!
                </Text>
            </View>
            <View style={styles.containerBody}>
                <View style={styles.imageView}>
                    <Image
                        source={require('../Utils/login.png')}
                        style={styles.image}
                    />
                </View>
                <TextInput
                    style={styles.UsernameInput}
                    placeholder='Enter Username'
                />
                <TextInput
                    style={styles.UsernameInput}
                    placeholder='Enter Password'
                />
                <TouchableOpacity
                    style={styles.buttonView}
                >
                    <Text style={styles.textButton}>
                        Login
                    </Text>
                </TouchableOpacity>
                {/* <View style={styles.signupView}>
                        <Text style={{fontSize:scale(18), alignItems:'center', color:'#000000'}}>
                            New User? 
                        </Text>
                        <TouchableOpacity
                        onPress={OnPressSignUp}>
                            <Text style={{fontSize:scale(18), alignItems:'center', color:'#0080FF', marginLeft:scale(10)}}>
                             Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                    
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0080FF'
    },
    welcomeText: {
        color: '#FFFFFF',
        fontSize: scale(35)
    },
    welcomeView: {
        marginTop: scale(40),
        alignItems: 'center',
        marginBottom: scale(50)
    },
    containerBody: {
        backgroundColor: '#D5DADA',
        height: '100%',
        borderTopRightRadius: scale(40),
        borderTopLeftRadius: scale(40),
    },
    image: {
        height: scale(85),
        width: scale(85)
    },
    imageView: {
        marginTop: scale(50),
        alignItems: 'center',
        marginBottom:scale(30)
    },
    UsernameInput: {
        height: scale(40),
        width: '80%',
        borderWidth: scale(2),
        borderColor: '#555',
        backgroundColor: '#89CFF0',
        alignSelf: 'center',
        margin: scale(10),
        borderRadius: scale(12),
        textAlign: 'center',
        fontSize: scale(16),
        color: '#000000',
    },
    buttonView: {
        margin: scale(30),
        backgroundColor: '#0080FF',
        height: scale(40),
        width: scale(70),
        borderRadius: scale(12),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    textButton: {
        fontSize: scale(14),
        color: '#FFFFFF',
    },
    signupView:{
        alignSelf:'center',
        margin:scale(40)
    }
})