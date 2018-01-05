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

const FilterLink = ({ filter, currentFilter, children }) => {
    if (currentFilter === filter) {
        return <span>{ children }</span>;
    }
    return (
        <a href='#'
            onClick={e => {
                e.preventDefault();
                todoAppStore.dispatch({
                    type: 'SET_VISIBILITY',
                    filter
                });
            }}
        >
            { children }
        </a>
    );
};

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(todo => !todo.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(todo => todo.completed);
    }
};

let nextTodoId = -1;
class TodoApp extends Component {
    render() {
        const { todos, visibilityFilter } = this.props;
        const visibleTodos = getVisibleTodos(todos, visibilityFilter);
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
                <p>
                    Show: {' '}
                    <FilterLink 
                        filter={'SHOW_ALL'}
                        currentFilter={visibilityFilter}
                    >
                        All
                    </FilterLink>
                    {' '}
                    <FilterLink 
                        filter={'SHOW_ACTIVE'}
                        currentFilter={visibilityFilter}
                    >
                        Active
                    </FilterLink>
                    {' '}
                    <FilterLink 
                        filter={'SHOW_COMPLETED'}
                        currentFilter={visibilityFilter}
                    >
                        Completed
                    </FilterLink>
                </p>
                <ul>
                    { visibleTodos.map(todo => <li 
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
            <TodoApp {...todoAppStore.getState()} />
        </div>,
        app
    );
};

const counterStore = createStore(counter);
const todoAppStore = createStore(todoApp);
counterStore.subscribe(render);
todoAppStore.subscribe(render);
render();
