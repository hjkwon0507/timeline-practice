<template>
  <div class="signup">
      <div class="signup-top">
        <div class="signup-form">
          <p class="title">3초 회원가입</p>
          <ul>
            <li class="name-input">
              <img src="../assets/images/name.png" alt="이름">
              <input @click="onkeydown" ref="name" v-model="name" id="name" name="name" type="text" placeholder="Name" style="background-color:transparent;">
            </li>
            <li class="email-input">
              <img src="../assets/images/email.png" alt="이메일">
              <input @click="onkeydown" ref="email" v-model="email" id="email" name="email" type="email" placeholder="E-mail" style="background-color:transparent;">
              <button type="button" class="duplicate" @click="duplication">중복체크</button>
            </li>
            <li class="password1-input">
              <img src="../assets/images/password.png" alt="비밀번호">
              <input @click="onkeydown" ref="password1" v-model="password1" type="password" name="password1" placeholder="Password" id="password1" style="background-color:transparent;">
            </li>
             <li class="password2-input">
              <img src="../assets/images/password.png" alt="비밀번호 확인">
              <input @click="onkeydown" ref="password2" v-model="password2" type="password" name="password2" placeholder="Password Check" id="password2" style="background-color:transparent;">
            </li>
          </ul>
        </div>
        <!-- 이용약관 동의 -->
        <div class="check-box">
          <label name="agreeSignup">
          <div class="input-box"><input type="checkbox" name="agreeSignup" id="agreeSignup"></div>
          <span>
            [필수] 영자야 <a href="#">이용약관</a> 및 <a href="#">개인정보 취급방침</a>에 대한 내용을 모두 확인하였으며, 이에 동의합니다.
          </span>
          </label>
        </div>
        <a class="signup-btn blue-btn" @click="submitSignup">SIGN UP</a>
      </div>
      <!-- Social Login -->
      <div class="signup-bottom">
        <div class="social-box">
          <p>소셜 계정으로 간편하게 가입하세요!</p>
          <ul>
            <li>
              <a href="/" id="naver_id_login"></a>
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
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Signup',
  data() {
    return {
      name: [],
      email: [],
      password1: [],
      password2: [],
      duplicate:0,
    }
  },
  mounted(){
    // 네이버 소셜 회원가입
    const naver_id_login = new window.naver_id_login("9VC8spd0mJFt32JD7mBE", "http://localhost:8080/naver-access");
    const state = naver_id_login.getUniqState();
    naver_id_login.setState(state);
    // naver_id_login.setPopup(); //팝업으로 띄우기
    naver_id_login.init_naver_id_login();
  },
  methods: {
    // 이메일 중복체크
    duplication(){
      const duplicateBtn = document.querySelector('.duplicate')
      this.duplicate=1;
      //이메일 형식 확인
      let reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
     if(!reg_email.test(this.email)) {
       alert("올바른 형식의 메일을 입력하세요")
      }
      else{
        axios
          .get('http://118.67.135.33/accounts/duplcate-check?email='+this.email, {
          })
          .then(response => {
            // console.log(response);
            if(response.data.is_possible==false){//이메일 중복
              alert("이미 가입된 이메일입니다!")
              this.email=""
              this.$refs.email.focus();
              this.duplicate=0;
            }
            else{
              duplicateBtn.innerHTML = '사용가능'
              duplicateBtn.classList.add('email-checked')
              alert("사용가능한 이메일입니다")
            }
          })
          .catch(error => {
            console.log('요청이 실패하였습니다.');
          })
      }
    },
    // Input 값 입력시 border 적용
    onkeydown(e){
      let target=e.target
      target.parentNode.style.borderBottom="1px solid #555"
    },
    // 일반 회원가입
    submitSignup () {
      const ck=document.getElementById("agreeSignup"); // 약관동의
      if (this.name=="") {
        alert("이름을 입력해주세요");
        this.$refs.name.focus();
      }
      else if (this.email=="") {
        alert("이메일을 입력해주세요");
        this.$refs.email.focus();
      }
      else if (this.password1=="" || this.password2=="") {
        alert("비밀번호를 입력해주세요");
        this.$refs.password1.focus();
      }
      // 숫자, 영문, 특수문자 각 1자리 이상 포함하며, 8자 이상 16자 미만인 경우만 통과
      else if (!/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/.test(this.password1)) {  
          alert("비밀번호는 숫자, 영문, 특수문자 각 1자리 이상 포함하며, 8자 이상 16자 미만으로 입력해 주세요.")
          this.$refs.password1.focus();
      }
      else if (this.password1!=this.password2 ) {
        alert('동일한 비밀번호를 입력해주세요')
        this.$refs.password2.focus();
      }
      else if (this.duplicate==0){
        alert("중복체크를 해주세요")
      }
      else if (!ck.checked) {
        alert("약관 동의를 체크하세요.")
        ck.focus();
        return false;
      }
      else {
        //모든 입력값 완료시 서버 전송
        axios
          .post('http://118.67.135.33/accounts/registration/email/', {
            name : this.name, 
            email: this.email,
            password1: this.password1,
            password2: this.password2
        })
        .then(response => {
          // console.log(response);
          if(response.status==201){
            alert("회원가입이 완료되었습니다.")
            location.reload();
          }
        })
        .catch(error => {
          console.log('요청이 실패하였습니다.');
        })
      }
    },
    // 구글, 카카오 토큰값 유효할 때 (response.status == 200)
    tokenIsValid(){
      let token=response.data.access_token
      //로컬스토리지에 토큰 담기
      localStorage.setItem("access_token",token)
      //다음함수 이동
      //로컬스토리지 토큰값 가져오기
      let tokens=localStorage.getItem("access_token")
      //파라미터 없애기
      location.href="http://localhost:8080/"
    },
    //구글 소셜 회원가입
    //1081604850885-i17bkadu4ifgpd8g30cjt00om4jv0rs3.apps.googleusercontent.com
    google_id_login(){
      window.gapi.signin2.render('my-signin2', { 
        scope: 'profile email', 
        width: 240, height: 50, 
        longtitle: true, theme: 'dark', 
        onsuccess: this.onSuccess, 
        onfailure: this.onFailure, 
      });
      setTimeout(function () { 
        //#my-signin2 가 display None이라 시간차 클릭
        document.querySelector('.abcRioButton').click(); 
      }, 300)
    },
    //구글 로그인 후 실행되는 콜백함수(성공) 
    async onSuccess(googleUser) {
      // console.log(googleUser.wc.access_token)
      axios.post('http://118.67.135.33/accounts/social-login/google/', {
        access_token:googleUser.wc.access_token,
        code:"",
        id_token:""
      })
        .then(response => {
          // console.log(response)
          //토근값이 유효할때
          if(response.status==200){
            tokenIsValid();
          }
        })
        .catch(error => {
          console.log('로컬에 토큰 담기 실패.');
        })
    },

    //카카오 소셜 회원가입
    kakao_id_login(){
      window.Kakao.Auth.login({
        scope : 'account_email',
        success: this.GetMe,
      });
    },
    GetMe(authObj){
      // console.log(authObj.access_token)
      axios.post('http://118.67.135.33/accounts/social-login/kakao/', {
        access_token:authObj.access_token,
        code:"",
        id_token:""
      })
        .then(response => {
          console.log(response)
          //토근값이 유효할때
          if(response.status==200){
            tokenIsValid();
          }
        })
        .catch(error => {
          console.log('로컬에 토큰 담기 실패.');
        })
    },
  },
}
</script>

