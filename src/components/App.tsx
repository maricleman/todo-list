import React, { useEffect, useState } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from "@azure/msal-react";
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
import FadeLoader from 'react-spinners/FadeLoader';

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
    const [loading, setLoading] = useState(false);
    const [mainContentClassName, setMainContentClassName] = useState(styles.mainContainer);
    const isAuthenticated = useIsAuthenticated();
    const [isUserProfileInfoAvailable, setIsUserProfileAvailable] = useState(false);

    const override = `
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
    `;

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
        setIsUserProfileAvailable(true);
    }

    const handleToggleLoadingScreen = (isLoading: boolean) => {
        if (isLoading) {
            setMainContentClassName(styles.mainContainerLoading);
            setLoading(true);
        } else {
            setMainContentClassName(styles.mainContainer);
            setLoading(false);
        }
    }

    /**
     * Handle saving the user's
     * list of todo items
     */
    const handleSavingUsersTodoList = () => {
        handleToggleLoadingScreen(true);

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

        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Content-Type', 'application/json');

        const options: RequestInit = {
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body: JSON.stringify(itemToSave)
        };

        fetch(appConfig.todoManagerApiUrl, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                handleToggleLoadingScreen(false);
            })
            .catch(error => {
                console.log(error);
                handleToggleLoadingScreen(false);
            });
    }

    /**
     * Handle getting the user's todo list -- if one
     * already exists;
     */
    const handleRetrievingUserInfoAndList = () => {
        handleToggleLoadingScreen(true);
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Content-Type', 'application/json');

        const options: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: myHeaders,
        };

        fetch(`${appConfig.todoManagerApiUrl}/?ActiveDirectoryId=${userProfileInfo?.UserActiveDirectoryID}`,
            options).then(response => response.json())
            .then(data => {
                const newArrayOfTodoItems = data.list_of_todo_items;
                const myListOfTodoItems = new Array<TodoItem>();
                newArrayOfTodoItems.forEach(item => {
                    let specificItem = new TodoItem(item.title);
                    specificItem.setStringLiteralId(item.id);
                    myListOfTodoItems.push(specificItem);
                });
                setItemsInTodoList(myListOfTodoItems);
                handleToggleLoadingScreen(false);
            })
            .catch(error => {
                handleToggleLoadingScreen(false);
                console.log(error)
            });
    }

    useEffect(() => {
        if (isAuthenticated) {
            handleRetrievingUserInfoAndList();
        }
    }, [isUserProfileInfoAvailable]);

    /**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <div className={mainContentClassName}>
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
            <FadeLoader css={override} loading={loading} />
        </div>
    );
}

export default App