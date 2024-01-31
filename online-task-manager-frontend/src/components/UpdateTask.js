import React, { useContext, useState } from 'react';
import MyContext from './MyContext';
import { useParams } from 'react-router-dom';

const UpdateTask = () => {
    const { setUpdateTask } = useContext(MyContext);
    const token = localStorage.getItem('token')
    const { task_id } = useParams();
    const [updatedTask, setUpdatedTask] = useState({
        taskName: "",
        taskDescription: "",
        startTime: "",
        endTime: "",
    })
    const handleChange = (e) => {
        console.log(e)
        let name = e.target.name;
        let value = e.target.value;

        setUpdatedTask({
            ...updatedTask,
            [name]: value,
        });
    }
    const handleUpdateData = async (task_id) => {
        try {
            const response = await fetch(`http://localhost:5000/users/tasks/${task_id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            });
            if (response.ok) {
                console.log('Task updated successfully');
                setUpdatedTask(response.json())
                console.log(updatedTask)
                setUpdateTask(false);
            } else {
                const errorMessage = await response.text();
                alert(`Task was not updated: ${errorMessage}`)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <div className='w-[60vw] h-[90vh] border rounded-lg bg-gray-400 text-white '>
                <div className='m-2 p-2' >
                    <label htmlFor="startTime" className='font-semibold text-2xl m-2 p-3'>From:</label>
                    <input type="datetime-local" name="startTime" id="startTime" onChange={handleChange} value={updatedTask.startTime} className='text-black border-2 p-2 border-black rounded-lg' /><br />
                </div>

                <div className='m-2 p-2' >
                    <label htmlFor="endTime" className='font-semibold text-2xl m-2 p-3'>To:</label>
                    <input type="datetime-local" name="endTime" id="endTime" onChange={handleChange} value={updatedTask.endTime} className='text-black border-2 p-2 border-black rounded-lg' /><br />
                </div>

                <div className='m-2 p-2' >
                    <label htmlFor="taskName" className='font-semibold text-2xl m-2 p-3'>Task:</label>
                    <input type="text" name="taskName" id="taskName" onChange={handleChange} value={updatedTask.taskName} className='text-black border-2 p-2 font-semibold text-lg rounded-lg border-black' /><br />
                </div>

                <div className='m-2 p-2' >
                    <label htmlFor="taskDescription" className='font-semibold text-2xl m-2 p-3'>Task Description:</label><br />
                    <textarea name="taskDescription" id="taskDescription" onChange={handleChange} value={updatedTask.taskDescription} cols="30" rows="10" className='text-black border-2 border-black m-2 p-4 w-3/5 rounded-xl justify-center text-md font-semibold'></textarea><br />
                </div>

                <div className='p-3'>
                    <button className='m-2 p-2 bg-green-600 rounded-lg shadow-green-500 text-lg font-bold text-white' onClick={() => handleUpdateData(task_id)}>Update</button>
                    <button className='m-2 p-2 bg-red-600 rounded-lg shadow-red-500 text-lg font-bold text-white' onClick={() => setUpdateTask(0)}>Cancel</button>
                </div>
            </div>
        </div>

    );
}

export default UpdateTask;
