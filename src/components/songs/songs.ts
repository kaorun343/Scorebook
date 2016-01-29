'use strict';
import VueComponent = require('vue-class-component');
import { Data, prop } from 'vue-property-decorator';
import { Cell } from './cell';

@VueComponent
@Data(() => ({
  loading: false,
  songs: [] as any[]
}))
export class Songs {
    static template = require('./songs.html');
    static components = { Cell };

    @prop(Boolean)
    modal: boolean;

    loading: boolean;
    songs: any[];

    load() {
      this.loading = true;
      setTimeout(() => {
        this.songs = this.songs.concat([
          {
            title: '双頭の鷲の旗の下に',
            artist: 'ワーグナー',
            lead: 'ハプスブルグ王朝のオーストリア・ハンガリー帝国を謳った曲'
          },
          {
            title: 'アメリカン・パトロール',
            artist: 'ミーチャム',
            lead: 'アメリカ西部の民謡'
          },
          {
            title: '星条旗よ永遠なれ',
            artist: 'スーザ',
            lead: 'アメリカ合衆国の公式行進曲'
          }
        ]);
        this.loading = false;
      }, 500);
    }

    close() {
      this.modal = false;
    }
}
