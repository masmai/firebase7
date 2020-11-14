//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { fcmService } from './app/Notification/FCMService';
import { localNotificationService } from './app/Notification/LocalNotificationService';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, SettingsScreen, ProfileScreen, TodoListScreen, AddTodoScreen, TaskDetailScreen } from './Page'
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { authService } from './app/Auth/AuthService';
import ScannerScreen from './Page/ScannerScreen';

// create a component
const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification)
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [])
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const onRegister = (token) => {
    console.log("[App] Token", token);
  }

  const onNotification = (notify) => {
    // console.log("[App] onNotification", notify);
    const options = {
      soundName: 'default',
      playSound: true,
    }

    localNotificationService.showNotification(
      0,
      notify.notification.title,
      notify.notification.body,
      notify,
      options,
    )
  }

  const onOpenNotification = async (notify) => {

    console.log('notify', notify);
  }


  const onReg = async () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    await authService.createAccount(user)
  };
  const onSign = async () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    await authService.signinAccount(user);
  };
  const onSignOut = async () => {

    await authService.signOut();
  };



  if (initializing) return null;

  if (!user) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Login</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setName(text)}
          value={name}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={onReg}
        >
          <Text>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={onSign}
        >
          <Text>Signin</Text>
        </TouchableOpacity>
      </View>

    );
  }
  const Tab = createBottomTabNavigator();
  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'//'ios-information-circle'
                : 'ios-home'//'ios-information-circle-outline';
            } else if (route.name === 'Todos') {
              iconName = focused
                ? 'ios-list'
                : 'ios-list';
            } else if (route.name === 'AddTodo') {
              iconName = focused
                ? 'ios-add-circle-outline'
                : 'ios-add-circle-outline';
            } else if (route.name === 'Profile') {
              iconName = focused
                ? 'ios-person'
                : 'ios-person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}

        tabBarOptions={{
          activeTintColor: '#35d0ba',
          inactiveTintColor: 'gray',

        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Todos" component={TodoListScreen} />
        {/* <Tab.Screen name="AddTodo" component={AddTodoScreen} /> */}
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>



    );
  }

  const Stack = createStackNavigator();
  return (
    // <View>
    //   <Text>Welcome {user.uid}</Text>
    //   <TouchableOpacity
    //       style={styles.button}
    //       onPress={ onSignOut }
    //     >
    //       <Text>Signout</Text>
    //     </TouchableOpacity>

    // </View>
    

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{
              //headerTransparent: true,
              //headerShown:false
              headerBackground: () => (
                <View style={[StyleSheet.absoluteFill, { backgroundColor: '#35d0ba' }]} />
              ), headerRight: () => (<TouchableOpacity onPress={onSignOut}><Text>logout</Text></TouchableOpacity>)
            }} name="Hospital" component={HomeTabs} />



            <Stack.Screen name="AddTodo2" component={AddTodoScreen} />
           
            <Stack.Screen name="taskDetail" component={TaskDetailScreen} />
            <Stack.Screen name="ScannerScreen" component={ScannerScreen}/>
            {/*<Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="RosterList" component={RosterList} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Login" component={Login} /> */}
          </Stack.Navigator>
        </NavigationContainer>
     
  );
  // 
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});

//make this component available to the app
export default App;
