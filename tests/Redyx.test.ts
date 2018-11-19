import { Readyx } from '../Readyx';
import { expect } from 'chai';

function reducer(resAction: any, resState: any) {
    return function(state: any, action: any): any {
        expect(resAction).equals(action);
        expect(resState).to.deep.equal(state);
        return state;
    }
}

describe('Readyx', () => {
    it('should return started state', () => {
        const newReducer = reducer('test', { type: 'test' });
        const store = new Readyx(newReducer, { type: 'test' });

        store.action('test');
    });

    it('state should mutate after event', () => {
        const newReducer = reducer('test', { type: 'test' });
        const store = new Readyx(newReducer, { type: 'assertingString' });

        store.on('test', (action, state) => state ? state.type = 'test' : null);
        store.action('test');
    });
});
