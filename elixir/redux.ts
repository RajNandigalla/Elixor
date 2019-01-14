function createBox(reducer) {
    let currentState;
    let listener = [];

    function dispath(action) {
        currentState = reducer(currentState, action);
        listener.forEach(item => item());
    }

    function getState() {
        // console.log(listener);
        return currentState;
    }

    function subscribe(locallistener) {
        listener.push(locallistener);
        return function unsubscribe() {
            var index = listener.indexOf(listener)
            listener.splice(index, 1)
        }
    }

    return {
        dispath,
        getState,
        subscribe
    }

}

function actiion(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }

}

var inst = createBox(actiion);

inst.subscribe(function ex() {
    console.log(inst.getState());
});
inst.dispath({ type: 'INIT' });
inst.dispath({ type: 'INCREMENT' });

inst.subscribe(function ex() {
    console.log('second', inst.getState());
});

inst.dispath({ type: 'DECREMENT' });
inst.dispath({ type: 'INCREMENT' });

