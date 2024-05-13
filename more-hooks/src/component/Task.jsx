import React, { useReducer, useRef } from 'react';

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: state.length, text: action.payload, hidden: false }];
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload ? { ...task, hidden: !task.hidden } : task
      );
    default:
      return state;
  }
};

const Task = () => {
  const inputRef = useRef();
  const getBackButtonRef = useRef();
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const addTask = () => {
    const newTask = inputRef.current.value.trim();
    if (newTask !== '') {
      dispatch({ type: 'ADD_TASK', payload: newTask });
      inputRef.current.value = '';
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  const toggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const scrollToInput = () => {
    inputRef.current.focus();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      getBackButtonRef.current.style.display = 'block';
    } else {
      getBackButtonRef.current.style.display = 'none';
    }
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder=" "
        onKeyPress={handleKeyPress}
        style={{ marginBottom: '20px', fontWeight: 'bold' }}
      />
      <div>
        {tasks.map(task => (
          <div key={task.id} style={{ marginBottom: '10px', padding: '20px', backgroundColor: '#ffeecc', width: '1200px' }}>
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
              {task.hidden ? <span>The content is hidden</span> : <span>{task.text}</span>}
            </div>
            <div>
              <button onClick={() => toggleTask(task.id)} style={{ fontSize: '12px' }}>
                Toggle
              </button>
            </div>
          </div>
        ))}
      </div>
      <button ref={getBackButtonRef} onClick={scrollToInput} style={{ display: 'none', position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: '999' }}>
        Get Back
      </button>
    </div>
  );
};

export default Task;