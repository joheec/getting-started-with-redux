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

const todo = (state=[], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
    }
};

export { counter, addCounter, removeCounter, incrementCounter, toggleTodo, todo };
