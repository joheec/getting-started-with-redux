import ReactDom from 'react-dom';
import React from 'react';
import { createStore } from 'redux';

export const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

const store = createStore(counter);

const Counter = ({ count, increment, decrement }) => (
    <div>
        <h1>{ count }</h1>
        <button onClick={ increment }>+</button>
        <button onClick={ decrement }>-</button>
    </div>
);

const app = document.getElementById('root');

const render = () => {
    ReactDom.render(
        <Counter 
            count={ store.getState() }
            increment={ () => { store.dispatch({type: 'INCREMENT'}); } }
            decrement={ () => { store.dispatch({type: 'DECREMENT'}); } }
        />,
        app
    );
};

store.subscribe(render);
render();
