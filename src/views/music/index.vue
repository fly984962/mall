<template>
  <div id="musicBox">
    <el-card class="box-card">
      <el-input placeholder="请输入内容" v-model="musicSearch" size="mini" @input="sousuo"></el-input>
        <div v-for="(item,index) in musicData" :key="index">
          <li @click="muicePlay(item)" class="liRow">{{ item.name }}<span class="liSpan">演唱者：{{item.artists[0].name}}</span></li>
      </div>
      <div v-for="(item,index) in lyric" :key="index">
        <li style="user-select:none" :style="{'color': (index == currentRow ? 'red':'#000'),'font-size': (index == currentRow ? '16px':'12px;')}">{{ item.text }}</li>
      </div>
      <!-- <div class="progressSty">
        <div class="progressStyBox">
          <div class="x-mp3-progress" style="float:left;">
            <div class="x-now-progress" :style="{width: progress}"></div>
          </div>
          <div class="timerSty" style="float:left;">
            <span style="color:#fff;float:left;">{{ second2 }}:{{ minute2 }}</span>
            <span style="color:#fff;margin:0px 3px;float:left;">-</span>
            <span style="color:#fff;float:left;">{{ second }}:{{ minute }}</span>
          </div>
        </div>
      </div> -->
      <!-- {{ lyric }} -->
      <audio v-show="true" class="audioSty" id="musicMp3" @canplay="getDuration" @timeupdate="updateTime" ref="audio" :src="musicUrl" controls autoplay></audio>
    </el-card>
    <!-- <el-button @click="ssss">sssssss</el-button> -->
    <!-- {{ musicUrl }} -->
  </div>
</template>

<script>
import api from '../../api/index.js'
export default {
  data() {
    return {
      progress: '0%',
      second2: '00', // 歌曲分数
      minute2: '00',
      second: '00', // 歌曲分数
      minute: '00', // 歌曲秒数
      musicSearch: '', // 搜索框输入的内容
      musicData: [], // 搜索后存储数据的
      musicUrl: '', // 歌曲的地址
      lyric: [], // 歌词
      currentTime: '', // 获取audio钩子上的时间
      currentRow:'' // 监听audio钩子上的时间和数据上的时间进行对比来定位到该歌词
    }
  },
  watch: {
    musicSearch() { // 监听搜索是否有值
      if (this.musicSearch.length == 0) {
        this.musicData = []
      }
    },
    currentTime(a, b) { // 监听
      // console.log(a,parseInt(b))
      this.lyric.forEach((element, index) => {
        if (parseInt(b) == element.time) {
          this.currentRow = index; // 通过比较我们歌词属性里的时间与当前播放时间，来定位到该歌词
        }
      });
    },
  },
  methods: {
    changeProgress() {
      const musicMp3 = document.getElementById('musicMp3')
      const timer = setInterval(() => {
        const numbers = musicMp3.currentTime / musicMp3.duration
        let perNumber = (numbers * 100).toFixed(2)
        if (perNumber >= 100) {
          this.isStore = true
          this.progress = 0
          clearInterval(timer)
        }
        perNumber += '%'
        this.progress = perNumber
      }, 30)
    },
    sousuo() { // 搜索
      if (this.musicSearch) {
        api.getSearch(this.musicSearch).then(res => {
          if(res.status == 200) {
            console.log(res);
            this.musicData = res.data.result.songs
          }
        })
      }
    },
    muicePlay(val) { // 播放
      // console.log(val.id)
      this.lyric = [] // 点击播放时清空
      api.getPlay(val.id).then(res => { // 获取歌曲数据
        if(res.status == 200) {
          console.log('歌曲', res)
          this.musicData = []
          this.musicSearch = ''
          if (res.data.data[0].url) {
            this.musicUrl = res.data.data[0].url
            api.getLyric(val.id).then(res =>{ // 获取歌曲歌词
              // console.log('歌词', res);
              // this.lyric = res.data.lrc.lyric
              this.formatLyric(res.data.lrc.lyric)
              console.log('歌词',res.data.lrc.lyric)
              this.changeProgress()
            })
          } else {
            this.$message.error('暂无版权')
          }
        }
      })
    },
    formatLyric(text) {
      let arr = text.split("\n"); // 通过换行符“\n”进行切割
      let row = arr.length; //获取歌词行数
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; // 现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
        let temp_arr = temp_row.split("]"); // 我们可以通过“]”对时间和文本进行分离
        let text = temp_arr.pop(); // 把歌词文本从数组中剔除出来，获取到歌词文本了！
        //再对剩下的歌词时间进行处理
        temp_arr.forEach(element => {
          let obj = {};
          let time_arr = element.substr(1, element.length - 1).split(":"); // 先把多余的“[”去掉，再分离出分、秒
          let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); // 把时间转换成与currentTime相同的类型，方便待会实现滚动效果
          obj.time = s;
          obj.text = text;
          this.lyric.push(obj); // 每一行歌词对象存到组件的lyric歌词属性里
        });
      }
    },
    getDuration() { // 歌曲总时长
      // let s = parseInt(this.$refs.audio.duration)
      this.second = (Math.floor(parseInt(this.$refs.audio.duration) / 60)).toString().padStart(2, '0')
      this.minute = (parseInt(this.$refs.audio.duration) % 60).toString().padStart(2, '0')
      //  console.log("时间:" + Math.floor(s/60)+"分"+(s-Math.floor(s/60)*60)+"秒"); //此时可以获取到duration
      //  this.duration = this.$refs.audio.duration;
    },
    updateTime(e) { // 当前播放时间
      this.currentTime = e.target.currentTime;  //获取audio当前播放时间
      this.second2 = (Math.floor(parseInt(e.target.currentTime) / 60)).toString().padStart(2, '0')
      this.minute2 = (parseInt(e.target.currentTime) % 60).toString().padStart(2, '0')
    }
  }
}
</script>

<style lang="less">
#musicBox {
  .liRow {
    background: rgb(202, 201, 201);
    cursor:pointer;
    font-size: 16px;
    margin: 5px 0;
    .liSpan {
      font-size: 12px;
      margin-left: 8px;
    }
  }
  .progressSty {
    width: 100%;
    height: 60px;
    background: #333;
    position: relative;
    .progressStyBox{
      width: 100%;
      position: absolute;
      .x-mp3-progress{
        width: 60%;
        height: 6px;
        background: blue;
        overflow: hidden;
        .x-now-progress{
          transition: all .3s ease-in-out;
          height: 6px;
          background-color: red;
        }
      }
    }
  }
}

audio {
  width: 100%;
}


</style>