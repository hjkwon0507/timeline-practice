<template>
  <div id="app">
    <router-view/>
    <!-- <app-footer /> -->
  </div>
</template>

<script>
// import AppFooter from '@/components/AppFooter'
import axios from 'axios';

export default {
  name: 'App',
  components: {
  },
  mounted(){
    //로컬스토리지에 담긴 토큰,리프레시 토큰값 가져오기
    const token=localStorage.getItem('access_token');
    this.members(token)//확장함수로 값 넘기기
  },
  methods: {
    // 토큰 지우기
    deleteTokens(){
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('stayLogin');
    },
    members(token){
      //로컬스토리지에 담긴 토큰,리프레시 토큰값 가져오기
      let token_ck= localStorage.getItem('access_token')
      let stayLogin=localStorage.getItem('stayLogin');
      let social=localStorage.getItem('is_social');
      let refresh_tokens=localStorage.getItem("refresh_token")
      let param= document.location.href.split("/");
      if(param[3]==="editor"){
          console.log('현재 편집페이지입니다');
          setInterval(()=>
          //59분마다 서버로 refreshToken보내기
          axios.post('http://118.67.135.33/accounts/token/refresh/', {
            refresh: refresh_tokens
          })
          .then(response => {
            console.log("refreshToken전송 editor page",response);
          })
          .catch(error => {
            console.log('요청이 실패하였습니다.');
          }),3540000)
      }
      else if(token!=null&&stayLogin === "false"){//로그인 정보 있을때 , 로그인 유지 미체크
        console.log("올바른 회원인가",token_ck===token);
        console.log("로그인 유지",stayLogin);
        console.log("소셜로그인",social);
        if(token_ck!=null){//올바른 회원일때
        //한시간 후 로그아웃
        setTimeout(function () {
         this.deleteTokens();
          alert('토큰 만료로 로그아웃 되었습니다. 재로그인 해주세요 appvue')
          location.href="http://localhost:8080/"
          },3600000)
        }
      }
      else if(token!=null||stayLogin === "true"){//로그인 유지 체크
        console.log("올바른 회원인가",token_ck===token);
        console.log("로그인 유지",stayLogin);
        console.log("소셜로그인",social);
        setInterval(()=>
          //30분마다 서버로 refreshToken보내기
          axios.post('http://118.67.135.33/accounts/token/refresh/', {
            refresh: refresh_tokens
          })
          .then(response => {
            console.log("refreshToken전송",response);
          })
          .catch(error => {
            console.log('요청이 실패하였습니다.');
          }),1800000)
          //3540000
      }
    },
  },
  
}
</script>

<style>
/* reset.css */
@import "./styles/reset.css";
/* common.css */
@import "./styles/common.css";
/* main.css */
@import "./styles/main.css";
/* editor.css */
@import "./styles/editor.css";
/* mypage.css */
@import "./styles/mypage.css";
/* expert.css */
@import "./styles/expert.css";

#app {
  width: 100%;
  margin: 0 auto;
}
</style>
