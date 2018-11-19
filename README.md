# Readyx
## INTERFACE
```ts
type State = { [keys: string]: any; };
type Action = string | number;
type Listener = (action?: Action, state?: State) => void;
type Reducer = (state: State, action: Action) => State;

abstract class ReadyxStore {
    abstract action(action: Action): ThisType<any>;
    abstract on(action: Action, listener: Listener): ThisType<any>;
}
```
## Суть
Сначала мы создаем сам экземпляр вида:
```ts
import { Readyx } from './Readyx';
const newReadyxStorage: Readyx = new Readyx(
    // Reduces
    reducer: (state: State, action: Action) => any,
    // Initialize state
    state: State
);
```
После, можно назначить слушатель (то, что происходит перед изменением состояние):
```ts
newReadyxStorage.on(action: Action, listener: Listener);
```
И после, вызывать последующие изменения состояний вида:
```ts
newReadyxStorage.action(action: Action);
```
## Фичи
### Чейнинг
```ts
const store = new Readyx(reducer, { isVisible: true });
store
    .on('click', (state) => {
        document.body.style.overflow = state.isVisible;
    })
    .on('close', (state, action) => {
        document.body.classList.toggle(`page_action_${action}`, state.isVisible)
    })
    .action('click')
    .action('close');
```
### Упорядоченный событийный цикл
```ts
const reducer = (state, action) => {
    console.log(state.count);
    if (action === '4') state.count -= 4;
    return state;
};

const store = new Readyx(, { count: 0 });
store
    .on('4', (state, action) => {
        console.log(state.count);
        state.count += Number(action);
    })
    .on('4', (state, action) => {
        console.log(state.count);
        state.count -= Number(action) / 2;
    })
    .action('4');
// Output:
// 0 -> 4 -> 2
```
