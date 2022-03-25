import React, { useState } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import Title from './Title';
import AddItem from './form-components/AddItem';
import TodoListTable from './table/TodoListTable';
import TodoItem from './common/TodoItem';
import styles from './AppStyles.scss';
import Header from './Header';
import { loginRequest } from "../authConfig";
import { callMsGraph } from "./auth/graph";
import { ProfileData}  from './auth/ProfileData';
import Welcome from './auth/Welcome';

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

    const handleAddNewItemToList = (paramNewItem: string) => {
        let todoItem = new TodoItem(paramNewItem);
        if (itemsInTodoList.length === 0) {
            todoItem.setId(0);
        } else {
            const previousId = itemsInTodoList[itemsInTodoList.length - 1].getNumericId();
            todoItem.setId(previousId + 1);
        }
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
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        });
    }

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            <h5 className="card-title">Welcome {accounts[0].localAccountId}</h5>
            <h5 className="card-title">Welcome {accounts[0].username}</h5>
            {/* {graphData ? 
                <ProfileData graphData={graphData} />
                :
                <button onClick={RequestProfileData}>Request Profile Information</button>
            } */}
        </>
    );
};

    /**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <div className={styles.mainContainer}>
                    <Welcome />
                    <Header />
                    <Title />
                    <AddItem
                        handleAddNewItemToList={handleAddNewItemToList}
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