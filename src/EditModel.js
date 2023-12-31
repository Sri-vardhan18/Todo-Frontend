import React, { useState, useEffect } from "react";
import axios from "axios";

const EditModal = ({ isOpen, onClose, taskId, initialTask, onEdit }) => {
  const [editedTask, setEditedTask] = useState(initialTask);

  useEffect(() => {
    setEditedTask(initialTask);
  }, [initialTask]);

  const handleEdit = async () => {
    
    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`, {
        task: editedTask,
      });
      
      onEdit();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div  style={{ display: isOpen ? "block" : "none", position: "absolute", 
    top: "50%", left: "50%", 
    transform: "translate(-50%, -50%)", 
    padding: "20px", background: "white", borderRadius: "5px", 
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",  width: "300px", height:"100px", margin: 'auto'}}>
      <div>
        <label>Edit Task:</label>
        <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)}  style={{marginLeft:'5px'}}/>
      </div>
      <div style ={{marginTop : '10px',}}>
        <button onClick={handleEdit}>Submit</button>
        <button onClick={onClose} style ={{marginLeft:'5px'}}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal
