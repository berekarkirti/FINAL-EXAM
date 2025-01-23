import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Todo.css";

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editTask, setEditTask] = useState(null);

    // get
    const getData = () => {
        axios.get("http://localhost:9090/user/getdata")
            .then((res) => 
            { 
                setTasks(res.data) 
            })
            .catch((error) => 
            { 
                console.log("Error :", error) 
            });
    };


    useEffect(() => {
        getData();
    }, []);

    // Add 
    const addTask = () => {

        const task = { title: newTask };

        axios.post("http://localhost:9090/user/postdata", task)
            .then((res) => 
            {
                setTasks([...tasks, { ...task, _id: res.data._id }]);
                setNewTask("");
            })
            .catch((error) => 
            { 
                console.log("Error adding task:", error) 
            });
    };

    // Delete a task
    const deleteTask = (id) => {
        axios.delete(`http://localhost:9090/user/deletedata/${id}`)
            .then(() => 
            {
                setTasks(tasks.filter(task => task._id !== id));
            })
            .catch((error) => 
                {
                    console.log("Error deleting task:", error)
                });
    };

    // Start editing a task
    const startEditing = (task) => {
        setEditTask(task);
        setEditTitle(task.title);
    };

    // Save the edited task
    const saveEdit = () => {
        if (editTitle === "") return;

        const updatedTask = { title: editTitle };
        axios.patch(`http://localhost:9090/user/patchdata/${editTask}`, updatedTask)
            .then(() => {
                
                tasks._id === editTask._id ? { ...tasks, title: editTitle } : tasks
                setEditTask(null);
                setEditTitle("");
            })
            .catch((error) => 
            {
                console.log("Error saving task:", error)
            });
    };

    return (
        <div className="container">
            <div className="title">
                <h1>TODO LIST TASK</h1>
            </div>

            {/* add karje */}
            <div className="input-container">
                <div className="add-input-filed">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Here Add Your Task"
                    />
                </div>
                <button onClick={addTask}>Add</button>
            </div>

            {/* dekhase */}
            <ul className="todotask">
                {tasks.map((task) => (
                    <li key={task._id} className="todotask-li">
                        
                        {editTask && editTask._id === task._id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                                <button onClick={saveEdit}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <span className="task-name">{task.title}</span>
                                <button className="update-btn">
                                    Edit
                                </button>
                            </div>
                        )}
                        <button className="delete-btn" onClick={() => deleteTask(task._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
