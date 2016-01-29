declare module 'vuex' {
    export class Store<S, A> {
        constructor(obj: {state?: S, mutations?: any, actions?: A});
        state: S;
        dispatch(...args: any[]): void;
        actions: A;
    }

    export function install(...args: any[]): any;

    export default {
        Store,
        install
    }
}
