/*
- import createStore
- render state
- event listener for increment
*/

import test from 'ava';
import { counter } from './001-counter-reducer';

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
