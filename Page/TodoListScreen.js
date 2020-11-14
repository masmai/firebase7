
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Button, Alert } from 'react-native';
import { todoRepo } from '../app/Database/TodoRepo';
import database from '@react-native-firebase/database';
// import { ListItem, Avatar, Header } from 'react-native-elements'
import { List, Colors, Divider, FAB, Portal, Provider, IconButton, Card, Avatar, Title, Modal } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import CustomTabScreen from './CustomTabScreen'
function TodoListScreen({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [expanded4, setExpanded4] = useState(false);
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;
    const handlePress = () => setExpanded(!expanded);
    const handlePress2 = () => setExpanded2(!expanded2);
    const handlePress3 = () => setExpanded3(!expanded3);
    const handlePress4 = () => setExpanded4(!expanded4);
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);

    const hideModal = () => setVisible(false);
    useEffect(() => {
        getList()
        return getList;
    }, [])
    const list = [
        {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        }
    ]
    function getList() {

        database().ref('todos').on('value', (snapshot) => {

            const todos = [];
            snapshot.forEach((todo, i) => {
                //var key = Object.keys(todo.val())[i];
                if (todo.toJSON() != "null") {


                    //console.warn("i: ",i,"key ",key,'val :', todo.toJSON())
                    var obj = todo.toJSON();
                    obj['id'] = todo.key;
                    todos.push(obj)
                }

            })
            setTodos(todos, todos);
            setLoading(false);
        })
    }
    const confirmDelete = (item) =>
        Alert.alert(
            "ต้องการยกเลิกคำขอบริการ",
            item.name,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteData(item) }
            ],
            { cancelable: false }
        );

    const restoreDelete = (item) =>
        Alert.alert(
            "ต้องการคืนสภาพคำขอบริการ",
            item.name,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => restoreData(item) }
            ],
            { cancelable: false }
        );
    const deleteData = (item) => {
        database().ref('todos/' + item.id).update({ isCancel: true }).then((data) => {
            //success callback
            console.log('data ', data)
        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })
    }
    const restoreData = (item) => {
        database().ref('todos/' + item.id).update({ isCancel: false, isComplete: false }).then((data) => {
            //success callback
            console.log('data ', data)
        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })
    }

    const theme0 = {
        // Specify custom property in nested object
        colors: {
            primary: Colors.blue900,
            background: 'red',
            surface: 'red',
            accent: 'red',
            error: 'red',
            text: Colors.black,
            onSurface: 'red',
            onBackground: 'red',
            disabled: 'red',
            placeholder: 'red',
            backdrop: 'red',
            notification: 'red',
        }
    };
    // const theme = {
    //     // Specify custom property in nested object
    //     colors: {
    //         primary: Colors.red900,
    //         //background: 'red',
    //         //surface: 'red',
    //         //accent: 'red',
    //         //error: 'red',
    //         text: Colors.red900,
    //         onSurface: 'red',
    //         onBackground: 'red',
    //         disabled: 'red',
    //         placeholder: 'red',
    //         backdrop: 'red',
    //         notification: 'red',
    //     }
    // };
    const theme = {
        // Specify custom property in nested object
        colors: {
            primary: Colors.black,
            background: Colors.black,
            surface: Colors.black,
            accent: Colors.black,
            //error: 'red',
            text: Colors.black,
            onSurface: Colors.black,
            onBackground: Colors.black,
            disabled: Colors.black,
            placeholder: Colors.black,
            backdrop: Colors.black,
            notification: 'red',
        }
    };
    const theme2 = {
        // Specify custom property in nested object
        colors: {
            primary: Colors.yellow900,
            //background: 'red',
            //surface: 'red',
            //accent: 'red',
            //error: 'red',
            text: Colors.yellow900,
            onSurface: 'red',
            onBackground: 'red',
            disabled: 'red',
            placeholder: 'red',
            backdrop: 'red',
            notification: 'red',
        }
    };

    const renderListItem = (item) => {

        return (<TouchableOpacity style={{
            flex: 1, flexDirection: 'row',
            backgroundColor: '#A7FFEB', height: 50, alignItems: 'center', borderWidth: 0.5, borderColor: 'grey', borderRadius: 5
            , marginHorizontal: 10, marginVertical: 5
        }}
            onPress={() => {

                navigation.navigate('taskDetail', { 'item': item });
            }}
        >
            <View style={{
                flex: 3
            }}>
                <Text style={{ textAlignVertical: 'center' }}>{item.name}</Text>
            </View>
            <View style={{
                flex: 1
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: 'pink', height: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: 'grey', borderRadius: 5
                    , marginHorizontal: 5, marginVertical: 5
                }}
                    onPress={() => { confirmDelete(item) }}
                >
                    <Ionicons name={'trash'} size={24} color={'red'} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>);
    }

    const renderListProgressItem = (item) => {

        return (<TouchableOpacity style={{
            flex: 1, flexDirection: 'row',
            backgroundColor: '#F4FF81', height: 50, alignItems: 'center', borderWidth: 0.5, borderColor: 'grey', borderRadius: 5
            , marginHorizontal: 10, marginVertical: 5
        }}
            onPress={() => {

                navigation.navigate('taskDetail', { 'item': item });
            }}
        >
            <View style={{
                flex: 3
            }}>
                <Text style={{ textAlignVertical: 'center' }}>{item.name}</Text>
            </View>
            <View style={{
                flex: 1
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: 'pink', height: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: 'grey', borderRadius: 5
                    , marginHorizontal: 5, marginVertical: 5
                }}
                    onPress={() => { confirmDelete(item) }}
                >
                    <Ionicons name={'trash'} size={24} color={'red'} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>);
    }
    const renderListCompleteItem = (item) => {

        return (<TouchableOpacity style={{
            flex: 1, flexDirection: 'row',
            backgroundColor: 'gray', height: 50, alignItems: 'center', borderWidth: 1, borderColor: 'black', borderRadius: 5
            , marginHorizontal: 10, marginVertical: 5
        }}
            onPress={() => {

                navigation.navigate('taskDetail', { 'item': item });
            }}
        >
            <View style={{
                flex: 3
            }}>
                <Text style={{ textAlignVertical: 'center' }}>{item.name}</Text>
            </View>
            <View style={{
                flex: 1
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: '#388E3C', height: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: 'grey', borderRadius: 5
                    , marginHorizontal: 5, marginVertical: 5
                }}
                    onPress={() => { restoreData(item) }}
                >
                    <Ionicons name={'arrow-redo-outline'} size={24} color={'white'} />
                </TouchableOpacity>
            </View>

        </TouchableOpacity>);
    }
    const renderListCancelItem = (item) => {

        return (<TouchableOpacity style={{
            flex: 1, flexDirection: 'row',
            backgroundColor: '#FF3D00', height: 50, alignItems: 'center', borderWidth: 0.5, borderColor: 'white', borderRadius: 5
            , marginHorizontal: 10, marginVertical: 5
        }}
            onPress={() => {

                navigation.navigate('taskDetail', { 'item': item });
            }}
        >
            <View style={{
                flex: 3
            }}>
                <Text style={{ textAlignVertical: 'center', color: 'white' }}>{item.name}</Text>
            </View>
            <View style={{
                flex: 1
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: '#388E3C', height: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: 'grey', borderRadius: 5
                    , marginHorizontal: 5, marginVertical: 5
                }}
                    onPress={() => { restoreDelete(item) }}
                >
                    <Ionicons name={'arrow-redo-outline'} size={24} color={'white'} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>);
    }

    return (

        <View style={{ flex: 1 }}>



            <ScrollView style={{ flex: 1 }}>

                {!loading ?
                    (<View style={{ flex: 1, marginHorizontal: 10 }}>

                        <View style={{ alignItems: 'flex-end' }}>
                            <IconButton
                                icon="plus"
                                color={'grey'}
                                size={40}
                                onPress={() => navigation.navigate('AddTodo2')}
                                style={{ backgroundColor: '#35d0ba' }}
                            />
                        </View>
                        <View style={{ backgroundColor: 'white', marginVertical: 10 }}>
                            <List.Subheader
                                style={{ backgroundColor: '#35d0ba' }}
                                theme={{ colors: { text: 'white' } }}

                            ><Title style={{ color: 'white' }}>รายการคำขอบริการ</Title></List.Subheader>
                            <List.Accordion
                                theme={theme}
                                title="ใหม่"
                                left={(props) => <List.Icon {...props} icon="folder" />}>
                                {todos && todos.map((item, i) => {
                                    if (!item.workedBy && !item.isCancel && !item.isComplete)
                                        return (renderListItem(item))
                                })
                                }
                                {/* <List.Item title="First item" theme={theme} />
                                <List.Item title="Second item" theme={theme} /> */}
                            </List.Accordion>
                            <Divider></Divider>
                            <List.Accordion
                                theme={theme}
                                title="กำลังดำเนินการ"
                                left={props => <List.Icon {...props} icon="folder" />}
                                expanded={expanded2}
                                onPress={handlePress2}>

                                {todos && todos.map((item, i) => {
                                    if (item.workedBy && !item.isComplete && !item.isCancel)
                                        return (renderListProgressItem(item))
                                })

                                }
                            </List.Accordion>
                            <Divider></Divider>
                            <List.Accordion
                                theme={theme}
                                title="ดำเนินการเสร็จแล้ว"
                                left={props => <List.Icon {...props} icon="folder" />}
                                expanded={expanded3}
                                onPress={handlePress3}>

                                {todos && todos.map((item, i) => {
                                    if (item.isComplete && !item.isCancel)
                                        return (renderListCompleteItem(item))



                                })

                                }
                            </List.Accordion>
                            <Divider></Divider>
                            <List.Accordion
                                theme={theme}
                                title="ถูกยกเลิก"
                                left={props => <List.Icon {...props} icon="folder" />}
                                expanded={expanded4}
                                onPress={handlePress4}>
                                {todos && todos.map((item, i) => {
                                    if (item.isCancel)
                                        return (renderListCancelItem(item))



                                })

                                }
                            </List.Accordion>
                        </View>
                        {/* </List.Section> */}
                        {/* <View style={{flex:1,height:80}}></View> */}
                    </View>)
                    : (<View><ActivityIndicator></ActivityIndicator></View>)
                }
                {/* <Provider>
                    <Portal>
                        <FAB.Group

                            open={open}
                            icon={open ? 'calendar-today' : 'plus'}
                            actions={[
                                { icon: 'plus', onPress: () => console.log('Pressed add') },
                                {
                                    icon: 'star',
                                    label: 'Star',
                                    onPress: () => console.log('Pressed star'),
                                },
                                {
                                    icon: 'email',
                                    label: 'Email',
                                    onPress: () => console.log('Pressed email'),
                                },
                                {
                                    icon: 'bell',
                                    label: 'Remind',
                                    onPress: () => console.log('Pressed notifications'),
                                },
                            ]}
                            onStateChange={onStateChange}
                            onPress={() => {
                                if (open) {
                                    // do something if the speed dial is open
                                }
                            }}
                        />
                    </Portal>
                </Provider> */}

            </ScrollView>

        </View>

    );
}
export { TodoListScreen };