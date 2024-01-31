import React from 'react';
import moment from 'moment';

const TaskCard = ({ taskName, taskDescription, startTime, endTime }) => {
    //   const currentDate = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
    const currentTime = new Date();
    const endingTime = new Date(endTime)
    console.log()
    return (
        <div className='w-72 h-40 m-8 p-3 rounded-xl border-blue-200 border shadow-blue-800 shadow-xl '>
            <div className='text-lg font-extralight border-white bg-blue-500 h-12 text-white rounded-lg w-auto text-center p-2'>Due Date: {moment(endTime).format('MMMM Do YYYY')}
            </div>
            <div className='font-semibold m-1 p-1 text-4xl border-b-2 overflow-hidden h-10 border-white text-center flex-start items-center justify-center'>{taskName}</div>
            {currentTime < endingTime ? (
                <div className='bg-yellow-500 text-white rounded-xl shadow-lg shadow-blue-800 p-2 relative top-7 font-bold text-center'>
                    In Progress
                </div>
            ) : (
                <div className='bg-red-500 text-white rounded-xl shadow-lg shadow-blue-800 p-2 relative top-7 font-bold text-center'>
                    Finished
                </div>
            )}
        </div>
    );
};

export default TaskCard;