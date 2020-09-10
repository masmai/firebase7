import database from '@react-native-firebase/database';
import { Platform } from 'react-native';

class UserRepo {
    Add = (user, uid) => {
        database()
        .ref(`/users/${uid}`)
        .set({
            name: user.name,
            email: user.email,
            uid: uid,
            isOnline: false
        }).then(() => console.log('Data set.'));
        
    }
    Update = () => {

    }
    Delete = () => {

    }
    List = () => {

    }
    GetData = () => {

    }

}
export const userRepo = new UserRepo()