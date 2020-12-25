import React, {useEffect} from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { SET_STATUS_VALIDATE } from '../store/actions'

export default function Finish() {
    const route = useRoute()
    const { level, username } = route.params
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(SET_STATUS_VALIDATE('unsolved'))
    },[])

    return (
        <View style={style.container}>
            <Text style={style.title}>Well done...</Text>
            <Text style={style.title}> {username} </Text>
            
            <View style={{marginTop: 10, marginBottom: 20}}>
                <Button color="#005500"  title="Play Again" onPress={() => navigation.navigate("Game", {username}) } />
            </View>

            <View>
                <Button color="#005500"  title="Go Home"  onPress={() => navigation.navigate("Home", {
                username
            })} />
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    title: {
        fontSize:30,
        marginBottom: 10,
        marginTop: 100,
        textAlign: 'center',
    },
    container: {
        justifyContent: "center"
    }
})