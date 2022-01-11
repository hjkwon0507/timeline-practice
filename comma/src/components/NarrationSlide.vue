<template>
  <div class="narration-slide">
  <!--음성 검색-->
    <!--<input type="text" class="narration search" placeholder="음성 검색">
    <div class="narration cate">
      <ul>
        <li>전체</li>
        <li>cate1</li>
        <li>cate2</li>
        <li>cate3</li>
        <li>cate4</li>
      </ul>
    </div>
    <div class="total"> 전체 (<div class="total-num">4</div> )</div>-->
    <a class="upload-btn">텍스트파일 업로드</a>
    <!-- 드래그 박스 -->
    <div class="upload-box drag-area-nar">
      <div class="drop" id="srt" style="display: none;"></div>
      <p class="header-nar">이 곳에 나레이션파일을 <br>끌어다 업로드 하세요</p>
      <input type="file" name="file" id="file-nar" accept="text/plain" hidden @change="uploadNar">
    </div>
    <p>업로드 가능 파일: srt</p>
    <!-- 자막 수정 -->
    <div class="text-input">
      <textarea class="nar-output" id="outputNar" v-model="tasks" placeholder="이곳에 직접 입력/수정하세요. 최대 1,000자까지 입력 가능합니다."></textarea>
    </div>
    <!--음성 리스트-->
    <ul class="list-box">
        <li class="nar-list" v-for="(speaker, $index) in speakers" :key="$index">
          <span class="apply">적용중</span>
            <ul class="list-title">
                <li>{{speaker.name}}</li>
                <li>{{speaker.info}}</li>
            </ul>
            <div class="thum"><img :src="speaker.thum"></div>
            <div class="nar-img">
              <a class="play-nar" @click="speaker.isPlaying? pause($index, speaker) : play($index, speaker)">재생</a>
              <a class="add-nar" @click="listup($index, speaker.name)"></a>
              <audio class="nar-audio" :src="speaker.src"></audio>
            </div>
        </li>
    </ul>
    <a class="upload-btn" @click="narMp3">mp3파일 다운 / 미리듣기</a>
    <!--<a class="upload-btn" id="playNarPrev" @click="narPrev">미리듣기</a>-->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'NarrationSlide',
  data() {
    return {
      speaker:"",
      prevurl:null,
      audio:null,
      tasks:null,
      currentNar: false,
      speakers:[
      {
        name: "다라",
        thum: require("../assets/images/woman1.png"),
        info: "홍보, 뉴스, 관공서, 기업",
        src: require("../assets/narration/dara.mp3"),
        isPlaying: false,
        url: "",
      },
      {
        name: "민서",
        thum: require("../assets/images/woman2.png"),
        info: "브이로그, 편한느낌, 개인용, 편지, 나레이션, 감성", 
        src: require("../assets/narration/minseo.mp3"),
        isPlaying: false,
      },
      {
        name: "보라",
        thum: require("../assets/images/woman1.png"),
        info: "10대, 귀여운",
        src: require("../assets/narration/bora.mp3"),
        isPlaying: false,
      },
      {
        name: "주안",
        thum: require("../assets/images/man1.png"),
        info: "홍보, 뉴스, 관공서, 기업",
        src: require("../assets/narration/jooahn.mp3"),
        isPlaying: false,
      },
      {
        name: "지훈",
        thum: require("../assets/images/man2.png"),
        info: "홍보, 뉴스, 관공서, 기업",
        src: require("../assets/narration/jihun.mp3"),
        isPlaying: false,
      },
      {
        name: "민상",
        thum: require("../assets/images/man1.png"),
        info: "홍보, 뉴스, 관공서, 기업",
        src: require("../assets/narration/minsang.mp3"),
        isPlaying: false, 
      },
      {
        name: "준영",
        thum: require("../assets/images/man2.png"),
        info: "브이로그, 편한느낌, 개인용, 편지, 나레이션, 감성",
        src: require("../assets/narration/joonyoung.mp3"),
        isPlaying: false,
      },
      {
        name: "재욱",
        thum: require("../assets/images/man1.png"),
        info: "10대, 귀여운",
        src: require("../assets/narration/jaewook.mp3"),
        isPlaying: false,
      }
     ],
    }
  },
  methods:{
    play (e, speaker) {
      e = e+1;
      const playNar = document.querySelector('.list-box .nar-list:nth-of-type('+e+') .play-nar');
      const narAudio = document.querySelector('.list-box .nar-list:nth-of-type('+e+') .nar-audio');
      speaker.isPlaying = true;
      // console.log(narAudio)
      narAudio.play();
      playNar.classList.add('active');
      console.log(this.childValue);
    },
    pause (e, speaker) {
      e = e+1;
      const playNar = document.querySelector('.list-box .nar-list:nth-of-type('+e+') .play-nar');
      const narAudio = document.querySelector('.list-box .nar-list:nth-of-type('+e+') .nar-audio');
      playNar.classList.remove('active');
      speaker.isPlaying = false;
      narAudio.pause();
    },
    uploadNar(){//나레이션 파일 업로드
      const inputFile = document.getElementById("file-nar");
      const srt = document.getElementById("srt");
      const file = inputFile.files[0];
      const srturl = URL.createObjectURL(file);
      srt.setAttribute("src", srturl);
    },
    //나레이션 스피커 선택
    listup(n, speaker){
      n=n+1
      const li = document.querySelector(".nar-list:nth-of-type("+n+")");
      const addNar = document.querySelector('.list-box .nar-list:nth-of-type('+n+') .add-nar');
      // console.log(n);
      console.log(this.speaker);
      
      // document.querySelector('.nar-list:first-child').classList.add('active');
      if(this.currentNar === false){
        // add-nar 아이콘 
        addNar.classList.add('active');
        //적용중 보더
        li.classList.add("active");
        this.currentNar = true;
        this.speaker=speaker;
      }
      else if(this.currentNar === true && addNar.classList.contains('active')){
        // add-nar 아이콘 
        addNar.classList.remove('active');
        //적용중 해제
        li.classList.remove( 'active' );
        console.log('삭제');
        this.currentNar = false;
      }
      else if(this.currentNar === true){
        alert('하나만 선택해주세요!')
      }
      
    },
    narMp3(){
      switch(this.speaker){
          case "다라":
          this.speaker="dara"
          break;
          case "민서":
          this.speaker="nminseo"
          break;
          case "보라":
          this.speaker="nbora"
          break;
          case "주안":
          this.speaker="njooahn"
          break;
          case "지훈":
          this.speaker="njihun"
          break;
           case "민상":
          this.speaker="nminsang"
          break;
          case "준영":
          this.speaker="njoonyoung"
          break;
          case "재욱":
          this.speaker="njaewook"
          break;
        }
        this.tasks=document.querySelector('#outputNar').value
        console.log(this.tasks);
        console.log(this.speaker);
        //volume : -5에서 5 사이의 정수 값이며, -5 이면 2 배 빠른 속도이고 5 이면 0.5 배 더 느린 속도
        //pitch : -5에서 5 사이의 정수 값이며,-5 이면 1.2 배 높은 피치이고 5 이면 0.8 배 더 낮은 피치
      axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("access_token");
      axios({
        method:'post',
        url:'http://118.67.135.33/api/v1/editors/nars/',
        responseType: 'blob',
        data:{
           "speaker": this.speaker,
            "text": this.tasks,
            "volume": 0,
            "speed": 0,
            "pitch": 0,
        }
        })
          .then(response => {
            console.log(response);
            const link = document.createElement('a');
            const blob = new Blob([ response.data ], {type: 'audio/mp3'})
            const blobUrl = URL.createObjectURL(blob)
            window.audio=new Audio();
            window.audio.src=blobUrl;
            window.audio.controls=true;
            link.href = blobUrl
            link.setAttribute('download', 'narration.mp3');
            document.body.appendChild(link);
            link.click();
            link.remove();
            this.prevurl=blobUrl
            //미리듣기 코드
            this.audio=new Audio(blobUrl)
            this.audio.play();
            this.$emit('narMp3')
            })
          .catch(error => {
            console.log('요청이 실패하였습니다.');
            console.log(error.response);
          })
    },
    narPrev () {
      this.audio.play();
    }
  }
}
</script>