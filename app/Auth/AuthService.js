import auth from '@react-native-firebase/auth';
import { userRepo } from '../Database/UserRepo';

class AuthService {
    createAccount = async (user) => {
        let self = this;
        auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(function () {
                console.log("created user successfully. User email:" + user.email + " name:" + user.name);
                var userf = auth().currentUser;
                userf.updateProfile({ displayName: user.name })
                    .then(function () {
                        console.log("Updated displayName successfully. name:" + user.name);
                        alert("User " + user.name + " was created successfully. Please login.");
                        userRepo.Add(user, userf.uid)
                    }, function (error) {
                        console.warn("Error update displayName.");
                    });
            }, function (error) {
                console.error("got error:" + typeof (error) + " string:" + error.message);
                alert("Create account failed. Error: " + error.message);
            });
    }

    signinAccount = async (user) => {
        auth().signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }
    signOut = async () => {

        auth().signOut().then(() => console.log('User signed out!'));
    }
}
export const authService = new AuthService();