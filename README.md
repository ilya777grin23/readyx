# Readyx
## INTERFACE
```ts
abstract class ReadyxStore {
    // Vars
    protected state: State;
    protected listeners: Listener[];
    protected reducer: (state: State, action?: Action) => any;

    // Functions
    abstract getState(): State;
    abstract dispatch(action: Action): void;
    abstract subscribe(listener: Listener): void;
}
```
## CLASS
```ts
class Readyx extends ReadyxStore {
    constructor(reducer: (state: State, action?: Action) => any, initialState?: State) {
        super();

        if (initialState) this.state = initialState;

        this.reducer = reducer.bind(this);
        this.listeners = [];
    }

    public getState(): State {
        return this.state;
    }

    private deepEqual(firstOne: State, secondOne: State): boolean {
        let isEqual: boolean = true;

        for (let key in firstOne) {
            if (typeof firstOne[key] === 'object') {
                isEqual = isEqual && this.deepEqual(firstOne[key], secondOne[key]);
            } else {
                if (firstOne[key] && secondOne[key]) isEqual = isEqual && firstOne[key] === secondOne[key];
                else isEqual = isEqual && firstOne === secondOne;
            }

            if (!isEqual) return false;
        }

        return isEqual;
    }

    public dispatch(action?: Action): void {
        const { reducer, deepEqual, state } = this;

        const newState = reducer(state, action);
        if (!deepEqual(newState, state)) {
        this.state = { ...newState };
        this.listeners.forEach((listener: Listener) => listener());
        }
    }

    public subscribe(listener: Listener): void {
        this.listeners.push(listener);
    }
}
```
### Суть
Сначала мы создаем сам экземпляр вида:
```ts
import { Readyx } from './Readyx';
const newReadyxStorage: Readyx = new Readyx(
    // Reduces
    reducer: (state: State, action: Action) => any,
    // Initialize state
    state: State | any
);
```
После, можно назначить слушатель (то, что происходит перед изменением состояние):
```ts
newReadyxStorage.on(listener: Listener);
```
И после, вызывать последующие изменения состояний вида:
```ts
newReadyxStorage.action(action: Action);
```
