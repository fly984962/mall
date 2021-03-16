import axios from 'axios'
import music from './music'

const musicApi = {
  getSearch(code) { // 网易云歌曲搜索
    return  axios.get(music.musicUrlTwo + music.musicSearch + code)
  },
  getPlay(id) { // 网易云歌曲播放
    return  axios.get(music.musicUrlTwo + music.musicPlay + id)
  },
  getLyric(id) { // 网易云歌曲歌词
    return  axios.get(music.musicUrlTwo + music.musicLyric + id)
  }
}

export default musicApi