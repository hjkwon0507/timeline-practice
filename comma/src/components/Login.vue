<template>
  <div class="login">
    <div class="login-top" v-if="findPw == false">
      <div class="login-form">
        <p class="title">로그인하기</p>
        <ul>
          <li>
            <img src="../assets/images/email.png" alt="이메일">
            <input ref="email" v-model="email" id="email" type="email" placeholder="E-mail" @keydown="onkeydown">
          </li>
          <li>
            <img src="../assets/images/password.png" alt="비밀번호">
            <input ref="password" v-model="password" id="password" type="password" placeholder="Password" @keydown="onkeydown">
          </li>
        </ul>
      </div>
      <div class="check-box" v-if="findPw == false">
        <span><label><input type="checkbox" name="stayLogin" id="stayLogin">로그인 상태 유지</label></span>
        <a @click="findPw = true">비밀번호를 잃어버렸어요.</a>
      </div>
      <a class="login-btn blue-btn" @click="submitLogin">LOGIN</a>
    </div>
    <!-- Social Login -->
    <div class="login-bottom" v-if="findPw == false">
      <div class="social-box">
        <p>소셜 계정으로 간편하게 로그인하세요!</p>
        <ul>
          <li>
            <a href="/" id="naver_id_login" @click="naver_id_login"></a>
            <span>네이버</span>
          </li>
          <li>
            <a id="kakao_id_login" @click="kakao_id_login"></a>
            <span>카카오</span>
          </li>
          <li>
            <a id="google_id_login" @click="google_id_login"></a>
            <div id="my-signin2" style="display:none;"></div>
            <span>구글</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 비밀번호 찾기 -->
    <div class="find-pw" v-if="findPw == true">
      <div class="find-pw-form signup-form">
        <p class="title">비밀번호 찾기</p>
        <p>가입하신 이메일을 입력해주세요.</p>
        <ul>
          <li class="email-input">
            <img src="../assets/images/email.png" alt="이메일">
            <input @click="onkeydown" ref="ckEmail" v-model="ckEmail" id="email" name="ckEmail" type="email" placeholder="E-mail" style="background-color:transparent;">
            <button type="button" class="duplicate" id="sendCode" @click="sendAuthCode">인증코드 전송</button>
          </li>
          <li class="confirm-input">
            <img src="../assets/images/password.png" alt="인증코드">
            <input @click="onkeydown" ref="authCode" v-model="authCode" id="authCode" name="authCode" type="text" placeholder="Code" style="background-color:transparent;">
            <button type="button" class="duplicate" id="checkCode" @click.once="checkAuthCode">인증코드 확인</button>
          </li>
        </ul>
      </div>
      <div class="new-pw" v-if="newPwOpen == true">
        <p>새로운 비밀번호를 입력해주세요.</p>
        <div class="change-form">
          <ul>
            <li class="password1-input">
              <img src="../assets/images/password.png" alt="변경할 비밀번호">
              <input @click="onkeydown" ref="newPassword1" v-model="newPassword1" type="password" placeholder="변경할 비밀번호" style="background-color:transparent;">
            </li>
            <li class="password2-input">
              <img src="../assets/images/password.png" alt="비밀번호 확인">
              <input @click="onkeydown" ref="newPassword2" v-model="newPassword2" type="password" placeholder="비밀번호 확인" style="background-color:transparent;">
            </li>
          </ul>
          <a class="blue-btn" @click="resetPw">변경하기</a>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  mounted(){
      //네이버 소셜 로그인
      function naverLogin(){
        const naver_id_login = new window.naver_id_login("9VC8spd0mJFt32JD7mBE", "http://localhost:8080/naver-access");
        const state = naver_id_login.getUniqState();
        naver_id_login.setState(state);
        naver_id_login.init_naver_id_login();
      }
     if(document.getElementById("stayLogin").checked===true){
        //로컬스토리지에 체크 여부 저장
        localStorage.setItem("stayLogin","true")
        naverLogin();
      }
      else{
         //로컬스토리지에 체크 여부 저장
        localStorage.setItem("stayLogin","false")
        naverLogin();
      }
   },
  name: 'Login',
  data() {
    return {
      loginOpen : false,
      signupOpen : false,
      findPw: false,
      email: [],
      password: [],
      access_token: [],
      newPwOpen: false,
      ckEmail : "",
      sendSuccess: false,
      authCode: "",
      newPassword1: "",
      newPassword2: "",
    }
  },
  methods: {
    // Input 값 입력시 border 적용
    onkeydown(e){
      let target=e.target
      target.parentNode.style.borderBottom="1px solid #555"
    },
    //로그인 성공시
    loginSuccess(response){
      // 토근값이 유효할때
      if(response.status==200){
        let token=response.data.access_token
        let refresh_token=response.data.refresh_token
        let social=response.data.user.is_social;
        //로컬스토리지에 토큰,리프레시 토큰 담기
        localStorage.setItem("access_token",token)
        localStorage.setItem("refresh_token",refresh_token)
        localStorage.setItem("is_social",social)
        //파라미터 없애기
        location.href="http://localhost:8080/"
      }
    },
    // 네이버 로그인
    naver_id_login(){
      if(document.getElementById("stayLogin").checked===true){
          //로컬스토리지에 체크 여부 저장
        localStorage.setItem("stayLogin","true")
      }
      else{
        localStorage.setItem("stayLogin","false")
      }
    },
    // 구글 소셜 로그인
    // 1081604850885-i17bkadu4ifgpd8g30cjt00om4jv0rs3.apps.googleusercontent.com
    google_id_login(){
      window.gapi.signin2.render('my-signin2', { 
        scope: 'profile email', 
        width: 240, height: 50, 
        longtitle: true, theme: 'dark', 
        onsuccess: this.onSuccess, 
        onfailure: this.onFailure, 
      });
      setTimeout(function () { 
        // #my-signin2 가 display None이라 시간차 클릭
        document.querySelector('.abcRioButton').click(); 
      }, 300)
    },
    // 구글 로그인 후 실행되는 콜백함수(성공) 
    async onSuccess(googleUser) {
      // console.log(googleUser.wc.access_token)
      axios.post('http://118.67.135.33/accounts/social-login/google/', {
        access_token: googleUser.wc.access_token,
        code: "",
        id_token: ""
      })
        .then(response => {
          this.loginSuccess(response)
        })
        .catch(error => {
          console.log('로컬에 토큰 담기 실패.');
        })
    },
    // 카카오 소셜 로그인
    kakao_id_login(){
      window.Kakao.Auth.login({
        scope : 'account_email',
        success: this.GetMe,
      });
    },
    //카카오 로그인 성공시 실행되는 함수
    GetMe(authObj){
      // console.log(authObj.access_token)
      axios.post('http://118.67.135.33/accounts/social-login/kakao/', {
        access_token: authObj.access_token,
        code: "",
        id_token: ""
      })
        .then(response => {
           this.loginSuccess(response)
        })
        .catch(error => {
          console.log('로컬에 토큰 담기 실패.');
        })
    },
    //일반 로그인
    submitLogin () {
      if (this.email=="") { 
        alert("이메일을 입력해주세요");
        this.$refs.email.focus();
      }
      else if (this.password=="") { 
        alert("비밀번호를 입력해주세요");
        this.$refs.password.focus();
      }
      else {//모든 input값 입력 완료시
        //로그인 유지 기능 체크
        if(document.getElementById("stayLogin").checked===true){
          //로컬스토리지에 체크 여부 저장
          localStorage.setItem("stayLogin","true")
        }
        else{
          localStorage.setItem("stayLogin","false")
        }
          axios.post('http://118.67.135.33/accounts/login/email/', {
            email: this.email,
            password: this.password
          })
            .then(response => {
              this.loginSuccess(response)
            })
            .catch(error => {
              console.log('요청이 실패하였습니다.');
            })
      }
    },
    // 비밀번호 찾기 (인증코드 전송)
    sendAuthCode () { 
      if (this.ckEmail == "") {
        alert('이메일을 입력해주세요.');
        this.$refs.ckEmail.focus();
      } 
      else {
        console.log(this.ckEmail);
        axios.post('http://118.67.135.33/accounts/password/reset/email/', {
          email: this.ckEmail,
        })
          .then(response => {
            console.log(response);
            const sendCode = document.getElementById('sendCode');
            sendCode.innerHTML = '재전송'
            sendCode.style.border = '1px solid #3093D7';
            sendCode.style.color = '#3093D7';
            alert('인증코드가 전송되었습니다! 이메일을 확인해주세요.');
            this.sendSuccess = true;
          })
          .catch(error => {
            console.log('요청이 실패하였습니다.');
            console.log(error);
          })
      }
    },
    //  비밀번호 찾기 (인증코드 확인)
    checkAuthCode () {
      if (this.ckEmail == "") {
        alert('이메일을 입력해주세요.');
        this.$refs.ckEmail.focus();
      }
      else if (this.sendSuccess == false) {
        alert('이메일을 인증해주세요.')
      }
      else if (!this.ckEmail == "" && this.authCode == "") {
        alert('인증코드를 입력해주세요.');
        this.$refs.authCode.focus();
      }
      else {
        axios.defaults.withCredentials = true;
        axios.post('http://118.67.135.33/accounts/password/reset/confirm/', {
          secret: this.authCode,
        },
        { withCredentials: true }
        )
          .then(response => {
            console.log(response);
            this.newPwOpen = true;
            const checkCode = document.getElementById('checkCode');
            checkCode.innerHTML = '확인완료'
            checkCode.style.border = '1px solid #3093D7';
            checkCode.style.color = '#3093D7';
            checkCode.removeEventListener('click', this.checkAuthCode);
          })
          .catch(error => {
            console.log('요청이 실패하였습니다.');
            console.log(error);
          })
      }
    },
    // 새로운 비밀번호
    resetPw () {
      if (this.newPassword1 == "" || this.newPassword2 == "") {
        alert('비밀번호 입력해주세요.');
        this.$refs.newPassword1.focus();
      } 
      else if (this.newPassword1 != this.newPassword1) {
        alert('동일한 비밀번호를 입력해주세요.');
        this.$refs.newPassword2.focus();
      }
      else {
        // console.log(this.authCode);
        axios.defaults.headers.common["allowed"] = this.authCode;
        axios.patch('http://118.67.135.33/accounts/password/reset/', {
          new_password1: this.newPassword1,
          new_password2: this.newPassword2,
        },
        )
          .then(response => {
            // console.log(response);
            if(response.status==200){
              alert('비밀번호가 변경되었습니다!');
              this.findPw=false;
            }
          })
          .catch(error => {
            // console.log('요청이 실패하였습니다.');
            console.log(error);
          })
      }
    },
  },
}
</script>