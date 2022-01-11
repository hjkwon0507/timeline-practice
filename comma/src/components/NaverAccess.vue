<template>
  <div class="naver-access">
  </div>
</template>
<script>
import axios from 'axios';
import Vue from 'vue';
import MainHeader from './MainHeader'
export default {
  name: 'NaverAccess',
  components:{
    MainHeader
  },
   mounted(){
      // Naver-access
       let param= document.location.href.split("access_token=");
       let token=param[1].split("&state=");
       console.log(localStorage.getItem('stayLogin'));
       console.log(token[0])
       axios.post('http://118.67.135.33/accounts/social-login/naver/', {
             access_token:token[0],
             code:"",
             id_token:""
           })
             .then(response => {
               //토근값이 유효할때
               if(response.status==200){
                 if(response.data.user.is_social!=""){
                   console.log('소셜로그인');
                   localStorage.setItem("is_social",response.data.user.is_social)
                 }
                 console.log(response);
                  let token=response.data.access_token
                  let r_token=response.data.refresh_token
                  //로컬스토리지에 토큰 담기
                  localStorage.setItem("access_token",token)
                  localStorage.setItem("refresh_token",r_token)
                  //로컬스토리지 토큰값 가져오기
                  let tokens=localStorage.getItem("access_token")
                  // 파라미터 없애기
                  window.location.replace(
                    "http://" + window.location.hostname + ((location.port==""||location.port==undefined)?"":":" + location.port) + "/"
                  );
               }
             })
             .catch(error => {
               console.log('로컬에 토큰 담기 실패.');
             })
    },
    methods:{
    }
}
</script>