
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { todoRepo } from '../app/Database/TodoRepo';
import database from '@react-native-firebase/database';

// import CustomTabScreen from './CustomTabScreen'
function TodoListScreen({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        getList()
        return getList;
    }, [])

    function getList() {

        database().ref('todos').on('value', (snapshot) => {
            const todos = [];
            snapshot.forEach((todo) => {
                if (todo.toJSON() != "null") {
                    console.warn("todo.toJSON()", todo.toJSON())
                    todos.push(todo.toJSON())
                }

            })

            setTodos(todos, todos);
            setLoading(false);
        })
    }
    return (
        <View style={{ flex: 1 }}>
            {!loading ?
                (<View style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                        <Button
                            title="เพิ่มคำขอ"
                            onPress={() => navigation.navigate('AddTodo2')}
                        />
                    </View>
                    <View style={{ flex: 11, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text>Todolist </Text>
                        {todos && todos.map((item, i) => {
                            return (<View><Text>{item.name}</Text></View>)
                        })

                        }
                    </View>
                </View>)
                : (<View><ActivityIndicator></ActivityIndicator></View>)
            }
        </View>

    );
}
export { TodoListScreen };