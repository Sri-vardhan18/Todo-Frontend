import React, { useState, useEffect } from "react";
import axios from "axios";
import EditModal from "./EditModel";
import SearchBar from "./SearchBar";

const TodoList = () => {
  const [Todo, setTodo] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  

  const AddTodo = async () => {
    try {
      await axios.post("http://localhost:5000/add", { task: Todo });
      fetchtodos();
      setTodo(""); // Set an empty string to clear the input field
    } catch (e) {
      console.error(e);
    }
  };

  // const fetchtodos = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/tasks');
  //     const result = response.data;

  //     // Spread the previous tasks and add the new result to it
  //     setTasks((prevTasks) => [...prevTasks, result]);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  const fetchtodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      const result = response.data;

      // Check if the result is an array or extract the relevant property if needed
      const tasksArray = Array.isArray(result) ? result : result.tasks;

      setTasks(tasksArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchtodos();
  }, []);

  const handleDelete = async (taskId) => {
    console.log("taskId", taskId)
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      fetchtodos();
    } catch (error) {
      console.error(error);
    }
  };  

  const handleEdit = (taskId) => {
    setEditTaskId(taskId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditTaskId(null);
  };

  const handleUpdate = async () => {
    fetchtodos();
    handleCloseModal();
  };
  

  

  return (
    <div>
      {/* <SearchBar/> */}
    <div className=" container">
      <div className="searchbar">
        <input
          type="text"
          placeholder="enter name "
          value={Todo}
          onChange={(e) => setTodo(e.target.value)}
          className="search"
        />
        <button onClick={AddTodo}>Add</button>
      </div>

      <div className="listitems">
        {tasks.map((item) => (
          <div key={item.id} className="Listrows">
            {item.task} 
            
            <span  >
            <span >
            <button style={{ marginRight: "5px" }} onClick={() => handleEdit(item.id)}>
              Edit
            </button>
            </span>
            <span>
            <button onClick={()=>handleDelete(item.id)}>
              Delete
            </button>
            </span>
            </span>
           

          </div>
        ))}
      </div>
      <EditModal
        isOpen={showModal}
        onClose={handleCloseModal}
        taskId={editTaskId}
        initialTask={tasks.find((task) => task.id === editTaskId)?.task || ""}
        onEdit={handleUpdate}
      />
    </div>
    </div>
  );
};

export default TodoList;
