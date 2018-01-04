import test from 'ava';
import { counter } from './reducer';
import { addCounter, removeCounter, incrementCounter } from './reducer';
import { todo } from './reducer';

test('Test Increment', t => {
    t.is(counter(0, {type: 'INCREMENT'}), 1)
});

test('Test Decrement', t => {
    t.is(counter(0, {type: 'DECREMENT'}), -1)
});

test('Test Current State', t => {
    t.is(counter(0, {type: 'UNKNOWN ACTION'}), 0)
});

test('Test Initial State', t => {
    t.is(counter(undefined, {type: 'INCREMENT'}), 1)
});

test('Test Adding a Counter', t => {
    let listBefore = [0, 10, 20];
    let listAfter = [0, 10, 20, 0];

    t.deepEqual(addCounter(listBefore), listAfter);
});

test('Test Remove a Counter', t => {
    let listBefore = [0, 10, 20];
    let listAfter = [0, 20];

    t.deepEqual(removeCounter(listBefore, 1), listAfter);
});

test('Test Increment Counter', t => {
    let listBefore = [0, 10, 20];
    let listAfter = [0, 11, 20];

    t.deepEqual(incrementCounter(listBefore, 1), listAfter);
});

test('Test Add Todo', t => {
    let action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Example'
    };

    let arrayBefore = [];
    let arrayAfter = [
        {
            id: 0,
            text: 'Example',
            completed: false
        }
    ];

    t.deepEqual(todo(arrayBefore, action), arrayAfter);
});

test('Test Toggle Todo', t => {
    let action = {
        type: 'TOGGLE_TODO',
        id: 1
    };

    let arrayBefore = [
        {
            id: 0,
            text: 'Learn redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: false
        }
    ];

    let arrayAfter = [
        {
            id: 0,
            text: 'Learn redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: true
        }
    ];

    t.deepEqual(todo(arrayBefore, action), arrayAfter);
});
