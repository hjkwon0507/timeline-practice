<template>
  <div class="expert-page">
    <!-- 신청하기 팝업 -->
    <div class="black-bg" v-if="registerOpen == true">

      <div class="white-bg register-pop">
        <div class="close-box">
          <a class="close-btn" @click="registerClose"></a>
        </div>
        
    <div class="register-contain">
            <div v-if="registerSuccess==true">
            <div class="register-maintitle">이렇게 편집 해 주세요!</div>
              <ol>
                <li :class="{active:currentTab == 0}">1. 영상유형</li>
                <li :class="{active:currentTab == 1}">2. 영상길이</li>
                <li :class="{active:currentTab == 2}">3. 옵션추가</li>
                <li :class="{active:currentTab == 3}">4. 제작기간</li>
                <li :class="{active:currentTab == 4}">5. 기타 정보 입력</li>
              </ol>
              <!-- 바로 신청하기 1단계(영상유형) -->
              <div class="register-box" v-show="currentTab === 0">
                <p class="register-step">편집하고 싶은 영상유형을 골라주세요. </p>
                <ul>
                  <li><label><input name="type[]" type="checkbox" v-model="types" value="Youtube">유튜브 영상</label></li>
                  <li><label><input name="type[]" type="checkbox" v-model="types" value="AD">광고 영상</label></li>
                  <li><label><input name="type[]" type="checkbox" v-model="types" value="Promotion">홍보 영상</label></li>
                  <li><label><input name="type[]" type="checkbox" v-model="types" value="Graphic">그래픽 영상</label></li>
                  <li><label><input name="type[]" type="checkbox" v-model="types" value="etc">기타</label><textarea v-model="textarea1" ref="etc1" maxlength="100"></textarea></li>
                </ul>
                <div class="register-next" @click="goNext(0)">다음 ></div>
            </div>
            <!-- 바로 신청하기 2단계(영상길이) -->
            <div class="register-box" v-show="currentTab === 1">
                <p class="register-step">제작을 원하는 영상의 길이는 결정하셨나요?</p>
                <ul>
                  <li><label><input name="length[]" type="radio" v-model="length" value="min_1">1분 이내</label></li>
                  <li><label><input name="length[]" type="radio" v-model="length" value="min_5">5분 이내</label></li>
                  <li><label><input name="length[]" type="radio" v-model="length" value="min_10">10분 이내</label></li>
                  <li><label><input name="length[]" type="radio" v-model="length" value="min_30">30분 이내</label></li>
                  <li><label><input name="length[]" type="radio" v-model="length" value="etc">기타</label><textarea v-model="textarea2" ref="etc2" maxlength="100"></textarea></li>
                </ul>
                <div class="register-prev" @click="currentTab = 0, isLengthCk = false">&lt; 이전</div>
                <div class="register-next" @click="goNext(1)">다음 ></div>
          </div>
          <!-- 바로 신청하기 3단계(옵션추가) -->
            <div class="register-box" v-show="currentTab === 2">
                <p class="register-step">어떤 옵션을 넣고 싶으세요? </p> 
                <ul class="register-type">
                  <li><label><input @click="checkAll" name="option[]" id="all" type="checkbox" v-model="option" value="All">전체</label></li>
                  <li><label><input name="option[]" type="checkbox" v-model="option" value="BGM">배경음악</label></li>
                  <li><label><input name="option[]" type="checkbox" v-model="option" value="Effect">효과음</label></li>
                  <li><label><input name="option[]" type="checkbox" v-model="option" value="Motion_Graphic">모션그래픽</label></li>
                  <li><label><input name="option[]" type="checkbox" v-model="option" value="Subtitle">자막</label></li>
                  <li><label><input name="option[]" type="checkbox" v-model="option" value="Correction">색보정</label></li>
                  <li><label><input name="option[]" type="checkbox" v-model="option" value="Narration">나레이션</label></li>
                  <li></li>
                  <li><label><input type="checkbox" v-model="option" value="etc" class="etc" id="option_etc">기타</label><textarea type="textarea" v-model="textarea3" ref="etc3" maxlength="100"></textarea></li>
                </ul>
                <div class="register-prev" @click="currentTab = 1, isTypeCk = false">&lt; 이전</div>
                <div class="register-next" @click="goNext(2)">다음 ></div>
          </div>
          <!-- 바로 신청하기 4단계(제작기간) -->
            <div class="register-box" v-show="currentTab === 3">
                <p class="register-step">언제까지 제작해야 하나요?</p>
                <ul class="register-period">
                  <li><label><input name="period[]" type="radio" v-model="make_length" value="week_1">1주일 이내</label></li>
                  <li><label><input name="period[]" type="radio" v-model="make_length" value="week_2">2주일 이내</label></li>
                  <li><label><input name="period[]" type="radio" v-model="make_length" value="month_1">1달 이내</label></li>
                  <li><label><input name="period[]" type="radio" v-model="make_length" value="After_Consulting">상담 후 결정할래요</label></li>
                </ul>
                <div class="register-prev" @click="currentTab = 2, isOptionCk = false">&lt; 이전</div>
                <div class="register-next" @click="goNext(3)">다음 ></div>
          </div>
          <!-- 바로 신청하기 5단계 -->
            <div class="register-box" v-show="currentTab === 4">
                <p class="register-step">연락받을 정보를 남겨주세요</p>
                <ul class="user-inform">
                  <li>* 담당자명<input v-model="userName" type="text"></li>
                  <li>* 회사명<input v-model="companyName" type="text"></li>
                  <li>* 연락처<input  v-model="phoneNumber" @keyup="getPhoneMask(phoneNumber)" name="inform[]" type="text" placeholder="숫자만 입력해주세요." maxlength="13"></li>
                  <li>* 이메일<input v-model="userEmail" name="inform[]" type="text"></li>
                  <li><textarea placeholder="기타 요청사항" maxlength="100" v-model="textarea4" class="user-textarea" value="request_etc"></textarea></li>
                  <li><label><input class="agree-check" type="checkbox">개인정보 수집 및 이용동의</label></li>
                </ul>
                <div class="register-prev" @click="currentTab = 3, isPeriodCk = false">&lt; 이전</div>
                <div class="register-next" @click="goNext(4)">작성완료</div>
          </div>
          </div>
        </div>

      </div>  
    </div>
    <div class="black-bg" v-if="registerCkOpen == true">
      <div class="white-bg register-ck-pop">
        <div class="close-box">
          <a class="close-btn" @click="registerCkOpen = false"></a>
        </div>
        <!-- 신청완료 확인-->
        <div class="register-ck" v-show="currentTab == 5">
          <p class="title">신청서 작성을<br>완료하시겠습니까?</p>
          <a class="register-success btn" @click="registerSend">네</a>
          <a class="register-success btn" @click="registerCkOpen = false">아니오</a>
        </div>
        <!-- 신청완료-->
        <div class="register-ok" v-show="currentTab === 6">
          <p class="title">신청서 작성을<br>완료하였습니다</p>
        </div>
      </div>
    </div>
    <!-- Header -->
    <main-header />
    <!-- Register -->
    <div class="register">
      <div class="inner">
        <div class="register-text">
          <p>전문가가 직접 편집하는 영상편집</p>
          <p>좀 더 고퀄리티 영상 편집을 원하세요? 전문가에게 맡겨보세요</p>
          <a class="btn" @click="goRegister">바로 신청하기</a>
        </div>
        <div class="register-right">
          <img src="../assets/images/register.png" alt="노트북 이미지">
        </div>
      </div>
    </div>
    <!-- Expert-ex -->
    <div class="expert-ex">
      <div class="inner">
        <p class="title">다음과 같은 영상에 유용합니다</p>
        <ul>
          <li v-for="(p, index) in arrays" :key="index">
            <img :src="arrays[index].img" alt="상업 광고 영상">
            <p>{{arrays[index].title}}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- High-quality -->
    <div class="high-quality">
      <p class="title">어떤 영상 편집이던 전문 영상 디자이너가<br>고퀄리티로 편집해드립니다.</p>
    </div>
    <!-- Expert-info -->
    <div class="expert-info">
      <div class="inner">
        <ul>
          <li @click="currentTab = 0" :class="{active:currentTab == 0}">유의사항</li>
          <li @click="currentTab = 1" :class="{active:currentTab == 1}">상세정보</li>
        </ul> 
      </div>
      <div class="expert-notice">
        <ul class="inner" v-show="currentTab === 0">
          <li>영상편집은 선결제로 진행됩니다.</li>
          <li>전문 편집자를 통한 수정은 기본 2회까지만 가능합니다.</li>
          <li>편집 퀄리티에 따라 추가요금이 발생될 수 있습니다.</li>
        </ul>
        <ul class="inner" v-show="currentTab === 1">
          <li>상세정보는</li>
          <li>아직 멘트가 정해지지않았습니다</li>
          <li>준비중입니다</li>
        </ul>
        <div></div>
      </div>
    </div>
    <!-- Pros -->
    <div class="pros">
      <div class="inner">
        <p class="title">COM,MA 편집 전문가 작업 대행의 장점</p>
        <ul>
          <li>
            <img src="../assets/images/pros1.png" alt="전문 편집자 배정">
            <p>전문 편집자 배정</p>
          </li>
          <li>
            <img src="../assets/images/pros2.png" alt="원하는 옵션으로 편집 가능">
            <p>원하는 옵션으로 편집 가능</p>
          </li>
          <li>
            <img src="../assets/images/pros3.png" alt="수정 2회 무료">
            <p>수정 2회 무료</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- High-quality-ex -->
    <div class="high-quality-ex">
      <div class="inner">
        <p class="title">전문가 영상 편집은 다음과 같이 고퀄리티 편집이 가능해요</p>
        <div class="ex-con">
          <div class="ex-current">
            <img src="../assets/images/hq-list-1-big.png" alt="고퀄리티 편집 영상">
          </div>
          <ul class="ex-list">
            <li><img src="../assets/images/hq-list-1.png" alt="고퀄리티 편집 영상1"></li>
            <li><img src="../assets/images/hq-list-2.png" alt="고퀄리티 편집 영상2"></li>
            <li><img src="../assets/images/hq-list-3.png" alt="고퀄리티 편집 영상3"></li>
            <li><img src="../assets/images/hq-list-4.png" alt="고퀄리티 편집 영상4"></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Expert-process -->
    <div class="expert-process">
      <div class="inner">
        <p class="title">영상 편집 진행 방법</p>
        <ol>
          <li>
            <div><img src="../assets/images/expert-process-1.png" alt=""></div>
            <p>신청서 작성, 상담, 결제</p>
            <a class="write-form btn" @click="registerOpen=true">신청서 작성하기</a>
          </li>
          <li>
            <div><img src="../assets/images/expert-process-2.png" alt=""></div>
            <p>전문 편집자 배정, 작업</p>
          </li>
          <li>
            <div><img src="../assets/images/expert-process-3.png" alt=""></div>
            <p>고객 확인, 수정</p>
          </li>
          <li>
            <div><img src="../assets/images/expert-process-4.png" alt=""></div>
            <p>최종 확정</p>
          </li>
        </ol>
        <div class="charge-rule">
          <p>영상 편집 비용 규정</p>
          <ul>
            <li>신청서 작성 후 클라이언트의 니즈에 따라 제작외주 비용이 결정됩니다.</li>
            <li>수정은 2회까지 무료이며, 이후론 추가 요금이 발생됩니다.</li>
            <li>제공 파일은 MP4로 제공됩니다.</li>
            <li>규격은 16:9, FHD(1920*1080) 사이즈로 제공됩니다.</li>
            <li>작업기간은 클라이언트의 니즈에 따른 퀄리티에 따라 상이합니다.</li>
            <li>
              COM,MA작업 대행에서 작업한 영상소스에 대해서만 저작권을 책임집니다.<br>
              (클라이언트가 제공한 촬영소스, 영상소스 등에 대한 저작권은 책임지지 않습니다.)
            </li>
          </ul>

        </div>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import axios from 'axios';
import MainHeader from '../components/MainHeader.vue'
import AppFooter from '../components/AppFooter.vue'
export default {
  components: { 
    MainHeader,
    AppFooter, 
  },
  name: 'ExpertPage',
  data() {
    return {
      registerOpen: false,
      registerOut: false,
      register1: true,
      register2: false,
      currentTab: 0,
      registerSuccess: true,
      registerCkOpen: false,
      etc: {
        check1:false,
        check2:false,
        check3:false,
      },
      textarea1: "",
      textarea2: "",
      textarea3:"",
      textarea4:"",
      types:[],
      length:"",
      option:[],
      make_length:"",
      isTypeCk: false,
      isLengthCk: false,
      isOptionCk: false,
      isPeriodCk: false,
      isInformCk: false,
      userName: "",
      companyName: "",
      phoneNumber: null,
      userEmail: "",
      i:0,
      emptyChecked: false,
      arrays:[
        {
          img:require("../assets/images/expert-ex1.png"),
          title:"상업 광고 영상"
        },
        {
          img:require("../assets/images/expert-ex2.png"),
          title:"홍보영상"
        },
        {
          img:require("../assets/images/expert-ex3.png"),
          title:"인포그래픽 영상"
        },
        {
          img:require("../assets/images/expert-ex4.png"),
          title:"고퀄리티 그래픽영상"
        },
        {
          img:require("../assets/images/expert-ex5.png"),
          title:"고퀄리티 유튜브 영상"
        }
      ]
    }
  },
  methods: {
    //로그인 해야 신청 가능하게
    goRegister(){
      let tokens=localStorage.getItem("access_token");
      if(tokens==null){
        alert('로그인 후 이용해주시길 바랍니다 :)');
      }else{
      this.registerOpen=true;
      this.registerSuccess=true;
      this.currentTab = 0
      }
    },
    // 신청하기 닫기
    registerClose () {
      this.registerOpen = false;
      location.href = '/expert'
      // const arr_type = document.getElementsByName('type[]');
      // const arr_length = document.getElementsByName('length[]');
      // const arr_option = document.getElementsByName('option[]');
      // const arr_period = document.getElementsByName('period[]');
      //   arr_type.forEach((v,index)=>{
      //     if (v.checked == true){
      //       v.checked = false;
            
      //     }
          
      //     if(v.checked===false){
      //       this.emptyChecked = true;
      //       console.log(v.checked)
      //       this.emptyForm();
      //     }
          
      //   });
        
        // this.registerOpen = false;
      // arr_type.forEach((v) => {
      //   console.log(v.checked); 
      //   if(v.checked == false){
      //     this.registerOut = true;
      //     if (this.registerOut == true) {
      //       this.registerOpen = false;
      //     } else {
      //      this.registerOpen = true;
      //     }
      //   } else {
      //     v.checked == false;
      //   }
        
      // })
        // for (this.i=0; this.i<arr_type.length; this.i++) {
        //    arr_type[this.i].checked = false;
        //     this.types[i].checked=false
        //     this.isTypeCk=false
        // }
        // for (var i=0; i<arr_length.length; i++) {
        //   arr_length[i].checked = false;
        //   //  console.log(arr_length[i].checked);
        //   this.isLengthCk=false
        // }
        // for (var i=0; i<arr_option.length; i++) {
        //   arr_option[i].checked = false;
        //   //  console.log(arr_option[i].checked);
        //   this.isOptionCk=false
        // }
        // for (var i=0; i<arr_period.length; i++) {
        //     arr_period[i].checked = false;
        //   //  console.log(arr_period[i].checked);
        //   this.isPeriodCk=false
        // }
        // if(this.isTypeCk=false){
        //     this.registerOpen = false;
        // }
        // this.registerSuccess=false
        // this.registerOpen = false;
    },
    emptyForm() {
      if(this.emptyChecked = true){ 
        this.registerOpen = false;      
      }
    },
    // 핸드폰번호 하이픈
    getPhoneMask(val) {
        let res = this.getMask(val)
        this.phoneNumber = res
        console.log(res)
    },
    getMask(contact) {
        if(!contact) return contact;
        contact = contact.replace(/[^0-9]/g, '')
        let res = ''
        if(contact.length < 3) {
            res = contact
        }
        else {
            if(contact.substr(0, 2) =='02') {
                if(contact.length <= 5) {//02-123-5678
                    res = contact.substr(0, 2) + '-' + contact.substr(2, 3)
                }
                else if(contact.length > 5 && contact.length <= 9) {//02-123-5678
                    res = contact.substr(0, 2) + '-' + contact.substr(2, 3) + '-' + contact.substr(5)
                }
                else if(contact.length > 9) {//02-1234-5678
                    res = contact.substr(0, 2) + '-' + contact.substr(2, 4) + '-' + contact.substr(6)
                }
            } else {
                if(contact.length < 4) { 
                    res = contact
                }
                else if(contact.length >= 4 && contact.length < 8){
                    res = contact.substr(0, 3) + '-' + contact.substr(3)
                }
                else if(contact.length >= 8){
                    res = contact.substr(0, 3) + '-' + contact.substr(3, 4) + '-' + contact.substr(7) 
                }
            }
        }
        return res
        },
    //다음 단계로
    goNext(e) {
      const arr_type = document.getElementsByName('type[]');
      const arr_length = document.getElementsByName('length[]');
      const arr_option = document.getElementsByName('option[]');
      const arr_period = document.getElementsByName('period[]');
      const agreeCk = document.querySelector('.agree-check');
      const user_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    //1단계 영상 유형
    if(e==0){
      for (let i=0;i<arr_type.length;i++) {  
        //하나라도 체크 됐을때
        if (arr_type[i].checked == true) {
          this.isTypeCk = true;
        }
      }
      if (!this.isTypeCk) {
        alert('영상유형을 선택해주세요.')
      }
      //기타가 체크 됐을때
      else if (arr_type[4].checked == true) {
          if (this.textarea1 == "") {
            alert('내용을 입력해주세요.'); 
            this.$refs.etc1.focus();
          } 
          else {
            this.currentTab = 1;
          }
      }
      //기타 내용만 있을때
      else if (this.textarea1!=""){
        if(arr_type[4].checked == false){
          alert("기타체크를 해주세요")
        }
      }
      //조건 충족시 
      else{
       this.currentTab = 1;
      }
    }
    //2단계 영상 길이
    if(e==1){
      for (let i=0;i<arr_length.length;i++) {  
        //하나라도 체크 됐을때
        if (arr_length[i].checked == true) {
          this.isLengthCk = true;
        }
      }
      if (!this.isLengthCk) {
        alert('영상길이를 선택해주세요.')
      }
      //기타가 체크 됐을때
      else if (arr_length[4].checked == true) {
          if (this.textarea2 == "") {
            alert('내용을 입력해주세요.'); 
            this.$refs.etc2.focus();
          } 
          else {
            this.currentTab = 2;
          }
      }
      //기타 내용만 있을때
      else if (this.textarea2!=""){
        if(arr_length[4].checked == false){
          alert("기타체크를 해주세요")
        }
      }
      //조건 충족시 
      else{
       this.currentTab = 2;
      }
    }
    //3단계 옵션선택
    if(e==2){
      const option_etc = document.getElementById('option_etc')
      for (let i=0;i<arr_option.length;i++) {  
        //하나라도 체크 됐을때
        if (arr_option[i].checked == true) {
          this.isOptionCk = true;
        }
      }
      if (!this.isOptionCk && (option_etc.checked == false)) {
        alert('영상옵션을 선택해주세요.')
        
      }
      //기타가 체크 됐을때
      else if (option_etc.checked == true) {
          if (this.textarea3 == "") {
            alert('내용을 입력해주세요.'); 
            this.$refs.etc3.focus();
          } 
          else {
            this.currentTab = 3;
          }
      }
      //기타 내용만 있을때
      else if (this.textarea3!=""){
        if(option_etc.checked == false){
          alert("기타체크를 해주세요")
        }
      }
      //조건 충족시 
      else{
       this.currentTab = 3;
      }
    }
    //4단계 기간
    if(e==3){
      for (let i=0;i<arr_period.length;i++) {
        //하나라도 체크 됐을때
        if (arr_period[i].checked == true) {
          this.isPeriodCk = true;
        }
      }
      if (!this.isPeriodCk) {
        alert('제작 기간을 선택해주세요.')
      }
      //조건 충족시 
      else{
       this.currentTab = 4;
      }
    }
    //5단계
    if(e==4){
      if ((this.userName && this.companyName && this.phoneNumber && this.userEmail) == "") {
        alert('정보를 모두 입력해주세요.')
      } 
      //이메일 조건문
      else if(!user_email.test(this.userEmail)){
          alert("올바른 형식의 메일을 입력하세요")
      }
      else if (!agreeCk.checked) {
          alert('개인정보 수집 및 이용에 동의해주세요.')
        } 
      //서버 전송
      else {
        this.registerOpen = false;
        this.registerCkOpen = true;
        this.currentTab = 5;
      }
    }
    },
    registerSend () {
      let tokens=localStorage.getItem("access_token")
        axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("access_token");
        axios.post('http://118.67.135.33/outsourcings/', {
          headers:{
            Authorization:`Bearer ${tokens}`
          },
          types:this.types,
          length:this.length,
          option:this.option,
          make_length:this.make_length,
          type_etc:this.textarea1,
          length_etc:this.textarea2,
          option_etc:this.textarea3,
          manager:this.userName,
          company:this.companyName,
          phone:this.phoneNumber,
          email:this.userEmail,
          request_etc:this.textarea4
        })
          .then(response => {
            console.log(response);
            alert('신청완료되었습니다.');
            this.currentTab = 6;
            setTimeout(function () { 
              location.href="/expert"
            }, 1000)
            })
          .catch(error => {
            console.log('요청이 실패하였습니다.');
            console.log(error.response);
          })
    },
    //3단계 옵션 전체 선택 
    checkAll () {
      const arr_option = document.getElementsByName('option[]');
      const all = document.querySelector('#all');
      if (all.checked == true) {
        for (let i=0;i<arr_option.length;i++) {
          arr_option[i].checked = true;
        }
      } else {
        for (let i=0;i<arr_option.length;i++) {
          arr_option[i].checked = false;
        }
      }
    },
}   
}
</script>