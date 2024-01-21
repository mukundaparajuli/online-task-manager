import React, { useState } from 'react'
import TaskCard from './TaskCard'
import AddTask from './AddTask'
import MyContext from './MyContext'
import { Link } from 'react-router-dom'

const TaskCards = (props) => {
    const tasks = props;
    const [addTask, setAddTask] = useState(false)
    const cards = tasks.tasks;
    console.log(cards)
    return (
        <MyContext.Provider value={{ addTask, setAddTask }}>

            <div>
                {addTask && <div className='absolute z-10 w-full h-full flex justify-center items-center'>
                    <AddTask />
                </div>}
                <div className='flex flex-wrap justify-evenly'>
                    {cards && cards.map((card) =>
                    (
                        <Link to={"/users/tasks/details/" + card._id}>
                            <TaskCard key={tasks.index} {...card} />
                        </Link>
                    )
                    )}
                    <div className='flex justify-center items-center m-6 hover:first-line:bg-slate-700'>
                        <button onClick={() => setAddTask(!addTask)}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 items-center justify-center font-bold border rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                            <div className='font-bold text-slate-800 text-xl'>Add a task!</div> </button>
                    </div>
                </div>
            </div>
        </MyContext.Provider>
    )
}

export default TaskCards