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

    const { userAuthentication } = useAuth();
    const { setAddTask } = useContext(MyContext);
    const token = localStorage.getItem("token")
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
            // const token = localStorage.getItem("token")
            const response = await fetch('http://localhost:5000/users/tasks/', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`

                },
                body: JSON.stringify(task)
            })
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData)
                alert("task was added successfully!");
                setAddTask(false)
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message || "Unknown error";
                console.log(errorMessage)
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Error", error);
        }
    }
    useEffect(() => {
        const authenticateAndAdd = async () => {
            await userAuthentication();
        }
        authenticateAndAdd();
    }, [])
    return (

        <div className='flex justify-center items-center h-[100vh]'>
            <div className='w-[40vw] h-auto border rounded-lg bg-blue-200'>
                <form onSubmit={() => handleAddTask(token)}>
                    <div className='m-2 p-2' >
                        <label htmlFor="startTime" className='font-semibold text-2xl m-2 p-3'>From:</label>
                        <input type="datetime-local" name="startTime" id="startTime" value={task.startTime} className='border-2 p-2 text-black border-black rounded-lg' onChange={handleInput} /><br />
                    </div>

                    <div className='m-2 p-2' >
                        <label htmlFor="endTime" className='font-semibold text-2xl m-2 p-3'>To:</label>
                        <input type="datetime-local" name="endTime" id="endTime" value={task.endTime} className='border-2 p-2 text-black border-black rounded-lg' onChange={handleInput} /><br />
                    </div>

                    <div className='m-2 p-2' >
                        <label htmlFor="taskName" className='font-semibold text-2xl  m-2 p-3'>Task:</label>
                        <input type="text" name="taskName" id="taskName" value={task.taskName} className='border-2 p-2 text-black font-semibold text-lg rounded-lg border-black' onChange={handleInput} /><br />
                    </div>

                    <div className='m-2 p-2' >
                        <label htmlFor="taskDescription" className='font-semibold text-2xl m-2 p-3'>Task Description:</label><br />
                        <textarea name="taskDescription" id="taskDescription" value={task.taskDescription} cols="30" rows="5" className='text-black border-2 border-black m-2 p-4 w-3/5 rounded-xl justify-center text-md font-semibold' onChange={handleInput}></textarea><br />
                    </div>

                    <div className='p-3'>
                        <button className='w-[20%] m-2 p-2 bg-green-600 rounded-lg shadow-green-500 text-lg font-bold text-white' type='submit'>Add+</button>
                        <button className='w-[20%] m-2 p-2 bg-red-600 rounded-lg shadow-red-500 text-lg font-bold text-white' onClick={() => setAddTask(false)}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>

    );
}

export default AddTask;
