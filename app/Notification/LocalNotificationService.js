import PushNotification from "react-native-push-notification"
import axios from 'axios'
class LocalNotificationService {
    configure = (onOpenNotification) => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("[LocalNotificationService] onRegister:", token);
            },
            onNotification: function (notification) {
                console.log("[LocalNotificationService] onNotification:", notification);
                if (!notification?.data) {
                    return
                }
                notification.userInteraction = true;
                onOpenNotification(notification.data);
            },
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        })
    }

    unregister = () => {
        PushNotification.unregister();
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            /* Android Only Properties */
            ...this.buildAndroidNotification(id, title, message, data, options),
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false, // BOOLEAN : If notification was opened by the user from notification
            channelId: "32",
            badge: true,
        });
    }

    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_notification",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || 'high',
            importance: options.importance || 'high',
            data: data,
        }
    }

    cancelAllLocalNotifications = () => {
        PushNotification.cancelAllLocalNotifications();
    }

    removeDeliveredNotificationByID = (notificationId) => {
        console.log("[LocalNotificationService] removeDeliveredNotificationByID:", notificationId);
        PushNotification.cancelLocalNotifications({ id: `${notificationId}` })
    }

    // applicationBadge = () => {
    //     // PushNotification.setApplicationIconBadgeNumber(2);
    //     // const ShortcutBadger = NativeModules.ShortcutBadger;
    //     // let count = 1;
    //     // ShortcutBadger.applyCount(count);
    // }
    getAdminList = () => {
        var admin_fcmToken = "";
        database().ref("users").orderByChild("isAdmin").equalTo(true).on("child_added", function (snapshot) {
            console.warn("user is Admin", snapshot.toJSON().fcmToken);
            admin_fcmToken = snapshot.toJSON().fcmToken;

        });
        console.warn("admin_fcmToken ", admin_fcmToken);
        return admin_fcmToken;
    }
    sendNoti = (title, to) => {
        console.warn(title,to)
    
        axios.post("https://fcm.googleapis.com/fcm/send",

            {
                "notification": {
                    title: title,
                    body: "Hello World",
                },
                "priority": "HIGH",
                "data": {
                    "action": "gotolist"
                },
                "to": to
            }
            ,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "key=AAAAW8WdFek:APA91bGywpziyzqVOi_rVewPYB_rtytz4pUxZoDYkTQgQdX80tLSL1_2o5sos202woITB67g05Cyn7qauZZ4fdULPgIZy3JRYT2t6izSjG6XDdQyKaHydIBtsp6QBdOHg7O3Y_bF5-M6"
                }
            }
        ).then(response => {
            console.warn("response", response);
        }).catch(error => {
            console.warn(error);
        });
    }

}

export const localNotificationService = new LocalNotificationService();