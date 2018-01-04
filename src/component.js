import { createStore } from 'redux';
import { counter, todoApp } from './reducer';
import ReactDom from 'react-dom';
import React, { Component } from 'react';

const Counter = ({ count, increment, decrement }) => (
    <div>
        <h1>{ count }</h1>
        <button onClick={ increment }>+</button>
        <button onClick={ decrement }>-</button>
    </div>
);

let nextTodoId = -1;
class TodoApp extends Component {
    render() {
        return (
            <div>
                <input ref={ node => { this.input = node; }}/>
                <button onClick={ () => { 
                    this.props.addTodo(this.input.value);
                    this.input.value = '';
                }}>
                    Add Todo
                </button>
                <ul>
                    { this.props.todos.map(todo => <li key={ todo.id }>{ todo.text }</li>) }
                </ul>
            </div>
        );
    }
}

const app = document.getElementById('root');

const render = () => {
    ReactDom.render(
        <div>
            <Counter 
                count={ counterStore.getState() }
                increment={ () => { counterStore.dispatch({type: 'INCREMENT'}); } }
                decrement={ () => { counterStore.dispatch({type: 'DECREMENT'}); } }
            />
            <TodoApp 
                addTodo={ text => todoAppStore.dispatch({
                    type: 'ADD_TODO',
                    text,
                    id: nextTodoId++
                })}
                todos={ todoAppStore.getState().todos }
            />
        </div>,
        app
    );
};

const counterStore = createStore(counter);
const todoAppStore = createStore(todoApp);
counterStore.subscribe(render);
todoAppStore.subscribe(render);
render();
