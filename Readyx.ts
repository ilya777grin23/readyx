type State = { [keys: string]: any; };
type Action = string | number;
type Listener = (action?: Action, state?: State) => void;
type Reducer = (state: State, action: Action) => State;

abstract class ReadyxStore {
    protected reducer: Reducer = () => ({});
    protected state: State = {};
    protected listeners: { [key in Action]: Listener[] } = {};
    abstract action(action: Action): ThisType<any>;
    abstract on(action: Action, listener: Listener): ThisType<any>;
}

export class Readyx extends ReadyxStore {
    constructor(reducer: Reducer, initialState?: State) {
        super();

        if (initialState) this.state = initialState;

        this.reducer = reducer.bind(this);
    }

    public action(action: Action) {
        const { reducer, state } = this;

        this.listeners[action] &&
            this.listeners[action].forEach((listener) => listener(action, state));

        this.state = reducer(state, action);

        return this;
    }

    public on(action: Action, listener: Listener) {
        // For answer from parent
        listener = listener.bind(this);
        if (!this.listeners[action]) this.listeners[action] = []

        this.listeners[action].push(listener);

        return this;
    }
}
