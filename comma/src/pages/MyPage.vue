<template>
  <div class="mypage">
    <!-- Header -->
    <main-header />
    <!-- My Page -->
    <div class="inner">
      <p class="title">완료된 작업물</p>
      <p class="sub-title">내가 만든 작업물을 미리보고, 다운받아보세요!</p>
      <div class="project-container">
          <ul>
            <li v-for="(p, index) in list" :key="index">
              <img :src="p.image" class="project-img" >
              <div class="project-info">
                <p>{{ p.date }}</p>
                <a class="save-btn">다운로드</a>
                <a class="delete-btn" @click="deleteOpen = true">삭제</a>
              </div>
            </li>
          </ul>
      </div>
      <!-- 신청서 리스트 -->
      <p class="title">전문가에게 맡기기</p>
      <p class="sub-title">전문가에게 신청했던 내역을 확인해 보세요.</p>
      <table class="pd_table">
      <thead>
          <tr>
              <td>no</td>
              <td>
                <select @change="onChange()" id="state">
                  <option value="전체">전체</option>
                  <option value="신청완료">신청완료</option>
                  <option value="작업완료">작업완료</option>
                  <option value="작업중">작업중</option>
                </select>
              </td>
              <td>신청내용 (자세히 보려면 클릭해주세요)</td>
              <td>신청일</td>
              <td></td>
          </tr>
      </thead>
      {{lists}}
        <tbody v-if="part==1" class="tbody">
          
          <tr v-for="(p, index) in carrays" :key="index">
              <td>{{ea-index}}</td>
              <td>{{carrays[index].status}}</td>
              <td @click="showDetails(index)">
                <ul class="request">
                  <li>{{carrays[index].types[0]}} , {{carrays[index].types[1]}}</li>
                  <li>{{carrays[index].length}}</li>
                  <li>{{carrays[index].option[0]}}, {{carrays[index].option[1]}}</li>
                  <li>{{carrays[index].make_length[0]}}</li>
                </ul>
              </td>
              <td>{{(carrays[index].created_at).slice(0,10)}}</td>
              <td>
                <div class="del-btn" @click="delRequest(carrays[index].id)">
                  <img src="../assets/images/delete.png" alt="삭제">
                  <input type="button" value="삭제">
                </div>
              </td>
          </tr>
        </tbody>
          <tr v-else-if="part==2">
            <td colspan="4">등록된 신청서가 없습니다.</td>
          </tr>
      </table>
      <!-- 신청내용 팝업 -->
      <div class="black-bg" v-if="detailOpen == true">
        <div class="white-bg detail-white-bg">
          <div class="close-box">
            <button class="close-btn" @click="detailOpen = false"></button>
          </div>
          <div class="register-details">
            <p>{{(this.arrays[this.dIndex].created_at).slice(0,10)}} 신청내역</p>
            <ul class="detail-list">
              <li>1. 영상유형: {{this.arrays[this.dIndex].types[0]}} {{this.arrays[this.dIndex].types[1]}} {{this.arrays[this.dIndex].types[2]}} {{this.arrays[this.dIndex].types[3]}}</li>
              <li> &nbsp;&nbsp; ◾ 영상유형 기타내용: {{this.arrays[this.dIndex].type_etc}}
              <li>2. 영상길이: {{this.arrays[this.dIndex].length}}</li>
              <li> &nbsp;&nbsp; ◾ 영상길이 기타내용: {{this.arrays[this.dIndex].length_etc}}
              <li>3. 옵션추가: {{this.arrays[this.dIndex].option[0]}} {{this.arrays[this.dIndex].option[1]}} {{this.arrays[this.dIndex].option[2]}} {{this.arrays[this.dIndex].option[3]}}</li>
              <li> &nbsp;&nbsp; ◾ 영상옵션 기타내용: {{this.arrays[this.dIndex].option_etc}}
              <li>4. 제작기간: {{this.arrays[this.dIndex].make_length[0]}}</li>
              <li>
                5. 기타 정보 입력
                <ul>
                  <li>담당자명: {{this.arrays[this.dIndex].manager}}</li>
                  <li>연락처: {{this.arrays[this.dIndex].phone}}</li>
                  <li>회사명: {{this.arrays[this.dIndex].company}}</li>
                  <li>이메일: {{this.arrays[this.dIndex].email}}</li>
                  <li>기타요청사항: {{this.arrays[this.dIndex].request_etc}}</li>
                </ul>
              </li>
            </ul>
            <div class="del-btn" @click="delRequest(e)">
              <img src="../assets/images/delete.png" alt="삭제">
              <input type="button" value="삭제">
            </div>
          </div>
        </div>
      </div>
    </div>
    <a class="change-btn" id="change-btn" @click="personalOpen = true">비밀번호 변경</a>
    <!-- 삭제 팝업 -->
    <div class="black-bg" v-if="deleteOpen == true">
      <div class="white-bg delete-white-bg">
        <div class="close-box">
          <button class="close-btn" @click="deleteOpen = false"></button>
        </div>
        <div class="delete-ok">
          <p>정말로 삭제하시겠습니까?</p>
          <div class="yes-no">
            <a>네</a>
            <a @click="deleteOpen = false">아니오</a>
          </div>
        </div>
      </div>
    </div>
     <!-- 개인정보수정 팝업 -->
    <div class="black-bg" v-if="personalOpen == true">
      <div class="white-bg">
        <div class="close-box">
          <button class="close-btn" @click="personalOpen = false"></button>
        </div>
        <div class="change-form" v-if="personal == false">
          <p class="title">비밀번호 수정</p>
          <p class="notice">
            숫자, 영문, 특수문자 각 1자리 이상 포함하며,<br>
             8자 이상으로 설정해 주세요.
          </p>
            <ul class="change-form">
              <li class="password1-input">
                <img src="../assets/images/password.png" alt="현재 비밀번호">
                <input @click="onkeydown" ref="password" v-model="password" type="password" placeholder="현재 비밀번호" style="background-color:transparent;" autofocus>
              </li>
              
              <li class="password1-input">
                <img src="../assets/images/password.png" alt="변경할 비밀번호">
                <input @click="onkeydown" ref="password1" v-model="password1" type="password" placeholder="변경할 비밀번호" style="background-color:transparent;">
              </li>
             <li class="password2-input">
                <img src="../assets/images/password.png" alt="비밀번호 확인">
                <input @click="onkeydown" ref="password2" v-model="password2" type="password" placeholder="비밀번호 확인" style="background-color:transparent;">
              </li>
            </ul>
          <a class="blue-btn" @click="passChange">변경하기 </a>  
        </div>
        <!-- 수정완료 팝업 -->
        <div class="change-ok" v-if="personal == true">
          <p class="title">
            수정이<br>
            완료되었습니다.
          </p>
          <p>5초후 홈으로 돌아갑니다.</p>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <app-footer />
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import data from '../assets/projects.js'
import AppFooter from '../components/AppFooter.vue'
import axios from 'axios';
export default {
  components: { MainHeader, AppFooter },
  name: 'MyPage',
  data() {
    return {
      personalOpen:false,
      personal:false,
      deleteOpen : false,
      detailOpen : false,
      list : data,
      arrays:[],
      carrays:[],
      types:[],
      length:[],
      option:[],
      make_length:[],
      dIndex: 0,
      ea:0,
      part:1,
      e: "",
      password:"",
      password1:"",
      password2:""
    }
  },
  mounted() {
    //  console.log(localStorage.getItem("access_token"))
    let is_social=localStorage.getItem("is_social")
    if(is_social==="true"){
      document.getElementById("change-btn").style.display="none"
    }
  },
  methods:{
    //신청상태 카테고리 내용
    onChange(){
      let select=document.getElementById("state")
      let state=select.options[document.getElementById("state").selectedIndex].value;
      //새로운 배열에 filter걸기
      if(state=="전체"){
        this.carrays=this.arrays.filter(function(d,n,all){
          return d;
        });
      }
      else{
        this.carrays=this.arrays.filter(function(d,n,all){
           let z=d.status.indexOf(state);
            console.log(z);
              if(z!=-1){
                return d;
              }
        });
      }
    },
    //신청내용 삭제
    delRequest(e){ 
      // console.log(e);
      e = this.arrays[this.dIndex].id
      axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("access_token");
      axios.delete('http://118.67.135.33/outsourcings/'+e)
        .then(function (response) {
          // console.log(response);
          alert("해당 신청내역이 삭제되었습니다!")
          location.href="/mypage";
        })
        .catch(function (error) {
          console.log("요청 실패");
        })
    },
    //리스트 누르면 상세창
    showDetails (index) {
      this.detailOpen = true;
      this.dIndex = index
    },
    //비밀번호 변경 타이핑시 css변경
    onkeydown(e){
      let target=e.target
      target.parentNode.style.borderBottom="1px solid #555"
    },
    //비밀번호 수정
    passChange(){
      if (this.password=="") {
        alert("현재 비밀번호를 입력해주세요!");
        this.$refs.password.focus();
      }
      else if(this.password1=="" ||this.password2==""){
        alert("변경하실 비밀번호를 입력해주세요!");
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
      //조건문 통과시 서버 전송
      else{
        let token=localStorage.getItem('access_token');
        axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("access_token");
        axios.post('http://118.67.135.33/accounts/password/change/', {
          headers:{
            Authorization:`Bearer ${token}`
          },
          old_password:this.password,
          new_password1:this.password1,
          new_password2:this.password2,
        })
          .then(response => {
            if(response.request.status==200){
              alert("비밀번호가 정상적으로 수정되었습니다!")
            }
            this.personalOpen = false
            })
          .catch(error => {
            console.log('요청이 실패하였습니다.');
          })
      }
    },
  },
   computed:{
    lists(){//서버에서 신청서 불러오기
    // console.log(localStorage.getItem("access_token"));
    console.log(localStorage.getItem("access_token"));
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("access_token");
    axios
      .get('http://118.67.135.33/outsourcings/mine', {
      })
      .then(response => {
        console.log(response);
        if(!response.data.length==0){
              this.part===1 //신청서가 있을때
              this.arrays=response.data
              this.carrays=response.data
              this.ea=response.data.length
               for(let i=0; i<this.ea; i++){
                  let i2=this.arrays[i].types.length
                  for(let a=0;a<i2;a++){
                     //영상 타입
                     this.types_ea=a
                     switch(this.arrays[i].types[a]){
                       case "Youtube":
                       this.arrays[i].types[a]="유튜브";
                       break;
                       case "AD":
                       this.arrays[i].types[a]="광고";
                       break;
                       case "Promotion":
                       this.arrays[i].types[a]="홍보";
                       break;
                       case "Graphic":
                       this.arrays[i].types[a]="그래픽";
                       break;
                       case "etc":
                       this.arrays[i].types[a]="기타";
                       break;
                     }
                     //영상 길이
                    switch(this.arrays[i].length){
                      case "min_1":
                      this.arrays[i].length="1분 이내";
                      break;
                      case "min_5":
                      this.arrays[i].length="5분 이내";
                      break;
                      case "min_10":
                      this.arrays[i].length="10분 이내";
                      break;
                      case "min_30":
                      this.arrays[i].length="30분 이내";
                      break;
                      case "etc":
                      this.arrays[i].length="기타";
                      break;
                    }
                     for(let a=0;a<=i2;a++){
                      //영상 옵션
                      switch(this.arrays[i].option[a]){
                        case "All":
                        this.arrays[i].option[a]="모든 옵션"
                        break;
                        case "BGM":
                        this.arrays[i].option[a]="배경음악"
                        break;
                        case "Effect":
                        this.arrays[i].option[a]="효과음"
                        break;
                        case "Motion_Graphic":
                        this.arrays[i].option[a]="모션그래픽"
                        break;
                        case "Subtitle":
                        this.arrays[i].option[a]="자막"
                        break;
                        case "Correction":
                        this.arrays[i].option[a]="색보정"
                        break;
                        case "Narration":
                        this.arrays[i].option[a]="나레이션"
                        break;
                        case "etc":
                        this.arrays[i].option[a]="기타"
                        break;
                        }
                     }
                    //영상 제작기간
                     switch(this.arrays[i].make_length[0]){
                       case "week_1":
                       this.arrays[i].make_length[0]="1주일 이내"
                       break;
                       case "week_2":
                       this.arrays[i].make_length[0]="2주일 이내"
                       break;
                       case "month_1":
                       this.arrays[i].make_length[0]="1달 이내"
                       break;
                       case "After_Consulting":
                       this.arrays[i].make_length[0]="상담 후"
                       break;
                       }
                      //제작 상태
                     switch(this.arrays[i].status){
                       case "requested":
                       this.arrays[i].status="신청완료"
                       break;
                       case "working":
                       this.arrays[i].status="작업중"
                       break;
                       case "done":
                       this.arrays[i].status="작업완료"
                       break;
                       }
                  }
              }
          }
          else{//신청서가 없을때
              this.part=2
          }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
}
</script>