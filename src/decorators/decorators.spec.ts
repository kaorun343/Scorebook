'use strict';
import { event, prop, watch }  from './decorators';
declare var expect: Chai.ExpectStatic;

describe('decorators', function() {

    beforeEach(function() {
        this.Test = class {
            testMethod() {
                let a = 1;
                a += 1;
            }
            testProperty = true;
        };
        this.test = new this.Test();;
    });

    describe('event decorator', function() {

        it('eventプロパティがあればそこに追加する', function() {
            this.Test.events = {};
            event('event:test')(this.Test.prototype, 'testMethod');

            expect(this.Test.events).to.have.property('event:test');
        });

        it('eventプロパティがない時は追加する', function() {
            event('event:test')(this.Test.prototype, 'testMethod');

            expect(this.Test).to.have.property('events');
            expect(this.Test.events).to.have.property('event:test');
        });

    });

    describe('prop decorator', function() {

        before(function() {
            this.PropOption = {
                type: Number,
                default: 1,
                required: false,
                twoWay: false,
                validator: () => true
            };
        });

        it('propsプロパティがある時はそこに追加する', function() {
            this.PropOption.props = {};
            prop(this.PropOption)(this.Test.prototype, 'testProperty');

            expect(this.Test.props).to.have.property('testProperty');
            expect(this.Test.props.testProperty).to.equal(this.PropOption);
        });

        it('propsプロパティがない時は追加する', function() {
            prop(this.PropOption)(this.Test.prototype, 'testProperty');

            expect(this.Test).to.have.property('props');
            expect(this.Test.props).to.have.property('testProperty');
            expect(this.Test.props.testProperty).to.equal(this.PropOption);
        });

    });

    describe('watch decorator', function() {

        before(function() {
            this.path = 'test.path';
        });

        it('watchプロパティがある時はそこに追加する', function() {
            this.Test.watch = {};
            watch(this.path)(this.Test.prototype, 'testMethod');

            expect(this.Test.watch).to.have.property(this.path);
            expect(this.Test.watch[this.path]).to.equal('testMethod');
        });

        it('watchプロパティがない時は追加する', function() {
            watch(this.path)(this.Test.prototype, 'testMethod');

            expect(this.Test).to.have.property('watch');
            expect(this.Test.watch).to.have.property(this.path);
            expect(this.Test.watch[this.path]).to.equal('testMethod');
        });

    });

});
