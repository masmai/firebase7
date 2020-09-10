
import React, { Component, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2'
import database from '@react-native-firebase/database';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP } from 'react-native-responsive-screen';
// import CustomTabScreen from './CustomTabScreen'
function AddTodoScreen({ navigation }) {
    const myRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [selectedval, setSelectedval] = useState('ไม่ระบุ');
    const [selectedval2, setSelectedval2] = useState('ไม่ระบุ');
    const [selectedval3, setSelectedval3] = useState('ไม่ระบุ');
    const [selectedval4, setSelectedval4] = useState('ไม่ระบุ');
    const [selectedval5, setSelectedval5] = useState('ไม่ระบุ');
    const [selectedval6, setSelectedval6] = useState('ไม่ระบุ');
    const [ipds, setIpds] = useState([
        { "id": "1", "name": "15E" },
        { "id": "2", "name": "14E" },
        { "id": "3", "name": "12E" },
        { "id": "4", "name": "NS(12E)" },
        { "id": "5", "name": "11E" },
        { "id": "6", "name": "10E" },
        { "id": "7", "name": "9E" },
        { "id": "8", "name": "8E" },
        { "id": "9", "name": "7E" },
        { "id": "10", "name": "ICU MED (6E)" },
        { "id": "11", "name": "CCU (6E)" },
        { "id": "12", "name": "Cath Lab (6E)" },
        { "id": "13", "name": "PICU (3A)" },
        { "id": "14", "name": "ICU (2A)" },
        { "id": "15", "name": "NICU (2A)" },
        { "id": "16", "name": "LR (2A)" },
        { "id": "17", "name": "16E" },
        { "id": "18", "name": "OR (2A)" }

    ]);
    let data = [
        { "value": "ไม่ระบุ" },
        { "value": "15E" },
        { "value": "14E" },
        { "value": "12E" },
        { "value": "NS(12E)" },
        { "value": "11E" },
        { "value": "10E" },
        { "value": "9E" },
        { "value": "8E" },
        { "value": "7E" },
        { "value": "ICU MED (6E)" },
        { "value": "CCU (6E)" },
        { "value": "Cath Lab (6E)" },
        { "value": "PICU (3A)" },
        { "value": "ICU (2A)" },
        { "value": "NICU (2A)" },
        { "value": "LR (2A)" },
        { "value": "16E" },
        { "value": "OR (2A)" }];
    let data2 = [
        { "value": "ไม่ระบุ" },
        { "value": "ศูนย์สมอง(E2)" },
        { "value": "OPD MED (E3)" },
        { "value": "OPD Oncology (E3)" },
        { "value": "OPD DM (E3)" },
        { "value": "ศูนย์หัวใจ (E4)" },
        { "value": "OPD URO (E4)" },
        { "value": "Health promotion (E5)" },
        { "value": "OPD SUR (A1)" },
        { "value": "OPD Ortho (A1)" },
        { "value": "OPD PED (B1)" },
        { "value": "ศูนย์สุขภาพสตรี (B2)" },
        { "value": "OPD GI (A3)" },
        { "value": "OPD EYE (B3)" },
        { "value": "OPD ENT (A4)" },
        { "value": "ศูนย์ความงาม (D1)" },
        { "value": "ER (A1)" },
        { "value": "Ambulance (A1)" },
        { "value": "ไตเทียม" },
        { "value": "Super Sight Unit (B2)" },
        { "value": "Wound care (A1)" }]
    let data3 = [
        { "value": "ไม่ระบุ" },
        { "value": "Cutomer service(E1)" },
        { "value": "Inter sevice (E2)" },
        { "value": "Cashier (4E)" },
        { "value": "ประกัน (Cahier)" },
        { "value": "ประกัน (UR)" },
        { "value": "Pharmacy (A1)" },
        { "value": "กายภาพ(A3)" },
        { "value": "X-RAY(A1)" },
        { "value": "Admission(A1)" },
        { "value": "Admission(E3)" },
        { "value": "ห้อง Pool (7A)" },
        { "value": "แผนกวิศวกรรมบริหาร" },
        { "value": "แผนกจัดซื้อ(C1)" },
        { "value": "แผนกเครื่องมือแพทย์" },
        { "value": "แผนกซักรีด" },
        { "value": "แผนกเวชภณฑ์ปลอดเชื้อ" },
        { "value": "แผนกเวชภณฑ์ซัพพลาย" },
        { "value": "แผนกคลังยา" },
        { "value": "แผนกตรวจวิเคราะห์ (LAB)" },
        { "value": "Admission(B1)" },
        { "value": "แผนกยานพาหนะ" },
        { "value": "Information Technology (EM)" },
        { "value": "Pharmacy (E6)" },
        { "value": "ห้องอาหาร/SNSS" },
        { "value": "แผนก Supervisor" },
        { "value": "ทะเบียนใต้ดิน(ห้องเก็บประวัติ)อาคาร A" },
        { "value": "Human Resource Development" },
        { "value": "Human Resource Management" },
        { "value": "Quality Center" }]
    useEffect(() => {
        setLoading(false);
    }, [])

    function Add() {

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
    const onDDChange = (text) => {
        setSelectedval(text)
    }
    const onDDChange2 = (text) => {
        setSelectedval2(text)
    }
    const onDDChange3 = (text) => {
        setSelectedval3(text)
    }
    const onDDChange4 = (text) => {
        setSelectedval4(text)
    }
    const onDDChange5 = (text) => {
        setSelectedval5(text)
    }
    const onDDChange6 = (text) => {
        setSelectedval6(text)
    }
    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                {!loading ?
                    (

                        <View>
                            <Collapse style={{marginTop:heightPercentageToDP(2)}}>
                                <CollapseHeader>
                                    <View style={{ backgroundColor: 'pink', height: heightPercentageToDP(5),borderColor:'red',borderWidth:1 }}>
                                        <Text style={{marginHorizontal:10}}>หน่วยงานต้นทาง</Text>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    <Dropdown
                                        ref={myRef}
                                        label='กลุ่ม IPD'
                                        data={data}
                                        useNativeDriver={true}
                                        value={selectedval}
                                        onChangeText={onDDChange}
                                    />
                                    <Dropdown
                                        ref={myRef}
                                        label='กลุ่ม OPD'
                                        data={data2}
                                        useNativeDriver={true}
                                        value={selectedval2}
                                        onChangeText={onDDChange2}
                                    />
                                    <Dropdown
                                        ref={myRef}
                                        label='กลุ่ม อื่นๆ'
                                        data={data3}
                                        useNativeDriver={true}
                                        value={selectedval3}
                                        onChangeText={onDDChange3}
                                    />
                                </CollapseBody>
                            </Collapse>
                            <Collapse style={{marginTop:heightPercentageToDP(2)}}>
                                <CollapseHeader>
                                    <View style={{ backgroundColor: 'pink', height: heightPercentageToDP(5),borderColor:'red',borderWidth:1 }}>
                                    <Text style={{marginHorizontal:10}}>หน่วยงานปลายทาง</Text>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    <Dropdown
                                        ref={myRef}
                                        label='กลุ่ม IPD'
                                        data={data}
                                        useNativeDriver={true}
                                        value={selectedval4}
                                        onChangeText={onDDChange4}
                                    />
                                    <Dropdown
                                        ref={myRef}
                                        label='กลุ่ม OPD'
                                        data={data2}
                                        useNativeDriver={true}
                                        value={selectedval5}
                                        onChangeText={onDDChange5}
                                    />
                                    <Dropdown
                                        ref={myRef}
                                        label='กลุ่ม อื่นๆ'
                                        data={data3}
                                        useNativeDriver={true}
                                        value={selectedval6}
                                        onChangeText={onDDChange6}
                                    />
                                </CollapseBody>
                            </Collapse>


                            <Collapse style={{marginTop:heightPercentageToDP(2)}}>
                                <CollapseHeader>
                                    <View>
                                        <Text style={{marginHorizontal:10}}>เอกสาร</Text>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    {ipds && ipds.map((item, i) => {
                                        return (<View><Text style={{marginHorizontal:10}}>{item.name}</Text></View>)
                                    })

                                    }
                                </CollapseBody>
                            </Collapse>
                            <Collapse style={{marginTop:heightPercentageToDP(2)}}>
                                <CollapseHeader>
                                    <View>
                                        <Text style={{marginHorizontal:10}}>ยา</Text>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    {ipds && ipds.map((item, i) => {
                                        return (<View><Text style={{marginHorizontal:10}}>{item.name}</Text></View>)
                                    })

                                    }
                                </CollapseBody>
                            </Collapse>
                            <Collapse style={{marginTop:heightPercentageToDP(2)}}>
                                <CollapseHeader>
                                    <View>
                                        <Text style={{marginHorizontal:10}}>Lab</Text>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    {ipds && ipds.map((item, i) => {
                                        return (<View><Text style={{marginHorizontal:10}}>{item.name}</Text></View>)
                                    })

                                    }
                                </CollapseBody>
                            </Collapse>
                            <Collapse style={{marginTop:heightPercentageToDP(2)}}>
                                <CollapseHeader>
                                    <View>
                                        <Text style={{marginHorizontal:10}}>Supply</Text>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    {ipds && ipds.map((item, i) => {
                                        return (<View><Text style={{marginHorizontal:10}}>{item.name}</Text></View>)
                                    })

                                    }
                                </CollapseBody>
                            </Collapse>
                            <Collapse style={{marginTop:heightPercentageToDP(2)}}>
                                <CollapseHeader>
                                    <View>
                                        <Text style={{marginHorizontal:10}}>เครื่องมือแพทย์</Text>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    {ipds && ipds.map((item, i) => {
                                        return (<View><Text style={{marginHorizontal:10}}>{item.name}</Text></View>)
                                    })

                                    }
                                </CollapseBody>
                            </Collapse>
                        </View>)
                    : (<View><ActivityIndicator></ActivityIndicator></View>)
                }
            </View>
        </ScrollView>

    );
}
export { AddTodoScreen };