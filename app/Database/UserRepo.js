import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Platform } from 'react-native';

class UserRepo {
    Add = (user, uid) => {
        database()
            .ref(`/users/${uid}`)
            .set({
                name: user.name,
                email: user.email,
                uid: uid,
                fcmToken: user.fcmToken,
                isOnline: false
            }).then(() => console.log('Data set.'));

    }
    Update = (data) => {
        var userf = auth().currentUser;
        database().ref('users/' + userf.uid).update(data).then((data) => {
            //success callback
            console.log('data ', data)

        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })
    }
    Delete = () => {

    }
    List = () => {

    }
    GetData = () => {

    }
   

}
export const userRepo = new UserRepo()