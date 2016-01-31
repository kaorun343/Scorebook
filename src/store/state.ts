'use strict';
import {grades} from '../constants/constants';

/**
 * パート（エレクトーンのみ）
 */
export class Part {
    /**
     * 上鍵盤があるかどうか
     */
    upper: boolean;
    /**
     * 下鍵盤があるかどうか
     */
    lower: boolean;
    /**
     * ペダル鍵盤があるかどうか
     */
    pedal: boolean;
    /**
     * リズム担当であるかどうか
     */
    rhythm: boolean;

    constructor() {
        this.upper = true;
        this.lower = true;
        this.pedal = true;
        this.rhythm = true;
    }
}

/**
 * 関連動画
 */
export class Video {
    /**
     * 動画のタイトル
     */
    title: string;
    /**
     * 動画のURLまたはID
     */
    url: string;

    constructor() {
        this.title = '';
        this.url = '';
    }
}

/**
 * 曲
 */
export class Song {
    /**
     * 一意なID
     */
    _id: string;
    /**
     * 曲のタイトル
     */
    title: string;
    /**
     * 紹介文
     */
    lead: string;
    /**
     * アーティスト
     */
    artist: string;
    /**
     * 発売年
     */
    year: number;
    /**
     * 発売月
     */
    month: number;
    /**
     * 掲載ページ
     */
    page: number;
    /**
     * ピアノパートがあるかどうか
     */
    piano: boolean;
    /**
     * 難易度
     */
    grade: string;
    /**
     * エレクトーンの台数
     */
    people: number;
    /**
     * エレクトーンの各パート
     */
    parts: Part[];
    /**
     * 関連動画
     */
    videos: Video[];

    constructor() {
        this.title = '';
        this.lead = '';
        this.artist = '';

        const date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;

        this.page = 1;
        this.grade = grades[0];
        this.people = 1;
        this.piano = false;

        this.parts = [new Part()];
        this.videos = [];
    }
}

export class State {
    /**
     * 検索結果を格納する
     */
    songs = [] as Song[];
    /**
     * 詳細表示をする曲
     */
    song = new Song();
    /**
     * 検索結果を取得中であるかどうか
     */
    loading = false;
    /**
     * 検索ボックスの文字列
     */
    searchtext = '';
    /**
     * モーダル画面が開いているかどうか
     */
    modals = {
        songs: false
    };
}
