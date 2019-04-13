import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ADD_TODO, UPDATE_TODO } from './store/actions/todos';
import uuidv4 from 'uuid/v4';
import './assets/sass/style.sass';

const Todo = (props) => {
  const initialState = {
    task: '',
    status: 'todo'
  };
  const [todo, setTodo] = useState({
    ...initialState,
    id: uuidv4()
  });

  const counter = (status) => {
    return props.todos.reduce((accumulator, currentValue) => {
      if (currentValue.status === status) accumulator += 1;
      return accumulator;
    }, 0);
  }

  const createButton = (item, status) => (<button key={uuidv4()} onClick={() => props.UPDATE_TODO({ ...item, status })}>Mark as {status}</button>)

  return (
    <div className="todo-container">
      <div className="todo-container--input">
        <textarea 
          value={todo.task}
          placeholder="Type here..."
          onChange={
            event => setTodo({
              ...todo,
              task: event.target.value
            })
          }/>
        <button
          onClick={
            () => {
              if (!todo.isEditing) props.ADD_TODO(todo);
              else props.UPDATE_TODO(todo);

              setTodo({
                ...initialState,
                id: uuidv4
              });
            }
          }
        >
          { !todo.isEditing ? 'Add' : 'Update' } Todo
        </button>
      </div>
      <ul className="todo-list">
        {
          props.todos.map(item => (
            <li key={uuidv4()}>
              <p>{item.task} {item.status !== 'todo' ? (<span className={item.status}>{item.status}</span>) : null}</p>
              <div className="action-buttons">
                <button
                  onClick={() => setTodo({
                    ...item,
                    isEditing: true
                  })}
                >
                  Edit
                </button>
                {
                  ['doing', 'done'].map(status => {
                    if (status !== item.status) return createButton(item, status);
                    return null;
                  })
                }
              </div>
            </li>
          ))
        }
      </ul>
      <div className="todos-count-container">
        <p className="todos-count">{counter('todo')} todos found!</p>
        <p className="todos-count">{counter('doing')} doing todos found!</p>
        <p className="todos-count">{counter('done')} done todos found!</p>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps, {
  ADD_TODO,
  UPDATE_TODO
})(Todo);