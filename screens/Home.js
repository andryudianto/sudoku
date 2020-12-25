import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Image, Button, BackHandler, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Home() {
    const navigation = useNavigation()
    const [username, setUsername] = useState('Player')
    const [level, setLevel] = useState('easy')
    
    return(
        <View style={style.container}>
            <Image 
                source={require('../assets/logo.png')}
                style={style.logo}
            />
            <View style={style.contain}>
                <Text>Enter Username</Text>
                <TextInput 
                    style={{ borderBottomWidth: 1 }} 
                    value={username} 
                    onChangeText={text => setUsername(text)}
                />
            </View>

            <View style={{borderWidth: 5, borderColor: "#005500"}}>
                <Text> {level} </Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10}}>
                <Pressable
                    onPress={() => setLevel('easy')}
                >
                    <Text> EASY </Text>
                </Pressable>
                <Pressable
                    onPress={() => setLevel('medium')}
                >
                    <Text> MEDIUM </Text>
                </Pressable>
                <Pressable
                    onPress={() => setLevel('hard')}
                >
                    <Text> HARD </Text>
                </Pressable>
            </View>

            <View style={{margin: 20}}>
                <Button 
                    title="Play Now"
                    color="#005500"
                    onPress={() => navigation.navigate("Game", {
                        level,
                        username
                    })}
                />
            </View>
        
            <Button 
                title="Exit"
                color="#505500"
                onPress={() => BackHandler.exitApp()}
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    logo: {
        width: 120, 
        height: 120, 
        marginTop: 130, 
        marginBottom: 50
    },
    contain: {
        marginBottom: 20,
    }
})