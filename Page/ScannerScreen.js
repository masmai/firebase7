'use strict';

import React, { Component } from 'react';
import database from '@react-native-firebase/database';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking, Alert
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { localNotificationService } from '../app/Notification/LocalNotificationService';

export default class ScannerScreen extends Component {
    onSuccess = (e) => {
        var self = this;
        console.warn(e.data)
        // Linking.openURL(e.data).catch(err =>
        //   console.error('An error occured', err)
        // );
        setTimeout(() => {
            if (this.props.route.params.item.toDept.trim() == e.data.trim()) {
                Alert.alert(
                    "ปิดงานสำเร็จ",
                    "good job",
                    [

                        { text: "OK", onPress: () => self.updateTask(this.props.route.params.item) }
                    ],
                    { cancelable: false }
                );

            } else {
                console.error('An error occured', e.data)
                Alert.alert(
                    "หน่วยงานปลายทางไม่ตรง",
                    "สแกนอีกครั้ง",
                    [
                        { text: "ยกเลิก", onPress: () => self.props.navigation.navigate("Todos") },
                        { text: "ตกลง", onPress: () => self.ref.reactivate() }
                    ],
                    { cancelable: false }
                );
            }

        }, 0)

    };
    updateTask(item) {
        var self = this;
        database().ref('todos/' + item.id).update({ isCancel: false, isComplete: true }).then((data) => {
            //success callback
            console.log('data ', data)

            //get users from user repo and find admin fcm token
            database().ref("users").orderByChild("isAdmin").equalTo(true).on("child_added", function (snapshot) {
                //console.warn("user is Admin", snapshot.toJSON().fcmToken);
                //admin_fcmToken = snapshot.toJSON().fcmToken;
                localNotificationService.sendNoti('updateTask ' + item.name + ' complete', snapshot.toJSON().fcmToken);
                self.props.navigation.navigate("Todos")
            });


        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })
    }
    componentDidMount() {

        console.warn(this.props.route.params.item.toDept)
    }
    render() {
        return (
            <QRCodeScanner
                ref={(c) => { this.ref = c }}
                onRead={this.onSuccess}
                flashMode={RNCamera.Constants.FlashMode.off}
                reactivate={false}
                topContent={
                    <Text style={styles.centerText}>
                        Go to{' '}
                        <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
                }
                bottomContent={
                    <TouchableOpacity onPress={() => { this.props.navigation.popToTop() }} style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}>OK. Got it!</Text>
                    </TouchableOpacity>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});