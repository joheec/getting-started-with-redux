const counter = (state=0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

const addCounter = list => (
    [
        ...list,
        0
    ]
);

const removeCounter = (list, index) => (
    [
        ...list.slice(0, index),
        ...list.slice(index+1)
    ]
);

const incrementCounter = (list, index) => (
    [
        ...list.slice(0, index),
        list[index]+1,
        ...list.slice(index+1)
    ]
);

const toggleTodo = todo => (
    {
        ...todo,
        completed: !todo.complete
    }
);

const todo = (state={}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (action.id !== state.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            }
    }
}

const todos = (state=[], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const visibilityFilter = (state='SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY':
            return action.visibility;
        default:
            state;
    }
};

const todoApp = (state={}, action) => {
    return {
        todos: todos(state, action),
        visibilityFilter: visibilityFilter(state, action)
    }
};

export { counter, addCounter, removeCounter, incrementCounter, todos, todoApp };
