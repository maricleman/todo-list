import React, { useState } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Title from './Title';
import AddItem from './form-components/AddItem';
import TodoListTable from './table/TodoListTable';
import TodoItem from './common/TodoItem';
import styles from './AppStyles.scss';
import Header from './Header';
import Welcome from './auth/Welcome';
import UserInfo from './common/UserInfo';
import UserInfoDto from './common/UserInfoDTO';
import TodoItemDTO from './common/TodoItemDTO';
import appConfig from '../appConfig.js';

/**
 * I want to extend a thanks to this example for
 * ideas on how to style the application:
 * https://nuflakbrr-todolist.vercel.app/
 * https://github.com/nuflakbrr/react-todolist/blob/master/src/components/List.js
 * 
 * @returns The Todo Application in its entirety.
 */
function App() {
    const [itemsInTodoList, setItemsInTodoList] = useState<Array<TodoItem>>([]);
    const [userProfileInfo, setUserProfileInfo] = useState<UserInfo>();

    const handleAddNewItemToList = (paramNewItem: string) => {
        let todoItem = new TodoItem(paramNewItem);
        if (itemsInTodoList.length === 0) {
            todoItem.setId(0);
        } else {
            const previousId = itemsInTodoList[itemsInTodoList.length - 1].getNumericId();
            todoItem.setId(previousId + 1);
        }
        const tempListOfTodoItems = [...itemsInTodoList, todoItem];
        localStorage.setItem('listOfItemsInTodoList', JSON.stringify(tempListOfTodoItems));
        setItemsInTodoList([...itemsInTodoList, todoItem]);
    }

    const handleDeletingItemInToDoList = (idToDelete: number) => {
        let newItemsInTodoList = Array<TodoItem>();
        itemsInTodoList.forEach((item) => {
            if (item.getNumericId() !== idToDelete) {
                newItemsInTodoList.push(item);
            }
            setItemsInTodoList(newItemsInTodoList);
        });
    }


    /**
     * Handle adding the user's profile
     * to the parent's state
     * variable.
     * @param userProfileInfo 
     */
    const handleAddingUserProfileInfo = (userProfileInfo: UserInfo) => {
        setUserProfileInfo(userProfileInfo);
    }

    /**
     * Handle saving the user's
     * list of todo items
     */
    const handleSavingUsersTodoList = () => {
        console.log('/**************************************************************/');
        console.log('Info to save for user...');
        console.log('ID: ', userProfileInfo?.UserActiveDirectoryID);
        console.log('Name: ', userProfileInfo?.displayName);
        console.log('Email: ', userProfileInfo?.Email);
        itemsInTodoList.forEach((item) => {
            console.log('todo item: ', item.title)
        });
        const userId: string = userProfileInfo?.UserActiveDirectoryID || "";
        const userDisplayName: string = userProfileInfo?.displayName || "";
        const userEmail: string = userProfileInfo?.Email || "";
        let usersTodoList = new Array<TodoItemDTO>();

        itemsInTodoList.forEach((item) => {
            let specificItem = new TodoItemDTO(item.id, item.title);
            usersTodoList.push(specificItem);
        });

        const itemToSave = new UserInfoDto(userId,
            userDisplayName,
            userEmail,
            usersTodoList);

        console.log('itemToSave: ', itemToSave);

        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Content-Type', 'application/json');

        const options: RequestInit = {
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body: JSON.stringify(itemToSave)
        };

        console.log('requestBody: ', options.body);

        console.log('Attempting to save data...');
        fetch(appConfig.todoManagerApiUrl, options)
            .then(response => response.text())
            .then(data => console.log('Success: ', data))
            .catch(error => console.log(error));

        console.log('/**************************************************************/');
    }

    /**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <div className={styles.mainContainer}>
                    <Welcome handleAddingUserProfileInfo={handleAddingUserProfileInfo} />
                    <Header />
                    <Title />
                    <AddItem
                        handleAddNewItemToList={handleAddNewItemToList}
                        handleSavingUsersTodoList={handleSavingUsersTodoList}
                        isUserLoggedIn={true}
                    />
                    <TodoListTable
                        itemsInTodoList={itemsInTodoList}
                        handleDeletingItemInToDoList={handleDeletingItemInToDoList}
                    />
                </div>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <div className={styles.mainContainer}>
                    <Header />
                    <Title />
                    <AddItem
                        handleAddNewItemToList={handleAddNewItemToList}
                        handleSavingUsersTodoList={handleSavingUsersTodoList}
                        isUserLoggedIn={false}
                    />
                    <TodoListTable
                        itemsInTodoList={itemsInTodoList}
                        handleDeletingItemInToDoList={handleDeletingItemInToDoList}
                    />
                </div>
            </UnauthenticatedTemplate>
        </div>
    );
}

export default App