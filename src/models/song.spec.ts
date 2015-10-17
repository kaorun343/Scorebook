import {Song, SongStorage} from './song'
declare var expect: Chai.ExpectStatic

describe('Song', function() {

  it('SongStorageはクラスである', function() {
    expect(SongStorage).instanceof(Function)
  })

  it('Songはクラスである', function() {
    expect(Song).instanceof(Function)
  })
})
