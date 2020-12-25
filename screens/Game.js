import React, { useEffect, useState } from 'react'
import { View, Text, Button, TextInput, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_BOARD, VALIDATE, SOLVE } from '../store/actions'

export default function Game() {
    const route = useRoute()
    const { level, username } = route.params
    const navigation = useNavigation()
    const [boardDuplicate, setBoardDuplicate] = useState([])
    const dispatch = useDispatch()
    const { board, loading, status } = useSelector((state) => state)
    
    if (status === 'solved') {
        navigation.replace("Finish", {username})
    }

    useEffect(() => {
        dispatch(FETCH_BOARD(level))
    },  [])

    useEffect(() => {
        setBoardDuplicate(board)
    }, [board])

    function onChangeText(text, indexRow, indexCol) {
        const cloneBoard = JSON.parse(JSON.stringify(boardDuplicate))
        cloneBoard[indexRow][indexCol] = Number(text)
        setBoardDuplicate(cloneBoard)
    }

    function validateBoard () {
        dispatch(VALIDATE(boardDuplicate))
    }

    function solveBoard() {
        dispatch(SOLVE(boardDuplicate))
    }

    return (
        <View>
            <Text style={style.title}> {username} </Text>
            <Text style={{fontSize: 15, textAlign: 'center'}} > {status} </Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {loading ? <ActivityIndicator size="large" color="#00ff00" /> :  boardDuplicate.map((row, indexRow) => {
                    return(
                        <View key={indexRow} style={{flexDirection: "row"}}>
                            {row.map((col, indexCol) => (
                                <View style={style.col}>
                                    <TextInput
                                    value={`${col}`} 
                                    style={style.col}  
                                    editable={board[indexRow][indexCol] === 0 ? true : false} 
                                    onChangeText={(text) => onChangeText(text, indexRow, indexCol)}
                                    />
                                </View>
                            ))}
                        </View>
                    )
                })}
            </View>
            <View style={{marginTop: 25}}>
                <Button color="#005500" disabled={loading} title="VALIDATE"  onPress={() => validateBoard()} />
            </View>
            <View style={{marginTop: 25}}>
                <Button color="#005500" disabled={loading} title="SOLVE"  onPress={() => solveBoard()} />
            </View>
        </View>
    )
}

const windowWidth = Dimensions.get("window").width;

const style = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    col: {
        width: windowWidth / 10,
        height: windowWidth / 10,
        justifyContent: 'center',
        textAlign: 'center',
        borderWidth: 1
    },
    title: {
        fontSize: 45,
        marginBottom: 7,
        marginTop: 10,
        textAlign: 'center'
    }
})

