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

const Todo = ({ onClick, id, completed, text}) => (
    <li 
        onClick={onClick}
        style={{
            textDecoration:
                completed ? 
                    'line-through':
                    'none'
        }}>
            { text }
    </li> 
);

const TodoList = ({ onTodoClick, todos }) => (
    <ul>
        { todos.map( todo => <Todo 
            key={todo.id}
            onClick={() => onTodoClick(todo.id)}
            {...todo}
        />) }
    </ul>
);

const AddTodo = ({onAddTodo}) => {
    let input;
    return <div>
        <input ref={ node => { input = node; }}/>
        <button onClick={ () => { 
            onAddTodo(input.value);
            input.value = '';
        }}>
            Add Todo
        </button>
    </div>
};

const Filters = ({visibilityFilter}) => (
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
);

let nextTodoId = -1;
const TodoApp = ({todos, visibilityFilter}) => (
    <div>
        <AddTodo onAddTodo={input => {
            todoAppStore.dispatch({
                type: 'ADD_TODO',
                text: input,
                id: nextTodoId++
            });
        }}/>
        <Filters visibilityFilter={visibilityFilter} />
        <TodoList 
            todos={getVisibleTodos(todos, visibilityFilter)} 
            onTodoClick= { id => {
                todoAppStore.dispatch({
                    type: 'TOGGLE_TODO',
                    id
                });
            }}
        />
    </div>
);

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
