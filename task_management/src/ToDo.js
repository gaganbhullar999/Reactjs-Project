import React, { useState } from 'react';
import Modal from 'react-modal';
import './ToDo.css';

Modal.setAppElement('#root');

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const openModal = (index = null) => {
    if (index !== null) {
      setTask(tasks[index].text);
      setIsEditing(true);
      setCurrentTaskIndex(index);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTask('');
    setIsEditing(false);
    setCurrentTaskIndex(null);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (isEditing) {
        const newTasks = tasks.map((taskItem, index) =>
          index === currentTaskIndex ? { ...taskItem, text: task } : taskItem
        );
        setTasks(newTasks);
      } else {
        setTasks([...tasks, { text: task, completed: false }]);
      }
      closeModal();
    }
  };

  const handleComplete = (index) => {
    const newTasks = tasks.map((taskItem, i) =>
      i === index ? { ...taskItem, completed: !taskItem.completed } : taskItem
    );
    setTasks(newTasks);
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div>
      <h1>Task Management</h1>
      <button onClick={() => openModal()}>Add Task</button>
      <ul>
        {tasks.map((taskItem, index) => (
          <li key={index} style={{ textDecoration: taskItem.completed ? 'line-through' : 'none' }}>
            {taskItem.text}
            <button onClick={() => handleComplete(index)}>
              {taskItem.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => openModal(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Task Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{isEditing ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={task}
            onChange={handleChange}
            placeholder="Enter task"
          />
          <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default ToDo;
