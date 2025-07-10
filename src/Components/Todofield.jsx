import React, { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Todofield = () => {
  const [inputChange, setInputChange] = useState('')
  const [todoArray, setTodoArray] = useState([])
  const totalWork = todoArray.length;
  const workCompleted = todoArray.filter(item=>{
   return item.completed === true;
  }).length;
  let percentage =( workCompleted/totalWork)*100;
  const handleCheckToggle = (indexToCheck) => {
    setTodoArray(
      todoArray.map((item, index) =>
        index === indexToCheck
          ? { ...item, completed: !item.completed }
          : item
      )
    )
  }
 
  useEffect(() => {
  if (
    todoArray.length > 0 &&
    todoArray.every((item) => item.completed === true)
  ) {
    toast.success('Congrats 🎉! You completed all the tasks')
  }
}, [todoArray])

  const handleDelete = (indexDlt) => {
    const newArray = todoArray.filter((_, index) => index !== indexDlt)
    setTodoArray(newArray)
    toast.warn('Todo is deleted')
  }

  const handleAdd = () => {
    if (inputChange.trim() === '') {
      toast.error('Enter a valid task')
      return
    }
    setTodoArray([...todoArray, { text: inputChange, completed: false }])
    setInputChange('')
    toast.success('Task added successfully!')
  }

  const clearAll = () => {
    if(todoArray.length === 0)
    {
      toast("Already cleared all ToDos!")
      return;
    }
    setTodoArray([])
    toast.info('All tasks cleared!')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6 font-[Poppins]">
      <div className="bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-3xl transition-all duration-300">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Todo App
        </h1>

        {/* Input and Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={inputChange}
            onChange={(e) => setInputChange(e.target.value)}
            placeholder="Add your todo here"
            className="flex-1 p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition flex items-center gap-2 cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add
          </button>

          <button
            onClick={clearAll}
            className=" cursor-pointer bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Clear All
          </button>
        </div>
{/* Progress Circle */}
<div className="w-24 h-24 mx-auto mt-6">
  <CircularProgressbar
    value={percentage}
    text={`${Math.round(percentage)}%`}
    styles={buildStyles({
      textSize: '16px',
      pathColor: '#10b981',        
      textColor: '#ffffff',        
      trailColor: '#374151',       
      backgroundColor: '#1f2937',  
    })}
  />
</div>

        {/* Todo List */}
        <ul className="mt-6 space-y-2 transition-all duration-300 ease-in-out">
          {todoArray.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-700 p-3 rounded-lg shadow hover:bg-gray-600 hover:scale-[1.01] transition-all duration-300"
            >
             <div className="flex items-center gap-3">
  <input
    type="checkbox"
    checked={item.completed}
    onChange={() => handleCheckToggle(index)}
    className="w-5 h-5 accent-green-500 cursor-pointer"
  />
  <span
    className={`text-lg ${
      item.completed
        ? 'line-through text-gray-400'
        : 'text-white font-bold'
    }`}
  >
    {item.text}
  </span>
  {item.completed && (
    <span className="ml-2 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
      Done
    </span>
  )}
  {!item.completed && (
    <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
      Due
    </span>
  )}
</div>

              <button
                onClick={() => handleDelete(index)}
                className="text-red-400 hover:text-red-600 transition cursor-pointer"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  )
}

export default Todofield
