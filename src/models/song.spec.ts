import {Song} from './song'
declare var expect: Chai.ExpectStatic

describe('Song', function() {
  it('Songはクラスである', function() {
    expect(Song).instanceof(Function)
  })
})
