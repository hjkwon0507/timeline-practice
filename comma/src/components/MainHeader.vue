<template>
  <div class="main-header">
    <div class="inner">
      <div class="left-menu">
        <router-link :to="{ name: 'MainPage' }" class="logo"><h1>로고</h1></router-link>
        <router-link :to="{ name: 'ExpertPage' }" class="go-expert">전문가에게 맡기기</router-link>
      </div>
      <div class="sub-menu">
        <ul>
          <li><a id="login" @click="loginOpen = true" v-if="member===0">로그인하기</a>
              <a id="mypage" v-else href="/mypage">마이페이지</a>
          </li>
          <li>
              <a id="signup" @click="signupOpen = true" v-if="member===0">3초 회원가입</a>
              <a id="logout" v-else @click="logout">로그아웃</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 로그인 팝업 -->
    <div class="black-bg" v-if="loginOpen == true">
      <div class="white-bg">
        <div class="close-box">
        <a class="close-btn" @click="loginOpen = false"></a>
        </div>
        <login />
        <p>아직 회원이 아니신가요?<a @click="signupOpen = true, loginOpen = false"> 3초 회원가입하기</a></p>
      </div>  
    </div>
    <!-- 회원가입 팝업 -->
    <div class="black-bg" v-if="signupOpen == true">
      <div class="white-bg">
        <div class="close-box">
          <a class="close-btn" @click="signupOpen = false"></a>
        </div>
        <signup />
        <p>이미 회원이신가요?<a @click="loginOpen = true, signupOpen = false"> 로그인하기</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login'
import Signup from './Signup'
import axios from 'axios'

export default {
  name: 'MainHeader',
  data() {
    return {
      loginOpen : false,
      signupOpen : false,
      member:0
    }
  },
  mounted(){
     //로컬스토리지에 담긴 토큰,리프레시 토큰값 가져오기
    const token=localStorage.getItem('access_token');
    this.members(token)//확장함수로 값 넘기기
  },
  components: {
    Login,
    Signup
  },
  methods:{
    // 토큰 지우기
    removeTokens(){
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('stayLogin');
    },
    members(token){
      //로컬스토리지에 담긴 토큰,리프레시 토큰값 가져오기
      let token_ck = localStorage.getItem('access_token')
      let stayLogin = localStorage.getItem('stayLogin');
      let social = localStorage.getItem('is_social');
      let refresh_tokens = localStorage.getItem("refresh_token");
      let param = document.location.href.split("/");
       console.log(token);
       if(token===null){//로그인 정보 없음
        this.member=0;//로그인 보이게
        console.log('토큰 없음');
      }
      else if(token!=null&&stayLogin === "false"){//로그인 정보 있을때 , 로그인 유지 미체크
         this.member=1;
        console.log("올바른 회원인가",token_ck===token);
        console.log("로그인 유지",stayLogin);
        console.log("소셜로그인",social);
        if(token_ck!=null){//올바른 회원일때
        //한시간 후 로그아웃
        setTimeout(function () {
         this.removeTokens();
          alert('토큰 만료로 로그아웃 되었습니다. 재로그인 해주세요 appvue')
          this.member=0;
          location.href="http://localhost:8080/"
          },3600000)
        }
      }
      else if(token!=null||stayLogin === "true"){//로그인 유지 체크
        this.member=1;//로그아웃 보이게
        console.log('로그아웃11111111');
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
    // 로그아웃
    logout(){
      // let r_token=localStorage.getItem("refresh_token")
      // console.log(r_token);
      // console.log(localStorage.getItem("access_token"));
      // //로그인유지 삭제
      // localStorage.removeItem('stayLogin');
      // axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("access_token");
      // axios
      // .post('http://118.67.135.33/accounts/logout/', {
      //   refresh:r_token
      // })
      // .then(response => {
      //   console.log(response);
      //    if(response.request.status==200){
      //      //로컬 스토리지 토큰 삭제
      //       this.deleteTokens();
      //       localStorage.removeItem('is_social');
      //       //홈으로
      //      location.href="http://localhost:8080/"
      //      alert('로그아웃 되었습니다!')
      //       //헤더 변경
      //      this.member=0;
      //    }
      // })
      // .catch(error => {
      //   console.log("요청 실패");
      // })

      //강제 로그아웃
      this.removeTokens();
      //로컬스토리지에 담긴 토큰값 가져오기
       const token=localStorage.getItem('access_token');
       console.log(token)
        if(token == null){
          console.log("로그아웃")
          this.member=0;
          location.href="http://localhost:8080/"
          alert('로그아웃 되었습니다!')
        }
    }
  }
}
</script>

