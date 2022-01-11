<template>
  <div class="text-slide">
    <a class="upload-btn">텍스트파일 업로드</a>
    <!-- 드래그 박스 -->
    <div class="upload-box drag-area-sub">
      <div class="drop" id="srt" style="display: none;"></div>
      <p class="header-sub">이 곳에 영상에 넣을 자막파일을 끌어다 업로드 하세요</p>
      <input type="file" name="file" id="file-sub" accept="text/plain" hidden @change="uploadSrt">
    </div>
    <p>업로드 가능 파일: srt</p>
    <!-- 자막 수정 -->
    <div class="text-input">
      <p>자막 직접입력 / 수정</p>
      <textarea class="text-output" id="output" v-model="tasks" placeholder="자막 텍스트 파일이 없다면 이곳에 직접 입력/수정하세요."></textarea>
    </div>
    <!-- 영상에 자막 적용 -->
    <a class="upload-btn" @click="convert">텍스트 적용</a>
  </div>
</template>
<style scoped>

</style>
<script>
export default {
  name: 'TextSlide',
  data() {
    return {
      tasks: ""
    }
  },
  methods: {
    uploadSrt(){
      const inputFile = document.getElementById("file-sub");
      const srt = document.getElementById("srt");
      const file = inputFile.files[0];
      const srturl = URL.createObjectURL(file);
      srt.setAttribute("src", srturl);
    },
    //srt 파일 -> vtt로 수정 후 영상에 입히기
    convert() {
      let input = document.getElementById("output");
      let output;
      let srt = input.value;
      let webvtt = srt2webvtt(srt);
      
      function srt2webvtt(data) {
        let srt = data.replace(/\r+/g, '');
        srt = srt.replace(/^\s+|\s+$/g, '');
        let cuelist = srt.split('\n\n');
        let result = "";

        if (cuelist.length > 0) {
          result += "WEBVTT\n\n";
          for (let i = 0; i < cuelist.length; i=i+1) {
            result += convertSrtCue(cuelist[i]);

          let dynamicSubtitle= result
          const trackBlob=new Blob ([dynamicSubtitle],{
              type:"text/plain;charset=utf=8"
              });
              const trackUrl=URL.createObjectURL(trackBlob);
              document.querySelector("#caption-track").src=trackUrl;
          }
        }
        return result;
      }
      function convertSrtCue(caption) {
        let cue = "";
        let s = caption.split(/\n/);
        const createDiv = document.createElement('div');
        const textChartBox = document.querySelector('.text-chart .chart-box');

        while (s.length > 3) {
            for (let i = 3; i < s.length; i++) {
                s[2] += "\n" + s[i]
                textChartBox.appendChild(createDiv).setAttribute("id", "text-el1");
                document.querySelector('#text-el1').innerHTML = s[2];
                
            }
            s.splice(3, s.length - 3);
            
            
        }
        let line = 0;
        // 숫자 제거
        s[0] = s[0].replace(/[0-9]/g,"");
        if (!s[0].match(/\d+:\d+:\d+/) && s[1].match(/\d+:\d+:\d+/)) {
          cue += "";
          line += 1;
        }
        if (s[line].match(/\d+:\d+:\d+/)) {
        // srt 시간 로직 -> vtt 시간 로직으로 변경
          let m = s[1].match(/(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/);
          if (m) {
            cue += m[1]+":"+m[2]+":"+m[3]+"."+m[4]+" --> "
                  +m[5]+":"+m[6]+":"+m[7]+"."+m[8]+"\n";
            line += 1;            
          } 
        // Unrecognized timestring
          else {
            return "";}
        } 
        // file format error or comment lines
        else {
          return "";}

        // get cue text
        if (s[line]) {
          cue += s[line] + "\n\n";
        }
        return cue;
      }
    },
    
  },
}
</script>
