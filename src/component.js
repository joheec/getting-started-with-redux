import { createStore } from 'redux';
import { counter } from './reducer';
import ReactDom from 'react-dom';
import React from 'react';

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

const store = createStore(counter);
store.subscribe(render);
render();
