<template>
  <div class="bgm-slide">
  <!-- 배경음악 검색 -->
  <form @submit.prevent="onSubmit" ref="fontSearch" id="frm" name="frm" method="GET" enctype="application/x-www-form-urlencoded" action="./">
    <input type="text" class="bgm search" placeholder="배경음악 검색" v-model="bgmSearch">
  </form>
    <!-- 카테고리 -->
    <div class="bgm cate">
      <ul>
        <li @click="all">전체</li>
        <li>cate1</li>
        <li>cate2</li>
        <li>cate3</li>
        <li>cate4</li>
      </ul>
    </div>
    <div class="total"> 전체 ( <div class="total-num">{{total}}</div> )</div>
    <!-- 배경음악 리스트 -->
    <ul class="list-box">
        <!--<li :class="{active: currentBgm == 1}">-->
        <li class="bgm-list" v-for="(audio, $index) in caudios" :key="$index">
          <span class="apply">적용중</span>
            <div class="bgm-img">
              <a class="play-bgm" @click="audio.isPlaying? pause($index, audio) : play($index, audio)">재생</a>
              <a class="add-bgm" @click="listup($index, audio)">추가</a>
            </div>
            <ul class="list-title">
                <li>{{audio.name}}</li>
                <li>{{audio.artist}}</li>
                <li>{{audio.currentTime }} / {{audio.duration }}</li>
            </ul>
            <div class="thum" :style="{ backgroundImage: `url(${audio.cover})` }"></div>
        </li>
    </ul>
  </div>
</template>

<script>
import audios from '@/assets/js/audio.js'

export default {
  name: 'BGMSlide',
  data(){
    return{
      wavesurfer: null,
      currentBgm: 0,
      listAdd:0,
      i:0,
      isTimerPlaying: false,
      currentTrack: null,
      currentTrackIndex: 0,
      duration: null,
      currentTime: null,
      caudios:[],
      imgName: 'headset-gray',
      current: {},
      audio: null,
      total:0,
      bgmSearch:""
    }
  },
  created(){
    for(let i=0; i<audios.lists.length; i++){
      let vm = this;
      this.currentTrack = audios.lists[0].file
      // this.audio = new Audio();
      // this.audio.src = this.currentTrack.source;
      audios.lists[i].file.ontimeupdate = function() {
        vm.generateTime();
      };
      audios.lists[i].file.onloadedmetadata = function() {
        vm.generateTime();
      };
    }
    this.total=audios.lists.length
    this.caudios=audios.lists
    // console.log(this.audios.length);
    // console.log(this.adios);
    },
  methods:{
    //카테고리 전체보기
     all(){
      this.caudios=audios.lists.filter(function(d,n,all){//새로운 배열에 filter걸기
          return d;
      });
      this.total=this.caudios.length
    },
    //검색
    onSubmit(){
      if(this.bgmSearch==""){
        alert("검색어를 입력하세요.");
        this.$refs.fontSearch.focus();
        return false;
      }
      else{
        let e=this.bgmSearch
        //폰트 이름 모두 소문자로 
        for(let i=0; i<audios.lists.length; i++){
          audios.lists[i].name=audios.lists[i].name.toLowerCase()
        }
        //검색 대소문자 관계없이 가능하게
        this.caudios=audios.lists.filter(function(d,n,all){
            let z=d.name.indexOf(e);
            if(z!=-1){
                return d;
            }
        });
        this.total=this.caudios.length
      }
    },
    play (e, audio) {
      e = e+1;
      console.log(audio);
      const playBgm = document.querySelector('.list-box .bgm-list:nth-of-type('+e+') .play-bgm');
      audio.isPlaying = true;

      console.log(audio.file);

      audio.file.play(); 
      playBgm.classList.add('active');
    },
    pause (e, audio) {
      e = e+1;
      const playBgm = document.querySelector('.list-box .bgm-list:nth-of-type('+e+') .play-bgm');
      audio.isPlaying = false;
      audio.file.pause();
      playBgm.classList.remove('active');
      // this.wavesurfer.pause()
    },
    
   //음악 리스트 추가 -> 타임라인 추가1
    listup (e, audio) {
      e=e+1;
      const li = document.querySelector('.list-box .bgm-list:nth-of-type('+e+')');
      const addBgm = document.querySelector('.list-box .bgm-list:nth-of-type('+e+') .add-bgm');
      //div 추가
      const createDiv = document.createElement('div');
      const bgmChartBox = document.querySelector('.bgm-chart .chart-box');

      const videoBox = document.querySelector('#video');
      //audio 추가
      let createAudio = document.createElement('audio');
      videoBox.appendChild(createAudio).id = 'bgm-audio' + e;
      createAudio.setAttribute("class","bgm-audio");

      // Duration 시간
      let durmin = Math.floor(audio.file.duration / 60);
      let dursec = Math.floor(audio.file.duration - durmin * 60);
      let curmin = Math.floor(audio.file.currentTime / 60);
      let cursec = Math.floor(audio.file.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      audio.duration = durmin + ":" + dursec;
      audio.currentTime = curmin + ":" + cursec;

      if(!addBgm.classList.contains('active')){
        //waveform id에 +1
        bgmChartBox.appendChild(createDiv).id = 'waveform' + e;
        // add-bgm 아이콘 
        addBgm.classList.add('active');
        //적용중 보더
        li.classList.add("active")

        //타임라인에 오디오 src추가
        document.getElementById("bgm-audio"+e).setAttribute('src',audio.file.src)
        
        //타임라인에 waveform 생성
          this.wavesurfer= WaveSurfer.create({
            container: '#waveform'+e,
            waveColor: '#fff',
            progressColor: '#3093D7',
            fillParent: true,
            minPxPerSec: 1,
            responsive: true,
            hideScrollbar: true,
            barWidth: 2,
            barRadius: 3,
            barHeight: 5,
            height: 30,
            cursorWidth:2,
        })
        this.wavesurfer.load(audio.file.src)
      }
      else {
        // add-bgm 아이콘 
        addBgm.classList.remove('active');
        //적용중 해제
        li.classList.remove( 'active' );
        //wavesurfer div삭제
        document.getElementById("waveform"+e).remove();
        //audio 삭제
        document.getElementById("bgm-audio"+e).remove();
      }
    },
      generateTime() {
      for(let i=0; i<audios.lists.length;i++){
        let durmin = Math.floor(audios.lists[i].file.duration / 60);
        let dursec = Math.floor(audios.lists[i].file.duration - durmin * 60);
        let curmin = Math.floor(audios.lists[i].file.currentTime / 60);
        let cursec = Math.floor(audios.lists[i].file.currentTime - curmin * 60);
        if (durmin < 10) {
          durmin = "0" + durmin;
        }
        if (dursec < 10) {
          dursec = "0" + dursec;
        }
        if (curmin < 10) {
          curmin = "0" + curmin;
        }
        if (cursec < 10) {
          cursec = "0" + cursec;
        }
      audios.lists[i].duration = durmin + ":" + dursec;
      audios.lists[i].currentTime = curmin + ":" + cursec;

      // console.log(this.audios[i].currentTime); //현재 재생 시간
      // console.log(this.audios[i].duration); //총 길이
      
      }
    },

  }
}
</script>



