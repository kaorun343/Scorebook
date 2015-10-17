declare var expect: Chai.ExpectStatic
import { SongsType, ActionType } from './ActionType'
import { Song, SongStorage } from '../models/song'
import { setSongsType, fetchSongs } from './songs'

describe('songs actions', function() {
  before(function() {
    SongStorage.memory = true
  })

  it('#setSongsTypeは曲のリストの種類を変更するアクションを作る', function() {
    var result = setSongsType(SongsType.ALBUM)
    expect(result.type).to.equal(ActionType.SET_SONGS_TYPE)
    expect(result.songsType).to.equal(SongsType.ALBUM)
  })

  it('#fetchSongsはコールバックを渡すとpromiseを返す', function(done) {
    let callback = sinon.spy((s: Song) => true)
    let dispatch = sinon.spy((action: any) => {
      expect(action).to.have.property("type")
      expect(action).to.have.property("callback")
      expect(action.callback).be.equal(callback)
      if(dispatch.calledTwice) {
        expect(action.type).be.equal(ActionType.RECEIVE_SONGS)
      } else if (dispatch.calledOnce) {
        expect(action.type).be.equal(ActionType.REQUEST_SONGS)
      }
    })

    var result = fetchSongs(callback)(dispatch)
    expect(result).to.have.property('then')
    result.then(() => {
      expect(dispatch.calledTwice).be.true
      done()
    })
  })
})
