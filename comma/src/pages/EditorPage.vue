<template>
  <div class="editor-page">
    <editor-header />
      <div class="editor-box">
      <!-- 사이드 바 -->
        <div class="side-bar">
          <ul>
            <li v-for="(p, index) in arrays" :key="index" @click="currentTab = index">
              <a class="side-btn" :class="{active:currentTab == index}">
                <img :src="arrays[index].img" alt="업로드">
                <p>{{arrays[index].title}}</p>
              </a>
            </li>
          </ul>
        </div>
        <!-- 슬라이드 바 -->
        <div class="editor-workspace">
          <div class="workspace-top">

            <div class="slide-animate">
            <div class="slide-box">
              <div class="slide-inner">
              <!-- 사이드바 클릭시 색 변화(활성화) -->
                <upload-slide v-show="currentTab === 0" />
                <text-slide v-show="currentTab === 1" />
                <font-slide v-show="currentTab === 2" />
                <bgm-slide v-show="currentTab === 3" />
                <narration-slide v-show="currentTab === 4" />
              </div>
              <a class="slide-in-btn" @click="slideIn"><img :src="require(`@/assets/images/${imgName}.png`)" alt="슬라이드인"></a>
            </div>
            </div>
            <!-- 비디오 상자 -->
            <div class="video-box">
              <video id="video">
                <source type="video/mp4">
                <track id="caption-track" kind="subtitles" srclang="ko" label="Korean" default />
              </video>
              <div id='targetElement' style="text-align: center;"></div>
            </div>
          </div>
          <!-- 타임라인 -->
          <div class="timeline-box">
            <div class="play-box">
              <a class="play-btn">
                <img src="../assets/images/play.png"  @click="play" v-if="isTimerPlaying">
                <img src="../assets/images/pause_circle.png"  @click="play" v-else>
              </a>
            </div>
            <div class="timeline-right">
              <div class="time-chart">
              </div>
              <div class="video-chart">
                <p>영상</p>
                <div class="chart-box"></div>
              </div>
              <div class="text-chart">
                <p>자막</p>
                <div class="chart-box"></div>
              </div>
              <div class="bgm-chart">
                <p>BGM</p>
                <div class="chart-box" id="chart-box"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <app-footer />
  </div>
</template>

<script>
import EditorHeader from '@/components/EditorHeader.vue'
import UploadSlide from '@/components/UploadSlide.vue'
import TextSlide from '@/components/TextSlide.vue'
import FontSlide from '@/components/FontSlide.vue'
import NarrationSlide from '@/components/NarrationSlide.vue'
import AppFooter from '../components/AppFooter.vue'
import BgmSlide from '@/components/BgmSlide.vue'
import audios from '@/assets/js/audio.js'
  

export default {
  name: 'EditorPage',
  data() {
    return {
      currentTab: 0,
      imgName:'slide-in-gray',
      isTimerPlaying: true,
      duration: null,
      currentTime: null,
      arrays:[
        {
          img:require("../assets/images/upload.png"),
          title:"업로드"
        },
        {
          img:require("../assets/images/text.png"),
          title:"텍스트"
        },
        {
          img:require("../assets/images/font.png"),
          title:"폰트"
        },
        {
          img:require("../assets/images/bgm.png"),
          title:"배경음악"
        },
        {
          img:require("../assets/images/naration.png"),
          title:"나레이션"
        }
      ]
    }
  },
  components: { 
    EditorHeader,
    UploadSlide,
    TextSlide,
    FontSlide,
    BgmSlide,
    NarrationSlide,
    AppFooter,
  },
  mounted() {
    //영상 업로드
    let dragArea=document.querySelector(".drag-area");
    let dargText=document.querySelector(".upload-header");
    let button=document.querySelector('.upload-slide .upload-btn');
    let input =document.getElementById("file");
    let file;
    //버튼으로 영상 업로드
    button.onclick=()=>{
      input.click();
    };
    input.addEventListener('change',function(){
      file=this.files[0];
      let param = new FormData();
      param.append('file', file);
      editor.getInformation(param,  {
            befor : ()=>{
              document.querySelector('.curtain').style.display = 'block'
            },
            done : ()=>{
              document.querySelector('.curtain').style.display = 'none'
            }
        })
      dragArea.classList.add('active')
      displayFile();
    })
    //드래그로 영상 업로드
    dragArea.addEventListener('dragover',(event)=>{
      event.preventDefault();
      dragArea.classList.add('active');
    })
    //파일을 박스 안으로 드래그 시 박스 텍스트 변경
    dragArea.addEventListener('dragleave',(event)=>{
      dargText.textContent='Drag & Drop'
      dragArea.classList.remove('active');
    })
    dragArea.addEventListener('drop',(event)=>{
      event.preventDefault();
      file=event.dataTransfer.files[0];
      displayFile();
    });
    //파일이 드래그 드롭 됐을때
    function displayFile() {
      const fileType=file.type;
      let validExtensions=['video/webm','video/mp4','video/mkv','video/*','video/x-m4v']
      if(validExtensions.includes(fileType)){
          const inputFile = document.getElementById("file");
          const video = document.getElementById("video");
          const videourl = URL.createObjectURL(file);
          video.setAttribute("src", videourl);
          video.load();
          let fileReader=new FileReader();
          fileReader.onload=()=>{
              let fileURL=fileReader.result;
          };
          // console.log(file);
          fileReader.readAsDataURL(file);
          dargText.textContent=file.name
          video.style.display = "block";
          console.log('업로드 완료');
      }
      //확장자가 비디오가 아닐경우
      else{
          alert("파일 확장자를 확인하세요!")
          dragArea.classList.remove('active')
      }
    }
    //자막 업로드
    let dragSub=document.querySelector(".drag-area-sub");
    let dargText_sub=document.querySelector(".header-sub");
    let button_sub=document.querySelector('.text-slide .upload-btn');
    let input_sub =document.getElementById("file-sub");
    button_sub.onclick=()=>{
      input_sub.click();
    };
    input_sub.addEventListener('change',function(){
      file=this.files[0];
      dragSub.classList.add('active')
      displayFile_sub();
    })
    dragSub.addEventListener('dragover',(event)=>{
      event.preventDefault();
      dragSub.classList.add('active');
    })
    //파일을 박스 안으로 드래그 시 박스 텍스트 변경
    dragSub.addEventListener('dragleave',(event)=>{
      dargText_sub.textContent='Drag & Drop'
      dragSub.classList.remove('active');
    })
    dragSub.addEventListener('drop',(event)=>{
      event.preventDefault();
      file=event.dataTransfer.files[0];
      displayFile_sub();
    });
    //파일이 드래그 드롭 됐을때
    function displayFile_sub(){
      const fileType=file.type;
      let validExtensions=['text/plain','text/*']
      // console.log(fileType)
      if(validExtensions.includes(fileType)){
          let input = document.createElement("input");
          processFile(file);
          input.click();
      }
      //확장자가 텍스트가 아닐경우
      else{
          alert("자막파일 확장자를 확인하세요!")
          dragSub.classList.remove('active')
      }
    }
    //자막 업로드시 textarea에 자동 입력
    function processFile(file) {
      let reader = new FileReader();
      dargText_sub.textContent=file.name
      reader.onload = function (e) {
          let con=reader.result
          con=con.replace(/(?:\r\n|\r|\n)/g, '<br/>');
          output.innerHTML = reader.result;
          output.style.height = "280px";
      };
      reader.readAsText(file,"utf-8");
    }
    //나레이션 텍스트 업로드
    let dragNar=document.querySelector(".drag-area-nar");
    let dargText_nar=document.querySelector(".header-nar");
    let button_nar=document.querySelector('.narration-slide .upload-btn');
    let input_nar =document.getElementById("file-nar");
    let Narfile;
    button_nar.onclick=()=>{
      input_nar.click();
    };
    input_nar.addEventListener('change',function(){
      Narfile=this.files[0];
      dragNar.classList.add('active')
      displayFile_nar();
    })
    dragNar.addEventListener('dragover',(event)=>{
      event.preventDefault();
      dragNar.classList.add('active');
    })
    //파일을 박스 안으로 드래그 시 박스 텍스트 변경
    dragNar.addEventListener('dragleave',(event)=>{
      dargText_nar.textContent='Drag & Drop'
      dragNar.classList.remove('active');
    })
    dragNar.addEventListener('drop',(event)=>{
      event.preventDefault();
      Narfile=event.dataTransfer.files[0];
      displayFile_nar();
    });
    //파일이 드래그 드롭 됐을때
    function displayFile_nar(){
      const fileType=Narfile.type;
      let validExtensions=['text/plain','text/*']
      if(validExtensions.includes(fileType)){
          let input = document.createElement("input");
          processNar(Narfile);
          // input.click();
      }
      //확장자가 텍스트가 아닐경우
      else{
          alert("자막파일 확장자를 확인하세요!")
          dragNar.classList.remove('active')
      }
    }
    //드래그 박스에 파일이름 넣기
     function processNar(file) {
      let reader = new FileReader();
      let outputNar=document.querySelector('#outputNar')
      dargText_nar.textContent=file.name
       reader.onload = function (e) {
          let con=reader.result
          con=con.replace(/(?:\r\n|\r|\n)/g,'');
          outputNar.innerText=con
          outputNar.style.height = "280px";
          this.narr=con
          // console.log(this.narr);
          console.log(outputNar.value);
      };
      reader.readAsText(file,"utf-8");
    }
  },
  methods: {
    //하단 플레이 버튼 조작
    //영상 재생
    play () {
      const myVideo = document.getElementById('video')
      if(myVideo.getAttribute('src')!=null){//비디오가 업로드 됐을때
        if (myVideo.paused) {
          myVideo.play();
          this.isTimerPlaying= false;
          this.Bgmplay("t")
        } 
        else {
          myVideo.pause();
          this.isTimerPlaying= true;
          this.Bgmplay("f")
      }
      }
      else{//비디오가 업로드 안됐을때 하단 재생버튼 작동 금지
        this.isTimerPlaying= true;
      }
    },
    //영상재생시 음악도 재생
    Bgmplay(e){
      let myBgm;
      let audioArray=[];
      for(let i=1;i<4;i++){//bgm데이터 수만큼 돌아가게
        if(document.getElementById('bgm-audio'+i)!=null){//bgm이하나라도 들어가 있으면
          myBgm=document.getElementById('bgm-audio'+i);
          if(e=="t"){//+영상까지 있으면
            // myBgm=document.getElementById('bgm-audio'+i)
            // if(document.getElementById('bgm-audio'+i)!=null){
              // document.getElementById('bgm-audio'+num).play()
              // document.getElementsByClassName('bgm-audio'+this.num).play()

              let sound=new Audio()
              let link=audios.lists[i-1].file
              sound.src=link.getAttribute('src')
              audioArray.push(sound)
            // }
            // myBgm.play();//음악 재생
            //음악 시간 구하기
            /*for(let index=0;index<3;index++){
              console.log(audios.lists[index].file);
              let durmin = Math.floor(audios.lists[index].file.duration / 60);
              let dursec = Math.floor(audios.lists[index].file.duration - durmin * 60);
              let curmin = Math.floor(audios.lists[index].file.currentTime / 60);
              let cursec = Math.floor(audios.lists[index].file.currentTime - curmin * 60);

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
              audios.lists[index].duration=durmin + ":" + dursec
              audios.lists[index].currentTime=curmin + ":" + cursec
              console.log(durmin + ":" + dursec , curmin + ":" + cursec);
            }*/
          }
          else{
            // myBgm.pause();
            audioArray.pause()
          }
        }
      }
      let index=0;
      if(index<3){
        audioArray[index].play();
        index++;
      }
      console.log(index);
      console.log(audioArray);
      console.log(audioArray[0]);
      console.log(audioArray[1]);
      console.log(audioArray[2]);
    },
    //사이드 편집 바 슬라이드
    slideIn() {
      const slideBox = document.querySelector('.slide-box')
      const slideAni = document.querySelector('.slide-animate')
      const slideBtn = document.querySelector('.slide-in-btn')
      const slideBtnImg = document.querySelector('.slide-in-btn img')
      const video = document.querySelector('#video')
      if (!slideBox.classList.contains('slide-active') && !slideBtn.classList.contains('slide-active') && !slideAni.classList.contains('slide-active')) {
        slideAni.classList.add('slide-active')
        video.classList.add('video-active');
        this.imgName='slide-out-gray'
        slideBtnImg.setAttribute('alt','슬라이드 아웃')
      }
      else {
        slideBox.classList.remove('slide-active');
        slideBtn.classList.remove('slide-active');
        slideAni.classList.add('slide-active')
        slideAni.classList.remove('slide-active');
        video.classList.remove('video-active');
        this.imgName='slide-in-gray'
        slideBtnImg.setAttribute('alt','슬라이드 인')
      }
      
    }
  }
}
</script>