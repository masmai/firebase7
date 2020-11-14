
import React, { Component, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2'
import database from '@react-native-firebase/database';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
//import CheckBox from '@react-native-community/checkbox';
import { List, Colors, Divider, FAB, Portal, Provider, IconButton, Card, Avatar, Button, TextInput, Checkbox, Title } from 'react-native-paper';
// import CustomTabScreen from './CustomTabScreen'
function AddTodoScreen({ navigation }) {
    const myRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [fromDept, setFromDept] = useState(null);
    const [toDept, setToDept] = useState(null);
    const [selectedval, setSelectedval] = useState('ไม่ระบุ');
    const [selectedval2, setSelectedval2] = useState('ไม่ระบุ');
    const [selectedval3, setSelectedval3] = useState('ไม่ระบุ');
    const [selectedval4, setSelectedval4] = useState('ไม่ระบุ');
    const [selectedval5, setSelectedval5] = useState('ไม่ระบุ');
    const [selectedval6, setSelectedval6] = useState('ไม่ระบุ');
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [expanded4, setExpanded4] = useState(false);
    const [expanded5, setExpanded5] = useState(false);
    const [expanded6, setExpanded6] = useState(false);
    const [expanded7, setExpanded7] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [docs, setDocs] = useState([
        { name: "Chart", value: false, amt: 0 },
        { name: "ใบเคลม", value: false, amt: 0 },
        { name: "Chart", value: false, amt: 0 },
        { name: "ใบเคลม", value: false, amt: 0 },
        { name: "Chart", value: false, amt: 0 },
        { name: "ใบเคลม", value: false, amt: 0 },
        { name: "Chart", value: false, amt: 0 },
        { name: "ใบเคลม", value: false, amt: 0 },
        { name: "Chart", value: false, amt: 0 },
        { name: "ใบเคลม", value: false, amt: 0 },
        { name: "Chart", value: false, amt: 0 },
        { name: "ใบเคลม", value: false, amt: 0 },
        { name: "Chart", value: false, amt: 0 },
        { name: "ใบเคลม", value: false, amt: 0 },
        { name: "Chart", value: false, amt: 0 },
        { name: "ใบเคลม", value: false, amt: 0 },
    ]);

    const [drugs, setDrugs] = useState([
        { name: "Med Reconcil", value: false, amt: 0 },
        { name: "คืนยา", value: false, amt: 0 },
        { name: "ยา Homemed", value: false, amt: 0 },
        { name: "ยาแช่เย็น", value: false, amt: 0 },
        { name: "กล่องเคมีบำบัด", value: false, amt: 0 },
        { name: "นม", value: false, amt: 0 },
        { name: "คืนยาเสพติด", value: false, amt: 0 },

    ]);

    const [labs, setLabs] = useState([
        { name: "ส่ง LAB", value: false, amt: 0 },
        { name: "บรรจุภัณฑ์", value: false, amt: 0 },
        { name: "รับเลือด PRC", value: false, amt: 0 },
        { name: "รับเลือด LPRC", value: false, amt: 0 },
        { name: "รับเลือด LPPC", value: false, amt: 0 },
        { name: "รับเลือด FFP", value: false, amt: 0 },
        { name: "รับเลือด Cryoperecipitate", value: false, amt: 0 },
        { name: "รับเลือด SDR", value: false, amt: 0 },
        { name: "รับเลือดอื่นๆ", value: false, amt: 0 },

    ]);
    const [supplys, setSupplys] = useState([
        { name: "รับของ Supply ใต้ดิน", value: false, amt: 0 },
        { name: "แลก Supply Sterile", value: false, amt: 0 },
        { name: "รับของเบิกที่คลังยา/Supply", value: false, amt: 0 }

    ]);
    const [tools, setTools] = useState([
        { name: "เครื่อง Pneumatic pump(Venaflow)", value: false, amt: 0 },
        { name: "Alpha Bed", value: false, amt: 0 },
        { name: "เครื่อง B Braun infusion pump", value: false, amt: 0 },
        { name: "Syring Pump", value: false, amt: 0 },
        { name: "Gay Oxygen", value: false, amt: 0 },
        { name: "Gay Suction", value: false, amt: 0 },
        { name: "Set Skin Traction", value: false, amt: 0 },
        { name: "Feeding pump", value: false, amt: 0 },
        { name: "Bed Alarm", value: false, amt: 0 },

    ]);

    const [desc, setDesc] = useState('');


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

    const handlePress2 = () => setExpanded2(!expanded2);
    const handlePress3 = () => setExpanded3(!expanded3);
    const handlePress4 = () => setExpanded4(!expanded4);
    const handlePress5 = () => setExpanded5(!expanded5);
    const handlePress6 = () => setExpanded6(!expanded6);
    const handlePress7 = () => setExpanded7(!expanded7);
    // let docs = [

    //     "Chart", "ใบเคลม"
    // ]
    // let meds = ["Med Reconcil", "ยาแช่เย็น"]
    // let labs = ["ส่ง LAB", "รับเลือด LPRC"]
    // let supplys = ["รับของ Supply ใต้ดิน", ""]
    // let tools = ["Syling Pump", "Set Skin Traction"]
    useEffect(() => {
        setLoading(false);
    }, [])
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
            primary: '#35d0ba',
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
    function Add() {

        database()
            .ref(`/todos/00002`)
            .set({
                name: 'task4444',
                createdBy: 'me',
                workedBy: 'you',
                fromDept: 'ICU',
                toDept: 'RIP',
                docs: [{ name: 'sheet', amt: 5 }, { name: 'ใบเสร็จ', amt: 5 }],
                isComplete: true,
                isCancel: true
            }).then(() => console.log('Data set.'));
    }
    const onDDChange = (text) => {
        setSelectedval(text)
        setSelectedval2(null)
        setSelectedval3(null)
        setFromDept(text);
    }
    const onDDChange2 = (text) => {
        setSelectedval(null)
        setSelectedval2(text)
        setSelectedval3(null)
        setFromDept(text);
    }
    const onDDChange3 = (text) => {
        setSelectedval(null)
        setSelectedval2(null)
        setSelectedval3(text)
        setFromDept(text);
    }
    const onDDChange4 = (text) => {
        setSelectedval4(text)
        setSelectedval5(null);
        setSelectedval6(null);
        setToDept(text);
    }
    const onDDChange5 = (text) => {
        setSelectedval4(null)
        setSelectedval5(text);
        setSelectedval6(null);
        setToDept(text);
    }
    const onDDChange6 = (text) => {
        setSelectedval4(null)
        setSelectedval5(null);
        setSelectedval6(text);
        setToDept(text);
    }
    const updateFieldChanged = (i, item, newValue) => {

        console.warn('index: ' + i);
        console.warn('property name: ' + item);
        console.warn('newValue: ' + newValue);
        let newArr = [...docs]; // copying the old datas array
        newArr[i].value = newValue; // replace e.target.value with whatever you want to change it to

        setDocs(newArr); // ??
    }
    const updateAmtChanged = (i, item, newValue) => {

        console.warn('index: ' + i);
        console.warn('property name: ' + item);
        console.warn('newValue: ' + newValue);
        let newArr = [...docs]; // copying the old datas array
        newArr[i].amt = newValue; // replace e.target.value with whatever you want to change it to

        setDocs(newArr); // ??
    }

    const updateDrugChanged = (i, item, newValue) => {

        console.warn('index: ' + i);
        console.warn('property name: ' + item);
        console.warn('newValue: ' + newValue);
        let newArr = [...drugs]; // copying the old datas array
        newArr[i].value = newValue; // replace e.target.value with whatever you want to change it to

        setDrugs(newArr); // ??
    }
    const updateDrugAmtChanged = (i, item, newValue) => {

        console.warn('index: ' + i);
        console.warn('property name: ' + item);
        console.warn('newValue: ' + newValue);
        let newArr = [...drugs]; // copying the old datas array
        newArr[i].amt = newValue; // replace e.target.value with whatever you want to change it to

        setDrugs(newArr); // ??
    }
    const updateLabChanged = (i, item, newValue) => {

        console.warn('index: ' + i);
        console.warn('property name: ' + item);
        console.warn('newValue: ' + newValue);
        let newArr = [...labs]; // copying the old datas array
        newArr[i].value = newValue; // replace e.target.value with whatever you want to change it to

        setLabs(newArr); // ??
    }
    const updateLabAmtChanged = (i, item, newValue) => {

        console.warn('index: ' + i);
        console.warn('property name: ' + item);
        console.warn('newValue: ' + newValue);
        let newArr = [...labs]; // copying the old datas array
        newArr[i].amt = newValue; // replace e.target.value with whatever you want to change it to

        setLabs(newArr); // ??
    }
    const updateSupplyChanged = (i, item, newValue) => {

        console.warn('index: ' + i);
        console.warn('property name: ' + item);
        console.warn('newValue: ' + newValue);
        let newArr = [...supplys]; // copying the old datas array
        newArr[i].value = newValue; // replace e.target.value with whatever you want to change it to

        setSupplys(newArr); // ??
    }
    const updateSupplyAmtChanged = (i, item, newValue) => {

        console.warn('index: ' + i);
        console.warn('property name: ' + item);
        console.warn('newValue: ' + newValue);
        let newArr = [...supplys]; // copying the old datas array
        newArr[i].amt = newValue; // replace e.target.value with whatever you want to change it to

        setSupplys(newArr); // ??
    }
    const updateToolChanged = (i, item, newValue) => {

        console.warn('index: ' + i);
        console.warn('property name: ' + item);
        console.warn('newValue: ' + newValue);
        let newArr = [...tools]; // copying the old datas array
        newArr[i].value = newValue; // replace e.target.value with whatever you want to change it to

        setTools(newArr); // ??
    }
    const updateToolAmtChanged = (i, item, newValue) => {

        console.warn('index: ' + i);
        console.warn('property name: ' + item);
        console.warn('newValue: ' + newValue);
        let newArr = [...tools]; // copying the old datas array
        newArr[i].amt = newValue; // replace e.target.value with whatever you want to change it to

        setTools(newArr); // ??
    }

    const saveData = () => {
        var filterdocs = docs.filter((x) => { return x.value })
        var filterdrugs = drugs.filter((x) => { return x.value })
        var filterlabs = labs.filter((x) => { return x.value })
        var filtersupplys = supplys.filter((x) => { return x.value })
        var filtertools = tools.filter((x) => { return x.value })
        console.warn("docs: ", filterdocs, "drugs: ", filterdrugs, "labs: ", filterlabs, "supplys: ", filtersupplys, "tools: ", filtertools);

        var task = {

            name: desc,
            fromDept: fromDept,
            toDept: toDept,
            docs: filterdocs,
            drugs: filterdrugs,
            labs: filterlabs,
            supplys: filtersupplys,
            tools: filtertools,
            createdBy: "me",
            createDate: null,
            dueDate: null,
            workedBy: null,
            isComplete: false

        }
        console.warn(task)
        database().ref('todos/').push(task).then((data) => {
            //success callback
            console.log('data ', data)
            navigation.popToTop();
        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'flex-end' }}>
                <IconButton
                    icon="plus"
                    color={'grey'}
                    size={40}
                    onPress={() => Add()}
                    style={{ backgroundColor: '#35d0ba' }}
                />
            </View>
            <ScrollView>
                <View style={{ flex: 1 }}>
                    {!loading ?
                        (
                            <View>
                                <View style={{ flex: 5 }}>
                                    {/* <Collapse style={{ marginTop: heightPercentageToDP(2) }}>
                                        <CollapseHeader>
                                            <View style={{ backgroundColor: 'pink', height: heightPercentageToDP(5), borderColor: 'red', borderWidth: 1 }}>
                                                <Text style={{ marginHorizontal: 10 }}>หน่วยงานต้นทาง</Text>
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody>
                                            <Dropdown
                                                ref={myRef}
                                                label='กลุ่ม IPD'
                                                data={data}
                                                value={selectedval}
                                                onChangeText={onDDChange}
                                            />
                                            <Dropdown
                                                ref={myRef}
                                                label='กลุ่ม OPD'
                                                data={data2}
                                                value={selectedval2}
                                                onChangeText={onDDChange2}
                                            />
                                            <Dropdown
                                                ref={myRef}
                                                label='กลุ่ม อื่นๆ'
                                                data={data3}
                                                value={selectedval3}
                                                onChangeText={onDDChange3}
                                            />
                                        </CollapseBody>
                                    </Collapse>
                                    <Collapse style={{ marginTop: heightPercentageToDP(2) }}>
                                        <CollapseHeader>
                                            <View style={{ backgroundColor: 'pink', height: heightPercentageToDP(5), borderColor: 'red', borderWidth: 1 }}>
                                                <Text style={{ marginHorizontal: 10 }}>หน่วยงานปลายทาง</Text>
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody>
                                            <Dropdown
                                                ref={myRef}
                                                label='กลุ่ม IPD'
                                                data={data}
                                               
                                                value={selectedval4}
                                                onChangeText={onDDChange4}
                                            />
                                            <Dropdown
                                                ref={myRef}
                                                label='กลุ่ม OPD'
                                                data={data2}
                                                
                                                value={selectedval5}
                                                onChangeText={onDDChange5}
                                            />
                                            <Dropdown
                                                ref={myRef}
                                                label='กลุ่ม อื่นๆ'
                                                data={data3}
                                                
                                                value={selectedval6}
                                                onChangeText={onDDChange6}
                                            />
                                        </CollapseBody>
                                    </Collapse>


                                    <Collapse style={{ marginTop: heightPercentageToDP(2) }}>
                                        <CollapseHeader>
                                            <View>
                                                <Text style={{ marginHorizontal: 10 }}>เอกสาร</Text>
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody>
                                           
                                            <View>
                                                {docs.map((item, i) => {

                                                    return (<View>
                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                <Text>{i + 1}{item.name}</Text>
                                                                <CheckBox
                                                                    disabled={false}
                                                                    value={item.value}
                                                                    onValueChange={(newValue) => updateFieldChanged(i, item, newValue)}
                                                                />
                                                                <TextInput
                                                                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                                                    onChangeText={(newValue) => updateAmtChanged(i, item, newValue)}
                                                                    value={item.amt}
                                                                />
                                                            </View>
                                                            
                                                        </View>



                                                    </View>)

                                                })}
                                            </View>
                                        </CollapseBody>
                                    </Collapse>
                                    <Collapse style={{ marginTop: heightPercentageToDP(2) }}>
                                        <CollapseHeader>
                                            <View>
                                                <Text style={{ marginHorizontal: 10 }}>ยา</Text>
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody>
                                            {ipds && ipds.map((item, i) => {
                                                return (<View><Text style={{ marginHorizontal: 10 }}>{item.name}</Text></View>)
                                            })

                                            }
                                        </CollapseBody>
                                    </Collapse>
                                    <Collapse style={{ marginTop: heightPercentageToDP(2) }}>
                                        <CollapseHeader>
                                            <View>
                                                <Text style={{ marginHorizontal: 10 }}>Lab</Text>
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody>
                                            {ipds && ipds.map((item, i) => {
                                                return (<View><Text style={{ marginHorizontal: 10 }}>{item.name}</Text></View>)
                                            })

                                            }
                                        </CollapseBody>
                                    </Collapse>
                                    <Collapse style={{ marginTop: heightPercentageToDP(2) }}>
                                        <CollapseHeader>
                                            <View>
                                                <Text style={{ marginHorizontal: 10 }}>Supply</Text>
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody>
                                            {ipds && ipds.map((item, i) => {
                                                return (<View><Text style={{ marginHorizontal: 10 }}>{item.name}</Text></View>)
                                            })

                                            }
                                        </CollapseBody>
                                    </Collapse>
                                    <Collapse style={{ marginTop: heightPercentageToDP(2) }}>
                                        <CollapseHeader>
                                            <View>
                                                <Text style={{ marginHorizontal: 10 }}>เครื่องมือแพทย์</Text>
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody>
                                            {ipds && ipds.map((item, i) => {
                                                return (<View><Text style={{ marginHorizontal: 10 }}>{item.name}</Text></View>)
                                            })

                                            }
                                        </CollapseBody>
                                    </Collapse> */}


                                    <View style={{ backgroundColor: 'white', marginVertical: 10, marginHorizontal: 10 }}>
                                        <List.Subheader
                                            style={{ backgroundColor: '#35d0ba' }}
                                            theme={{ colors: { text: 'white' } }}

                                        ><Title style={{ color: 'white' }}>เพิ่มคำขอบริการ</Title></List.Subheader>

                                        <List.Accordion
                                            theme={theme}
                                            title={fromDept ? "ต้นทาง : " + fromDept : "ต้นทาง"}
                                            left={(props) => <List.Icon {...props} icon="arrow-bottom-right-bold-outline" />}>
                                            {/* <List.Item title="First item" theme={theme} />
                                            <List.Item title="Second item" theme={theme} /> */}
                                            <Divider></Divider>
                                            <View style={{ padding: 10, }}>
                                                <Dropdown
                                                    ref={myRef}
                                                    label='กลุ่ม IPD'
                                                    data={data}
                                                    //useNativeDriver={true}
                                                    value={selectedval}
                                                    onChangeText={onDDChange}
                                                />
                                                <Dropdown
                                                    ref={myRef}
                                                    label='กลุ่ม OPD'
                                                    data={data2}
                                                    //useNativeDriver={true}
                                                    value={selectedval2}
                                                    onChangeText={onDDChange2}
                                                />
                                                <Dropdown
                                                    ref={myRef}
                                                    label='กลุ่ม อื่นๆ'
                                                    data={data3}
                                                    //useNativeDriver={true}
                                                    value={selectedval3}
                                                    onChangeText={onDDChange3}
                                                />
                                            </View>
                                        </List.Accordion>

                                        <Divider></Divider>
                                        <List.Accordion
                                            theme={theme}
                                            title={toDept ? "ปลายทาง : " + toDept : "ปลายทาง"}
                                            left={props => <List.Icon {...props} icon="arrow-bottom-left-bold-outline" />}
                                            expanded={expanded2}
                                            onPress={handlePress2}>
                                            <Divider></Divider>
                                            <View style={{ padding: 10, }}>
                                                <Dropdown
                                                    ref={myRef}
                                                    label='กลุ่ม IPD'
                                                    data={data}
                                                    //useNativeDriver={true}
                                                    value={selectedval4}
                                                    onChangeText={onDDChange4}
                                                />
                                                <Dropdown
                                                    ref={myRef}
                                                    label='กลุ่ม OPD'
                                                    data={data2}
                                                    //useNativeDriver={true}
                                                    value={selectedval5}
                                                    onChangeText={onDDChange5}
                                                />
                                                <Dropdown
                                                    ref={myRef}
                                                    label='กลุ่ม อื่นๆ'
                                                    data={data3}
                                                    //useNativeDriver={true}
                                                    value={selectedval6}
                                                    onChangeText={onDDChange6}
                                                />
                                            </View>
                                        </List.Accordion>

                                        <Divider></Divider>
                                        <List.Accordion
                                            theme={theme}
                                            title={"เอกสาร"}
                                            left={props => <List.Icon {...props} icon="folder" />}
                                            expanded={expanded3}
                                            onPress={handlePress3}>
                                            <Divider></Divider>
                                            {docs.filter((y)=>{return y.value}).length>0?
                                            <View style={{ flex: 1, marginLeft: -40 }}>
                                                <Text>รายการที่เลือก</Text>
                                                <Text>
                                                {docs.filter((y)=>{return y.value}).map((x, i) => {
                                                    if (i == docs.filter((y)=>{return y.value}).length - 1)
                                                        return (<Text>{x.name} : {x.amt}  </Text>)
                                                    else
                                                        return (<Text>{x.name} : {x.amt} ,  </Text>)
                                                })}
                                            </Text>
                                            </View>:<View></View>
                                            }
                                            {docs.map((item, i) => {
                                                return (
                                                    <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20, marginVertical: 5, paddingBottom: 10, borderRadius: 10, borderWidth: 0.5 }}>

                                                        <View style={{ flex: 1, marginLeft: -40 }}>

                                                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                                                <Checkbox
                                                                    status={item.value ? 'checked' : 'unchecked'}
                                                                    style={{ flex: 3 }}
                                                                    onPress={() => {
                                                                        updateFieldChanged(i, item, !item.value)
                                                                    }}
                                                                />
                                                                <Text style={{ flex: 4, marginRight: 20, textAlignVertical: 'center' }}>{item.name}</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <TextInput
                                                                    disabled={item.value ? false : true}
                                                                    label="จำนวน"
                                                                    mode={'outlined'}
                                                                    style={{ flex: 1, marginRight: 20, height: 30 }}
                                                                    value={item.amt}
                                                                    onChangeText={(newValue) => updateAmtChanged(i, item, newValue)}
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>
                                                )

                                            })}
                                        </List.Accordion>

                                        <Divider></Divider>
                                        <List.Accordion
                                            theme={theme}
                                            title="ยา"
                                            left={props => <List.Icon {...props} icon="medical-bag" />}
                                            expanded={expanded4}
                                            onPress={handlePress4}>
                                            <Divider></Divider>
                                            {drugs.filter((y)=>{return y.value}).length>0?
                                            <View style={{ flex: 1, marginLeft: -40 }}>
                                                <Text>รายการที่เลือก</Text>
                                                <Text>
                                                {drugs.filter((y)=>{return y.value}).map((x, i) => {
                                                    if (i == drugs.filter((y)=>{return y.value}).length - 1)
                                                        return (<Text>{x.name} : {x.amt}  </Text>)
                                                    else
                                                        return (<Text>{x.name} : {x.amt} ,  </Text>)
                                                })}
                                            </Text>
                                            </View>:<View></View>
                                            }
                                            {drugs.map((item, i) => {
                                                return (
                                                    <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20, marginVertical: 5, paddingBottom: 10, borderRadius: 10, borderWidth: 0.5 }}>

                                                        <View style={{ flex: 1, marginLeft: -40 }}>

                                                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                                                <Checkbox
                                                                    status={item.value ? 'checked' : 'unchecked'}
                                                                    style={{ flex: 3 }}
                                                                    onPress={() => {
                                                                        updateDrugChanged(i, item, !item.value)
                                                                    }}
                                                                />
                                                                <Text style={{ flex: 4, marginRight: 20, textAlignVertical: 'center' }}>{item.name}</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <TextInput
                                                                    disabled={item.value ? false : true}
                                                                    label="จำนวน"
                                                                    mode={'outlined'}
                                                                    style={{ flex: 1, marginRight: 20, height: 30 }}
                                                                    value={item.amt}
                                                                    onChangeText={(newValue) => updateDrugAmtChanged(i, item, newValue)}
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>
                                                )

                                            })}
                                        </List.Accordion>

                                        <Divider></Divider>
                                        <List.Accordion
                                            theme={theme}
                                            title="Lab"
                                            left={props => <List.Icon {...props} icon="cog-outline" />}
                                            expanded={expanded5}
                                            onPress={handlePress5}>
                                            <Divider></Divider>
                                            {labs.filter((y)=>{return y.value}).length>0?
                                            <View style={{ flex: 1, marginLeft: -40 }}>
                                                <Text>รายการที่เลือก</Text>
                                                <Text>
                                                {labs.filter((y)=>{return y.value}).map((x, i) => {
                                                    if (i == labs.filter((y)=>{return y.value}).length - 1)
                                                        return (<Text>{x.name} : {x.amt}  </Text>)
                                                    else
                                                        return (<Text>{x.name} : {x.amt} ,  </Text>)
                                                })}
                                            </Text>
                                            </View>:<View></View>
                                            }
                                            {labs.map((item, i) => {
                                                return (
                                                    <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20, marginVertical: 5, paddingBottom: 10, borderRadius: 10, borderWidth: 0.5 }}>

                                                        <View style={{ flex: 1, marginLeft: -40 }}>

                                                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                                                <Checkbox
                                                                    status={item.value ? 'checked' : 'unchecked'}
                                                                    style={{ flex: 3 }}
                                                                    onPress={() => {
                                                                        updateLabChanged(i, item, !item.value)
                                                                    }}
                                                                />
                                                                <Text style={{ flex: 4, marginRight: 20, textAlignVertical: 'center' }}>{item.name}</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <TextInput
                                                                    disabled={item.value ? false : true}
                                                                    label="จำนวน"
                                                                    mode={'outlined'}
                                                                    style={{ flex: 1, marginRight: 20, height: 30 }}
                                                                    value={item.amt}
                                                                    onChangeText={(newValue) => updateLabAmtChanged(i, item, newValue)}
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>
                                                )

                                            })}
                                        </List.Accordion>


                                        <Divider></Divider>
                                        <List.Accordion
                                            theme={theme}
                                            title="Supply"
                                            left={props => <List.Icon {...props} icon="lifebuoy" />}
                                            expanded={expanded6}
                                            onPress={handlePress6}>
                                            <Divider></Divider>
                                            {supplys.filter((y)=>{return y.value}).length>0?
                                            <View style={{ flex: 1, marginLeft: -40 }}>
                                                <Text>รายการที่เลือก</Text>
                                                <Text>
                                                {supplys.filter((y)=>{return y.value}).map((x, i) => {
                                                    if (i == supplys.filter((y)=>{return y.value}).length - 1)
                                                        return (<Text>{x.name} : {x.amt}  </Text>)
                                                    else
                                                        return (<Text>{x.name} : {x.amt} ,  </Text>)
                                                })}
                                            </Text>
                                            </View>:<View></View>
                                            }
                                            {supplys.map((item, i) => {
                                                return (
                                                    <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20, marginVertical: 5, paddingBottom: 10, borderRadius: 10, borderWidth: 0.5 }}>

                                                        <View style={{ flex: 1, marginLeft: -40 }}>

                                                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                                                <Checkbox
                                                                    status={item.value ? 'checked' : 'unchecked'}
                                                                    style={{ flex: 3 }}
                                                                    onPress={() => {
                                                                        updateSupplyChanged(i, item, !item.value)
                                                                    }}
                                                                />
                                                                <Text style={{ flex: 4, marginRight: 20, textAlignVertical: 'center' }}>{item.name}</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <TextInput
                                                                    disabled={item.value ? false : true}
                                                                    label="จำนวน"
                                                                    mode={'outlined'}
                                                                    style={{ flex: 1, marginRight: 20, height: 30 }}
                                                                    value={item.amt}
                                                                    onChangeText={(newValue) => updateSupplyAmtChanged(i, item, newValue)}
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>
                                                )

                                            })}
                                        </List.Accordion>


                                        <Divider></Divider>
                                        <List.Accordion
                                            theme={theme}
                                            title="เครื่องมือแพทย์"
                                            left={props => <List.Icon {...props} icon="tools" />}
                                            expanded={expanded7}
                                            onPress={handlePress7}>
                                            <Divider></Divider>
                                            {tools.filter((y)=>{return y.value}).length>0?
                                            <View style={{ flex: 1, marginLeft: -40 }}>
                                                <Text>รายการที่เลือก</Text>
                                                <Text>
                                                {tools.filter((y)=>{return y.value}).map((x, i) => {
                                                    if (i == tools.filter((y)=>{return y.value}).length - 1)
                                                        return (<Text>{x.name} : {x.amt}  </Text>)
                                                    else
                                                        return (<Text>{x.name} : {x.amt} ,  </Text>)
                                                })}
                                            </Text>
                                            </View>:<View></View>
                                            }
                                            {tools.map((item, i) => {
                                                return (
                                                    <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20, marginVertical: 5, paddingBottom: 10, borderRadius: 10, borderWidth: 0.5 }}>

                                                        <View style={{ flex: 1, marginLeft: -40 }}>

                                                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                                                <Checkbox
                                                                    status={item.value ? 'checked' : 'unchecked'}
                                                                    style={{ flex: 3 }}
                                                                    onPress={() => {
                                                                        updateToolChanged(i, item, !item.value)
                                                                    }}
                                                                />
                                                                <Text style={{ flex: 4, marginRight: 20, textAlignVertical: 'center' }}>{item.name}</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <TextInput
                                                                    disabled={item.value ? false : true}
                                                                    label="จำนวน"
                                                                    mode={'outlined'}
                                                                    style={{ flex: 1, marginRight: 20, height: 30 }}
                                                                    value={item.amt}
                                                                    onChangeText={(newValue) => updateToolAmtChanged(i, item, newValue)}
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>
                                                )

                                            })}
                                        </List.Accordion>


                                    </View>

                                    <View style={{ flexDirection: 'row', padding: 10, backgroundColor: 'white', marginHorizontal: 10 }}>
                                        <TextInput
                                            //disabled={item.value ? false : true}
                                            label="รายละเอียดเพิ่มเติม"
                                            theme={theme}
                                            //mode={'outlined'}
                                            style={{ flex: 1, backgroundColor: 'white' }}
                                            value={desc}
                                            onChangeText={(newValue) => setDesc(newValue)}

                                        />
                                    </View>
                                    <View style={{ marginTop: 10, flexDirection: 'row', padding: 10, backgroundColor: 'white', marginHorizontal: 10 }}>
                                        <Text>date </Text>
                                    </View>

                                </View>
                                <View style={{ flex: 1, marginVertical: 50, marginHorizontal: 20 }}>
                                    {/* <TouchableOpacity style={{ height: 30, backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center' }} onPress={() => { console.warn(docs) }}>
                                        <Text>Test</Text>
                                    </TouchableOpacity> */}

                                    <Button mode="contained" theme={theme2} onPress={() => saveData()}>
                                        บันทึก
                                    </Button>
                                </View>
                            </View>
                        )
                        : (<View><ActivityIndicator></ActivityIndicator></View>)
                    }
                </View>
            </ScrollView>
        </View>
    );


}
export { AddTodoScreen };