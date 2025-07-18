import React, { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Todofield = () => {  
  const [inputChange, setInputChange] = useState('')
  const [todoArray, setTodoArray] = useState([])
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate()
  const totalWork = todoArray.length;
  const workCompleted = todoArray.filter(item=>{
   return item.completed === true;
  }).length;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

// Close menu on outside click
useEffect(() => {
  const handler = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  document.addEventListener('mousedown', handler);
  return () => document.removeEventListener('mousedown', handler);
}, []);

  let percentage =(workCompleted/totalWork)*100;
  if(todoArray.length === 0)
    percentage = 0;
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
  const handleEdit = (index)=>{
    setEditIndex(index)
    setEditValue(todoArray[index].text)
    setIsEditModalOpen(true)
  }
  function saveEdit(){
       const upDateAraay = [...todoArray]
       upDateAraay[editIndex].text = editValue
       setTodoArray(upDateAraay)
       setIsEditModalOpen(false)
       toast.success('Todo updated!');

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
    <div className="absolute top-4 right-6 z-50" ref={menuRef}>
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="text-white hover:text-gray-300 transition"
  >
    <FontAwesomeIcon icon={faUser} className="text-[28px] text-white cursor-pointer" />

  </button>

 {menuOpen && (
  <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-lg shadow-lg py-2 w-40 animate-fadeIn">
    <button className="flex justify-center w-full text-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
      Sign In
    </button>
    <hr className="border-t border-gray-600 my-1 mx-2" />
    <button className="flex justify-center w-full text-center px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={()=>{
      navigate('/signup')
    }}>
      Sign Up
    </button>
    <hr className="border-t border-gray-600 my-1 mx-2" />
    <button className="flex justify-center w-full text-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
      Logout
    </button>
  </div>
)}


</div>

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
            className="flex-1 p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
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
<div className="flex items-center space-x-3">
  <button
    onClick={() => handleEdit(index)}
    className="text-blue-400 hover:text-blue-600 transition cursor-pointer"
  >
    <FontAwesomeIcon icon={faPenToSquare} />
  </button>

  <button
    onClick={() => handleDelete(index)}
    className="text-red-400 hover:text-red-600 transition cursor-pointer"
  >
    <FontAwesomeIcon icon={faTrash} />
  </button>
</div>

            </li>
          ))}
        </ul>
      </div>
     {isEditModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-gray-800 text-white p-6 rounded-xl w-full max-w-md shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none mb-4"
      />
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setIsEditModalOpen(false)}
          className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={saveEdit}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  )
}

export default Todofield
