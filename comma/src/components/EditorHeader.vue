<template>
  <div class="editor-header">
    <div class="left">
    <!-- 홈 화면 이동 -->
      <a href="/"><img src="../assets/images/home.png" alt="홈"></a>
    </div>   
    <div class="mid">
    <!-- redo / undo -->
      <div class="before-after-box">
        <a><img src="../assets/images/left-arrow.png" alt="실행취소"></a>
        <a><img src="../assets/images/right-arrow.png" alt="재실행"></a>
      </div>
      <div class="right">
        <a id="export" class="export" @click="exportOpen = true">Export</a>
        <a id="help" class="more" @click="helpOpen"><img src="../assets/images/threedots.png" alt="도움말"></a>
      </div>
    </div>     
    <!-- export(인코딩) -->
    <div class="export">
      <div class="white-bg" v-if="exportOpen">
        <div class="close-box" @click="exportOpen = false"></div>
        <export />
      </div>
    </div>
    <!-- help(도움말) -->
    <div class="help">
        <div class="white-bg" id="help-slide">
          <div class="close-box" @click="helpClose"></div>
          <div v-if="expertOpen == false">
          <ul class="help-list help-select" v-if="qnaListOpen == false">
            <li @click="expert">전문가에게 맡기기<a class="help-next btn"></a></li>
            <li @click="qnaOpen">HELP<a class="help-next btn"></a></li>
          </ul>
          </div>

        <!-- expert(전문가) -->
            <div class="expert" v-if="expertOpen == true">
              <div>
                <div>
                  <a @click="moreBack" class="back" alt="뒤로가기"></a>
                  <ul class="expert-contain">
                    <li>
                      <div class="expert-top">
                        <div>영상의 크리에이티브한 기획과<br>연출, 촬영, 섭외, CG그래픽까지<br>HIGH-Quality 영상제작 프로덕션</div>
                        <div class="expert-button" @click="findmedia">파인드미디어 바로가기</div>
                        <img src="../assets/images/findmedia.png" alt="파인드미디어">
                      </div>
                    </li>
                    <li>
                      <div class="expert-bottom">
                        <div>전문가가 직접 편집하는<br>영상 편집 맡기기</div>
                        <div type="button" class="expert-button" @click="expertGo">영상 편집 바로가기</div>
                        <img src="../assets/images/expert_go.png" alt="영상 편집 맡기기">
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          <!-- 문의사항 -->
          <div v-if="qnaListOpen == true">
          <div class="help">
            <a @click="moreBack" class="back" alt="뒤로가기"></a>
              <p class="help-title" ref="title">{{title}}</p>
              <!-- 문의사항 리스트 -->
              <ul class="help-list" v-if="qlist==true">
                  <li @click="question">영상 업로드, 편집<a @click="question" class="help-next btn"></a></li>
                  <li @click="question">자막 업로드, 편집<a @click="question" class="help-next btn"></a></li>
                  <li @click="question">폰트 스타일 적용<a @click="question" class="help-next btn"></a></li>
                  <li @click="question">배경음악 설정<a @click="question" class="help-next btn"></a></li>
                  <li @click="question">나레이션 설정<a @click="question" class="help-next btn"></a></li>
                  <li @click="question">편집완료 후 저장하기<a @click="question" class="help-next btn"></a></li>
                  <li @click="question">그 외 문의 및 건의사항<a @click="question" class="help-next btn"></a></li>
              </ul>
              <!-- 답변 -->
              <div  v-if="qlist==false">
                <a @click="listBack" class="back" alt="뒤로가기"></a>
                <div class="help-answer">답변은 어쩌고 저쩌고</div>
              </div>
            </div>
          </div>

      </div>
    </div>
    
    </div>
</template>

<script>
import Export from './Export'
import axios from 'axios'

export default {
  name: 'EditorHeader',
  data() {
    return {
      exportOpen : false,
      qnaListOpen: false,
      expertOpen : false,
      qlist:true,
      title:"이용 중 궁금하신점이 있으신가요?",
    }
  },
  components: {
    Export
  },
  mounted() {
  },
  methods:{
    //help(도움말) 켜기
    helpOpen(){
      let elem = document.getElementById("help-slide");
      elem.style.transition = "all .5s ease";
      elem.style.height = "200px";
      this.qnaListOpen = false;
      this.expertOpen=false;
    },
    //help(도움말) 끄기
    helpClose(){
      let elem = document.getElementById("help-slide");
      elem.style.transition = "all .5s ease-in-out";
      elem.style.height = "0px";
      elem.style.width = "300px";
      elem.style.left = "82%";
    },
    qnaOpen() {
      this.qnaListOpen = true;
      let elem = document.getElementById("help-slide");
      elem.style.transition = "all .5s ease";
      elem.style.height = "400px";
    },
    //전문가에게 맡기기 켜기
    expert(){
      this.expertOpen=true;
      let elem = document.getElementById("help-slide");
      elem.style.transition = "all .5s ease";
      elem.style.height = "600px"
      elem.style.width = "1000px";
      elem.style.left = "44%";

    },
     //리스트에서 뒤로가기
    moreBack(){
      this.expertOpen=false
      let elem = document.getElementById("help-slide");
      elem.style.transition = "all .5s ease";
      elem.style.height = "200px";
      elem.style.width = "300px";
      elem.style.left = "82%";
      this.qnaListOpen = false;
    },
    //help 답변에서 faq 리스트로
    listBack(){
      this.qlist=true;
    },
    //답변에서 뒤로가기
    back(){
        this.qlist=true
        this.title="이용 중 궁금하신점이 있으신가요?"
        let elem = document.getElementById("help-slide");
        elem.style.transition = "all .5s ease";
        elem.style.height = "200px";
        elem.style.width = "300px";
        this.$refs.title.style="font-weight:300;"
    },
    //문의사항 클릭
    question(e){
       let target=e.target;
       this.title=target.innerText;
       this.$refs.title.style="font-weight:600;"
       this.qlist=false
       this.expertOpen=false;
    },
    //파인드 미디어 이동
    findmedia(){
      window.open('http://findmedia.co.kr/')
    },
    //전문가에게 맡기기
    expertGo(){
      location.href="/expert-page"
    }
  }
}
</script>