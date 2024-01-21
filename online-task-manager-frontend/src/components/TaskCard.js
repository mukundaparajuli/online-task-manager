import React from 'react'
const TaskCard = ({ taskName, taskDescription, startTime, endTime }) => {
    console.log(taskName, taskDescription, startTime, endTime)
    return (

        <div className='w-72 h-44 m-8 p-3 rounded-xl border-blue-200 border shadow-blue-800 shadow-xl '>
            <div className='text-xl font-extralight border-b-2 border-white bg-blue-500 h-16 text-white rounded-lg w-auto text-center p-1'>{startTime}"-"{endTime}</div>
            <div className='font-bold text-3xl border-b-2 overflow-hidden h-16 border-white'>{taskName}</div>
            <div className='bg-yellow-500 rounded-xl shadow-lg shadow-blue-800 p-2 relative m-2 top-2 font-bold text-center'>In Progress</div>
        </div>

    )
}

export default TaskCard