import React, { useEffect, useState } from 'react';
import Header from './Header';
import TaskCards from './TaskCards';
import AddTask from './AddTask';  // Assuming you have an AddTask component
import MyContext from './MyContext';
import UpdateTask from './UpdateTask';
import { useAuth } from "../store/auth"

const Body = () => {
    const [tasks, setTasks] = useState([]);

    const handleTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]);
    };
    // Assuming addTask and setAddTask are state variables
    const { userAuthentication } = useAuth();
    const [addTask, setAddTask] = useState(false);
    const [updateTask, setUpdateTask] = useState(false);
    const [task, setTask] = useState(null)
    const { user, serverToken } = useAuth()
    const handleGetData = async (token) => {
        try {
            console.log(user)
            const userid = user.id;
            console.log(userid)
            const response = await fetch(`http://localhost:5000/users/tasks/${userid}`, {
                method: "GET",
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },

            })
            console.log(response)
            if (response.ok) {
                const contentType = response.headers.get("Content-Type");
                if (contentType && contentType.includes("application/json")) {
                    const userData = await response.json();
                    console.log(userData);
                    setTask(userData)
                    console.log(task);
                } else {
                    console.error("Unexpected content type:", contentType);
                }
            } else {
                console.error("Error fetching user data");
            }
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(token)
        const authenticateAndFetch = async () => {
            await userAuthentication();
            handleGetData(token);
        }
        authenticateAndFetch();
    }, [])
    return (
        <MyContext.Provider value={{ addTask, setAddTask, updateTask, setUpdateTask }}>
            <div className=''>
                {addTask &&
                    <div className='absolute z-10 flex justify-center w-full shadow-2xl shadow-gray-500 bg-opacity-5'>
                        <AddTask />
                    </div>
                }
                {updateTask &&
                    <div className='absolute z-10 flex justify-center w-full'>
                        <UpdateTask />
                    </div>
                }
                <Header />
                <TaskCards tasks={task} />
            </div>
        </MyContext.Provider >
    );
}

export default Body;
