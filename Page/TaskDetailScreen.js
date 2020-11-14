import React, { Component, useState, useEffect, useRef } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2'
import { Banner, Avatar, Button, Card, Title, Paragraph, Subheading, Caption, Divider, Provider, Colors } from 'react-native-paper';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import ScannerScreen from './ScannerScreen';
// import CustomTabScreen from './CustomTabScreen'
function TaskDetailScreen({ navigation, route }) {
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    const [visible, setVisible] = React.useState(true);
    const { item } = route.params;
    const [selectedval, setSelectedval] = useState('ไม่ระบุ');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [datas, setDatas] = useState([]);
    const onDDChange = (text) => {
        setSelectedval(text)
    }
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
    useEffect(() => {
        getUserList()
        return getUserList;
    }, [])
    function getUserList() {
        var userf = auth().currentUser;
        database().ref('users').on('value', (snapshot) => {

            const users = [];
            snapshot.forEach((item, i) => {
                //var key = Object.keys(todo.val())[i];
                if (item.toJSON() != "null") {


                    console.warn(item.toJSON().email)
                    var obj = item.toJSON();
                    obj['id'] = item.key;
                    users.push(obj)
                }

            })
            console.warn("userf.uid", userf.uid);
            var filter = users.filter((x) => { return x.uid != userf.uid })
            console.warn("filterd", filter)
            setUsers(users, filter);
            var datas = []
            filter.map((x) => {
                var o = { value: x.email }
                datas.push(o);
            })
            setDatas(datas, datas);
            setLoading(false);
        })


    }
    
    const saveData = () => {
        console.warn(item.id)
        database().ref('todos/' + item.id).update({ workedBy: selectedval }).then((data) => {
            //success callback
            console.log('data ', data)
            //navigation.navigate({ key: SCREEN_KEY_A });
            navigation.popToTop()
        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })
    }

    return (
        // <View style={{ flex: 1 }}>
        //     <Banner
        //     visible={visible}
        //     actions={[
        //         {
        //             label: 'Fix it',
        //             onPress: () => setVisible(false),
        //         },
        //         {
        //             label: 'Learn more',
        //             onPress: () => setVisible(false),
        //         },
        //     ]}
        //     icon={({ size }) => (
        //         <Image
        //             source={{
        //                 uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
        //             }}
        //             style={{
        //                 width: size,
        //                 height: size,
        //             }}
        //         />
        //     )}>
        //     There was a problem processing a transaction on your credit card.

        // </Banner> 
        //     <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10, marginHorizontal: 10 }}>
        //         <Text>{route.params.item.name}</Text>

        //     </View> </View>
        !loading ?
            <ScrollView>
                <Card theme={theme}>
                    <Card.Title title={route.params.item.name} subtitle={

                        route.params.item.fromDept + '  ----->  ' + route.params.item.toDept

                    } left={LeftContent}
                    />
                    <Card.Content style={{ marginLeft: 50 }}>

                        <Title>งานที่ต้องเตรียม</Title>
                        <View style={{ marginLeft: 20, marginBottom: 10 }}>
                            <View style={{ marginTop: 5 }}>
                                <Text>เอกสาร :</Text>
                                {
                                    item.docs ? <View style={{ marginLeft: 20 }}>
                                        {item.docs.map((x, i) => {
                                            if (i == item.docs.length - 1)
                                                return (<Text>{x.name}:{x.amt}</Text>)
                                            else
                                                return (<Text>{x.name}:{x.amt},</Text>)

                                        })}
                                    </View> : <View><Text> - </Text></View>

                                }
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <Text>ยา :</Text>
                                {
                                    item.drugs ? <View style={{ marginLeft: 20 }}>
                                        {item.drugs.map((x, i) => {
                                            if (i == item.drugs.length - 1)
                                                return (<Text>{x.name}:{x.amt}</Text>)
                                            else
                                                return (<Text>{x.name}:{x.amt},</Text>)

                                        })}
                                    </View> : <View><Text> - </Text></View>

                                }
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <Text>Lab :</Text>
                                {
                                    item.labs ? <View style={{ marginLeft: 20 }}>
                                        {item.labs.map((x, i) => {
                                            if (i == item.labs.length - 1)
                                                return (<Text>{x.name}:{x.amt}</Text>)
                                            else
                                                return (<Text>{x.name}:{x.amt},</Text>)

                                        })}
                                    </View> : <View><Text> - </Text></View>

                                }
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <Text>Supply :</Text>
                                {
                                    item.supplys ? <View style={{ marginLeft: 20 }}>
                                        {item.supplys.map((x, i) => {
                                            if (i == item.supplys.length - 1)
                                                return (<Text>{x.name}:{x.amt}</Text>)
                                            else
                                                return (<Text>{x.name}:{x.amt},</Text>)

                                        })}
                                    </View> : <View><Text> - </Text></View>

                                }
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <Text>เครื่องมือแพทย์ :</Text>
                                {
                                    item.tools ? <View style={{ marginLeft: 20 }}>
                                        {item.tools.map((x, i) => {
                                            if (i == item.tools.length - 1)
                                                return (<Text>{x.name}:{x.amt}</Text>)
                                            else
                                                return (<Text>{x.name}:{x.amt},</Text>)

                                        })}
                                    </View> : <View><Text> - </Text></View>

                                }
                            </View>
                        </View>
                        <Divider></Divider>
                        {item.workedBy ?
                            <View>
                                <Title>ผู้รับผิดชอบงาน</Title>
                                <View style={{ marginLeft: 20 }}>
                                    <Text>{item.workedBy}</Text>
                                </View>
                            </View>
                            :
                            <View>
                                <Title>เลือกผู้รับผิดชอบงาน</Title>
                                <View style={{ marginLeft: 20 }}>


                                    {
                                        users && users.length > 0 ?
                                            <Dropdown
                                                label=''
                                                data={datas}
                                                //useNativeDriver={true}
                                                value={selectedval}
                                                onChangeText={onDDChange}
                                            />
                                            :
                                            <View></View>
                                    }


                                </View>
                            </View>
                        }

                        <Divider></Divider>


                    </Card.Content>
                    {!item.workedBy ?
                        <View>
                            <Card.Actions style={{ justifyContent: 'flex-end' }}>
                                <Button onPress={() => { }}>Cancel</Button>
                                <Button onPress={() => { saveData() }}>Ok</Button>
                            </Card.Actions>
                        </View>
                        :
                        <View>
                            <Card.Actions style={{ justifyContent: 'flex-end' }}>
                                <Button onPress={() => { navigation.popToTop() }}>Ok</Button>
                            </Card.Actions>
                        </View>}
                    {item.workedBy ?
                        <View>
                            <Card.Actions style={{ justifyContent: 'flex-end' }}>
                                <Button onPress={() => { navigation.navigate("ScannerScreen", { 'item': item }) }}>Close Task</Button>
                            </Card.Actions>
                        </View>
                        :
                        <View></View>
                    }
                </Card>
            </ScrollView> : <View></View>

    );

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text>{route.params.item.name}</Text>

        </View>

        // <CustomTabScreen navigation={navigation}/>

    );
}
export { TaskDetailScreen };