'use strict';
import Component from 'vue-class-component';
import SongForm from './form';

@Component({
    template: require('./create.html'),
    components: { SongForm }
})
export default class Create {
    $refs: {
        form: SongForm
    };

    save() {
        //
    }
}
