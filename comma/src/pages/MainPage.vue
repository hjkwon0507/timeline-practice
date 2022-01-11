<template>
  <div class="main-page">
    <!-- Header -->
    <main-header />
    <!-- Start -->
    <div id="start" class="main-start">
      <div class="inner">
        <div class="start-box">
          <div class="start-text">
            <p>
              번거로운 영상편집 이제 알아서!<br>
              영상자막, 배경음악, 나레이션을 한 번에!
              </p>
            <p>
              콘텐츠 제작을 쉽게 하세요
              콘텐츠 제작 플랫폼
            </p>
            <p>
              COM,MA
            </p>
          </div>
          <div class="start-video">
            <img src="../assets/images/start-video.png" alt="">
            <span>지금 보고 있는 영상은 콤마에서 만들어진 영상입니다.</span>
          </div>
        </div>
        <div class="start-bottom">
          <a class="start-btn" @click="editorStart">바로 시작하기</a>
          <a class="down" @click="down">down</a>
        </div>
      </div>
    </div> 
    <!-- Example -->
    <div id="example" class="main-mid">
      <div class="inner">
        <div class="mid-text">
          <p class="title">영상만 올려주세요</p>
          <p class="sub-title">
            편집은 '콤마'가 해드립니다!<br>
            다음과 같은 영상 편집에 활용하세요
          </p>
        </div>
        <div class="mid-box">
          <ul>
            <li>
              <img src="../assets/images/video-ex.png" alt="">
              <p>브이로그</p>
            </li>
            <li>
              <img src="../assets/images/video-ex.png" alt="">
              <p>교육영상</p>
            </li>
            <li>
              <img src="../assets/images/video-ex.png" alt="">
              <p>행사영상</p>
            </li>
            <li>
              <img src="../assets/images/video-ex.png" alt="">
              <p>촬영영상</p>
            </li>
          </ul>
        </div>
      </div>
    </div> 
    <!-- Watermark -->
    <div id="watermark" class="main-bottom">
      <div class="inner">
        <img src="../assets/images/watermark.png" alt="">
        <div class="bottom-text">
          <p class="title">워터마크 FREE</p>
          <p class="sub-title">
            이제 지긋지긋한 워터마크에서 벗어나세요.<br>
            콤마에서 제공하는 모든 콘텐츠 제작은<br>
            워터마크가 없습니다.
          </p>
        </div>
      </div>
    </div> 
    <!-- Easy -->
    <div id="easy">
      <div class="inner">
        <div class="bottom-text">
          <p class="title">
            설치없이 간편하게
          </p>
          <p class="sub-title">
            설치하지 마세요!<br>
            웹사이트에 접속만 하시면 끝!
          </p>
        </div>
        <img src="../assets/images/easy.png" alt="">
      </div>
    </div> 
    <!-- Footer -->
    <app-footer />
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import AppFooter from '../components/AppFooter.vue';

export default {
  name: 'MainPage',
  components: {
    MainHeader,
    AppFooter,
  },
  methods:{
    editorStart () {
      // let tokens=localStorage.getItem("access_token");
      // if(tokens==null){
      //   alert('로그인 후 이용해주시길 바랍니다 :)');
      // }else{
        location.href = 'http://localhost:3000/editor'
      // }
    },
    down(){
      // 화살표 하단이동
      let down=document.querySelector(".start-video").offsetHeight; 
      window.scrollTo(0,530)
    }
  }
}
</script>