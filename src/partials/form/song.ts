import { Song } from '../../data/song'
import { Part } from '../../data/part'
import { Video } from '../../data/video'

export interface SongForm {
  title: string
  submit(): void
  song: Song
  grades: string[]
  types: string[]
  parts: Part[]
  removePart(part: Part): void
  addPart(): void
  enableRemovePart: boolean
  videos: Video[]
  removeVideo(video: Video): void
  addVideo(): void
}
