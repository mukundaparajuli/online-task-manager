import React, { useContext, useEffect, useState } from 'react';
import MyContext from './MyContext';
import { useAuth } from '../store/auth';
const AddTask = () => {
    const [task, setTask] = useState({
        taskName: "",
        taskDescription: "",
        startTime: "",
        endTime: "",
    })

    const { userAuthentication, serverToken } = useAuth();
    const { addTask, setAddTask } = useContext(MyContext);
    const handleInput = (e) => {
        console.log(e)
        let name = e.target.name;
        let value = e.target.value;

        setTask({
            ...task,
            [name]: value,
        });
    }
    const handleAddTask = async (token) => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch('http://localhost:5000/users/tasks/', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`

                },
                body: JSON.stringify(task)
            })
            console.log(response)
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData)
                alert("task was added successfully!");
                setAddTask(0)
            } else {
                console.log("error inside response ");
            }
        } catch (error) {
            console.error("Error", error);
        }
    }
    useEffect(() => {
        // const token = localStorage.getItem('token')
        const authenticateAndAdd = async () => {
            await userAuthentication();
            // handleAddTask(token);
        }
        authenticateAndAdd();
    }, [])
    return (

        <div className='flex justify-center items-center h-[100vh]'>
            <div className='w-[60vw] h-[90vh] border rounded-lg bg-gray-500 text-white '>
                <form onSubmit={handleAddTask}>
                    <div className='m-2 p-2' >
                        <label htmlFor="startTime" className='font-semibold text-2xl m-2 p-3'>From:</label>
                        <input type="date" name="startTime" id="startTime" value={task.startTime} className='border-2 p-2 text-black border-black rounded-lg' onChange={handleInput} /><br />
                    </div>

                    <div className='m-2 p-2' >
                        <label htmlFor="endTime" className='font-semibold text-2xl m-2 p-3'>To:</label>
                        <input type="date" name="endTime" id="endTime" value={task.endTime} className='border-2 p-2 text-black border-black rounded-lg' onChange={handleInput} /><br />
                    </div>

                    <div className='m-2 p-2' >
                        <label htmlFor="taskName" className='font-semibold text-2xl  m-2 p-3'>Task:</label>
                        <input type="text" name="taskName" id="taskName" value={task.taskName} className='border-2 p-2 text-black font-semibold text-lg rounded-lg border-black' onChange={handleInput} /><br />
                    </div>

                    <div className='m-2 p-2' >
                        <label htmlFor="taskDescription" className='font-semibold text-2xl m-2 p-3'>Task Description:</label><br />
                        <textarea name="taskDescription" id="taskDescription" value={task.taskDescription} cols="30" rows="10" className='text-black border-2 border-black m-2 p-4 w-3/5 rounded-xl justify-center text-md font-semibold' onChange={handleInput}></textarea><br />
                    </div>

                    <div className='p-3'>
                        <button className='m-2 p-2 bg-green-600 rounded-lg shadow-green-500 text-lg font-bold text-white'>Add+</button>
                    </div>
                </form>
                <button className='m-2 p-2 bg-red-600 rounded-lg shadow-red-500 text-lg font-bold text-white' onClick={() => setAddTask(0)}>Cancel</button>
            </div>
        </div>

    );
}

export default AddTask;
