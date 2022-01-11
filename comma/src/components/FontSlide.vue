<template>
  <div class="font-slide">
  <!-- 폰트 검색 -->
  <form @submit.prevent="onSubmit" ref="fontSearch" id="frm" name="frm" method="GET" enctype="application/x-www-form-urlencoded" action="./">
    <input type="text" class="fonts search" placeholder="폰트검색" v-model="fontSearch">
  </form>
    <!-- 카테고리 -->
    <div class="fonts cate">
      <ul>
        <li @click="all">전체</li>
        <li @click="cate('k')">한글</li>
        <li @click="cate('e')">영어</li>
        <li>cate3</li>
        <li>cate4</li>
      </ul>
    </div>
    <!-- 상세설정 박스 -->
    <p class="detail-p"> 폰트 상세 설정 </p>
    <div class="detail-box">
        <!-- 폰트 사이즈 -->
        <div class="font-size">
        <div class="detail-title">Size</div>
        <select class="size-select" @change="onChange($event)" v-model="key">
            <option value="사이즈 선택">사이즈 선택</option>
            <option value="16px">16 pt</option>
            <option value="18px">18 pt</option>
            <option value="20px">20 pt</option>
            <option value="24px">24 pt</option>
            <option value="28px">28 pt</option>
            <option value="32px">32 pt</option>
        </select>
        </div>
        <!-- 폰트 칼라 -->
        <div class="font-color">
            <div class="detail-title">Color</div>
            <ul class="font-colorchip">
                <li v-for="(color, $index) in fontsColor" :key="$index" :class="{active:currentColor == $index+1}" @click="fontColor(color.color), currentColor = $index+1" :style="{ 'background-color':color.color}"></li>
            </ul>
        </div>
    </div>
    <div class="total"> 전체 ( <div class="total-num">{{total}}</div> )</div>
    <!-- 폰트 리스트 -->
    <div class="fonts-box">
      <ul>
        <li v-for="(font, $index) in cfonts" :key="$index" :class="{active:currentFont == $index+1}" @click="fontSelect(font.name), currentFont = $index+1">
          <span class="apply">적용중</span>
          <img :src="font.url">
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: 'FontSlide',
  data() {
    return {
      f:"",
      c:"",
      key: "사이즈 선택",
      currentColor: 0,
      currentFont: 0,
      fontSearch:"",
      total:0,
      cfonts:[],
      fonts:[
        {
          name: "Mochiy Pop P One",
          url: require("../assets/images/mochipop.png"),
          lan: "영어"
        },
        {
          name: "chassam",
          url: require("../assets/images/KCCchassam.png"),
          lan: "한글"
        },
        {
          name: "Nanum Myeongjo",
          url: require("../assets/images/KCCchassam.png"),
          lan: "한글"
        },
        {
          name: "Roboto Condensed",
          url: require("../assets/images/KCCchassam.png"),
          lan: "영어"
        },
        {
          name: "Josefin Sans",
          url: require("../assets/images/KCCchassam.png"),
          lan: "영어"
        },
        {
          name: "Teko",
          url: require("../assets/images/KCCchassam.png"),
          lan: "영어"
        }
      ],
      fontsColor:[
      {color:'#9EF53D'},{color:'#BF66E8'},{color:'#745FF5'},{color:'#F55FB6'},{color:'#EEF5DC'},{color:'#ACFF94'},
      {color:'#F55F66'},{color:'#3EE6F5'},{color:'#E0E5E8'},{color:'#D411AA'},{color:'#EEE6FF'},{color:'#FF5F00'}
      ]
    }
  },
  mounted(){
    this.cfonts=this.fonts
    this.total=this.cfonts.length
  },
  methods:{
    //카테고리 전체보기
    all(){
      this.cfonts=this.fonts.filter(function(d,n,all){//새로운 배열에 filter걸기
        return d;
      });
      this.total=this.cfonts.length
    },
    //카테고리
    cate(e){
      switch (e){
        case "k":
        e="한글"
        break;
        case "e":
        e="영어"
        break;
      }
        this.cfonts=this.fonts.filter(function(d,n,all){//새로운 배열에 filter걸기
           let z=d.lan.indexOf(e);
            if(z!=-1){
                return d;
            }
        });
        this.total=this.cfonts.length
    },
    //검색
    onSubmit(){
      if(this.fontSearch==""){
        alert("검색어를 입력하세요.");
        this.$refs.fontSearch.focus();
        return false;
      }
      else{
        let e=this.fontSearch
        //폰트 이름 모두 소문자로 
        for(let i=0; i<this.fonts.length; i++){
          this.fonts[i].name=this.fonts[i].name.toLowerCase()
        }
        //검색 대소문자 관계없이
        this.cfonts=this.fonts.filter(function(d,n,all){
            let z=d.name.indexOf(e.toLowerCase());
            if(z!=-1){
                return d;
            }
        });
        this.total=this.cfonts.length
      }
    },
      // 폰트 사이즈 변경
      onChange(event) {
          // console.log(event.target.value)
          document.styleSheets[0].addRule('video::cue', 'font-size: '+event.target.value+'!important;'+', sans-serif;');
      },
      // 폰트 종류 변경
      fontSelect(f){
          this.f=f
          document.styleSheets[0].addRule('video::cue', 'font-family: '+this.f+'!important;');
      },
      // 폰트 칼라 변경
      fontColor(c){
        this.c=c
        document.styleSheets[0].addRule('video::cue', 'color:'+this.c+';');
      },
  }
}
</script>
