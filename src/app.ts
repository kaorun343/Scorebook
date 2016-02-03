'use strict';
import Component from 'vue-class-component';
import Songs from './components/songs/songs';
import store from './store/store';

@Component({
    template: require('./app.html'),
    components: { Songs: Songs }
})
export default class App {
    text: string;

    data(): any {
        return {
            text: ''
        };
    }

    search() {
        if (this.text.length) {
            store.actions.search(this.text);
        }
    }
}
