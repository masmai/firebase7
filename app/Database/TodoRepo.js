import database from '@react-native-firebase/database';
import { Platform } from 'react-native';

class TodoRepo {
    Add = (task, uid) => {
        database()
            .ref(`/todos/${uid}`)
            .set({
                name: task.name,
                createdBy: task.createdBy,
                workedBy: task.workedBy
            }).then(() => console.log('Data set.'));

    }
    Update = () => {

    }
    Delete = () => {

    }
    List = async() => {
        await database()
            .ref('todos')
            .once('value');
    }


    GetData = () => {

    }

}
export const todoRepo = new TodoRepo()