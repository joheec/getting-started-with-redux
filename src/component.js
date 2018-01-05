import { createStore } from 'redux';
import { counter, todoApp } from './reducer';
import ReactDom from 'react-dom';
import React, { Component } from 'react';

const counterStore = createStore(counter);
const todoAppStore = createStore(todoApp);

class Counter extends Component {
    componentDidMount() {
        this.unsubscribe = counterStore.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const state = counterStore.getState();
        return <div>
            <h1>{ state }</h1>
            <button onClick={ () => { counterStore.dispatch({type: 'INCREMENT'}); }}>+</button>
            <button onClick={ () => { counterStore.dispatch({type: 'DECREMENT'}); }}>-</button>
        </div>;
    }
}

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

const Link = ({ onClick, children, active }) => {
    if (active) {
        return <span>{ children }</span>;
    }
    return <a href='#' onClick={e => {
        e.preventDefault();
        onClick();
    }}>{ children }</a>;
};

class FilterLink extends Component {
    render() {
        const { filter, children } = this.props;
        const { visibilityFilter } = todoAppStore.getState();
        return <Link 
            onClick={() => {
                todoAppStore.dispatch({
                    type: 'SET_VISIBILITY',
                    filter
                });
            }}
            children={children}
            active={filter === visibilityFilter}
        />;
    }
};

const Filters = () => (
    <p>
        Show: {' '}
        <FilterLink filter={'SHOW_ALL'} >All</FilterLink>
        {' '}
        <FilterLink filter={'SHOW_ACTIVE'} >Active</FilterLink>
        {' '}
        <FilterLink filter={'SHOW_COMPLETED'} >Completed</FilterLink>
    </p>
);

let nextTodoId = -1;
class TodoApp extends Component { 
    componentDidMount() {
        this.unsubscribe = todoAppStore.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { todos, visibilityFilter } = todoAppStore.getState();
        return <div>
            <AddTodo onAddTodo={input => {
                todoAppStore.dispatch({
                    type: 'ADD_TODO',
                    text: input,
                    id: nextTodoId++
                });
            }}/>
            <Filters />
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
    }
}

const app = document.getElementById('root');

ReactDom.render(
    <div>
        <Counter />
        <TodoApp />
    </div>,
    app
);
