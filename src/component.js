import { createStore } from 'redux';
import { counter, todoApp } from './reducer';
import ReactDom from 'react-dom';
import React, { Component } from 'react';

const Counter = ({ count, increment, decrement }) => (
    <div>
        <h1>{ count }</h1>
        <button onClick={ () => { counterStore.dispatch({type: 'INCREMENT'}); }}>+</button>
        <button onClick={ () => { counterStore.dispatch({type: 'DECREMENT'}); }}>-</button>
    </div>
);

let nextTodoId = -1;
class TodoApp extends Component {
    render() {
        return (
            <div>
                <input ref={ node => { this.input = node; }}/>
                <button onClick={ () => { 
                    todoAppStore.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    })
                    this.input.value = '';
                }}>
                    Add Todo
                </button>
                <ul>
                    { this.props.todos.map(todo => <li 
                        key={ todo.id }
                        onClick={ () => {
                            todoAppStore.dispatch({
                                type: 'TOGGLE_TODO',
                                id: todo.id
                            })
                        }}
                        style={{
                            textDecoration:
                                todo.completed ? 
                                    'line-through':
                                    'none'
                        }}>
                            { todo.text }
                    </li>) }
                </ul>
            </div>
        );
    }
}

const app = document.getElementById('root');

const render = () => {
    ReactDom.render(
        <div>
            <Counter count={ counterStore.getState() } />
            <TodoApp todos={ todoAppStore.getState().todos } />
        </div>,
        app
    );
};

const counterStore = createStore(counter);
const todoAppStore = createStore(todoApp);
counterStore.subscribe(render);
todoAppStore.subscribe(render);
render();
