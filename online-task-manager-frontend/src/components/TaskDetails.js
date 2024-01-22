import React, { useEffect, useState } from 'react'
import Header from './Header'
import UpdateTask from "./UpdateTask"
import { useNavigate, useParams } from 'react-router-dom'
import MyContext from './MyContext'
import { useAuth } from "../store/auth"


const TaskDetails = () => {
    const { task_id } = useParams();
    const { user, userAuthentication } = useAuth();
    const userid = user.id;
    const [task, setTask] = useState();
    const navigate = useNavigate();
    const [updateTask, setUpdateTask] = useState(false);

    const handleGetData = async (token, taskId) => {
        try {
            const response = await fetch(`http://localhost:5000/users/tasks/details/${taskId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const userData = await response.json();
                    setTask(userData);
                    console.log(task.taskName)
                } else {
                    console.error('Unexpected content type:', contentType);
                }
            } else {
                console.error('Error fetching user data');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteData = async (taskId) => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        console.log('Task ID:', task_id);

        try {
            const response = await fetch(`http://localhost:5000/users/tasks/${taskId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Response:', response);

            if (response.ok) {
                console.log('Task deleted successfully');
                navigate(-1);
            } else {
                console.log('Task was not deleted');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        const authenticateAndFetch = async () => {
            await userAuthentication();
            try {
                handleGetData(token, task_id);
            } catch (error) {
                console.log(error)
            }
        };
        authenticateAndFetch();
    }, [updateTask]);




    return (
        <MyContext.Provider value={{ updateTask, setUpdateTask }}>
            {task && <div >
                <div>
                    <Header />
                    {
                        updateTask &&
                        <div className='absolute z-10 w-full h-full flex justify-center items-center'><UpdateTask /></div>
                    }
                    <div className='border-2 m-8 p-4 shadow-xl rounded-lg flex justify-between'>

                        <div className='w-[50%]'>
                            <div className='font-bold text-5xl m-3 p-3'>{task.taskName}</div>
                            <div className='font-semibold text-xl text-justify m-3 p-3'>{task.taskDescription}</div>
                            <div className='font-semibold italic text-lg mt-3 mx-3 p-3'>
                                <div >Starts from: {task.startTime}</div>
                                <div >Ends at: {task.endTime}</div>
                            </div>
                        </div>
                        <div className='m-6 p-3 w-[50%] flex flex-col items-center'>
                            <button className='m-3 p-3 w-1/4 text-xl border-2 h-12 rounded-xl' onClick={() => setUpdateTask(true)}>Update</button>
                            <button className='m-3 p-3 w-1/4 text-xl border-2 h-12 rounded-xl' onClick={() => handleDeleteData(task_id)}>Delete</button>
                            <button className='m-3 p-3 w-1/4 text-xl border-2 h-12 rounded-xl' onClick={() => navigate(-1)}>Go Back</button>
                        </div>
                    </div>
                </div>

            </div>}
        </MyContext.Provider>
    )
}

export default TaskDetails