import test from 'ava';
import { counter } from './reducer';
import { addCounter, removeCounter, incrementCounter } from './reducer';
import { toggleTodo } from './reducer';
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

test('Test Toggle Todo', t => {
    let objectBefore = {
        id: 0,
        text: 'Example',
        completed: false
    };

    let objectAfter = {
        id: 0,
        text: 'Example',
        completed: true
    };
    t.deepEqual(toggleTodo(objectBefore), objectAfter);
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
