<template>
  <div class="export">
    <p class="export-title">{{title}}</p>
    <button type="button"  class="export-btn blue-btn" @click="encoding" v-if="loading==false">인코딩 시작 </button>
    <!-- 로딩바 -->
    <div class="loading-bar" v-else>0%</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Export',
  data() {
    return {
        title:"작업을 완료하시겠습니까?",
        loading:false
    }
  },
  mounted(){

  },
  methods: {
    //인코딩시작 버튼
    encoding(){
        this.title="인코딩 중입니다...";
        this.loading=true
      }
    }
}
</script>

