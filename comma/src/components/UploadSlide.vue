<template>
  <div class="upload-slide">
  <div v-if="loading==false">
    <a class="upload-btn">영상파일 업로드</a>
    <div class="upload-box drag-area">
      <p class="upload-header">이 곳에 제작할 영상파일을 끌어다 업로드 하세요</p>
      <input type="file" name="file" id="file" accept="video/mp4,video/mkv,video/x-m4v,video/*" hidden >
    </div>
        <p>업로드 가능 파일: mp4</p>
        <div style="position: fixed;top: 20rem;padding: 1.5rem; border: 3px solid gray;">
            <h4 style='color: #4141ff;'>Control box</h4>
            <button type="button" id='deleteBtn' class='btn btn-danger btn-sm'>선택 구간 삭제</button>
            <button type="button" id='undo' class='btn btn-warning btn-sm'>구간 삭제 취소</button>
            <br><br>
            <button type="button" id='play' class='btn btn-success btn-sm'>재생</button>
            <br><br>
            <button type="button" id='cutting' class='btn btn-primary btn-sm'>잘라낸 뒤 프레임생성</button>
            <br><br>
            <button type="button" id='apply' class='btn btn-info btn-sm'>최종적용 & 영상 생성</button>
            <div id='downloadLinkArea'>
                <br>
                <h4>* 생성된 파일 목록</h4>
            </div>
        </div>
        <div class='curtain'>작업을 진행 합니다.....</div>
  </div>
  <!-- 업로드 로딩바 -->
    <div v-if="loading">
    <div class="loading-contain">
      <img src="../assets/images/uploading.png">
      <div class="loaging-circle">
    <div class="loaging-inner"></div>
    <div class="loaging-number">{{loadingNumber}}</div>
    <div class="circle">
      <div class="bar left">
        <div class="progress"></div>
      </div>
      <div class="bar right">
        <div class="progress"></div>
      </div>
    </div>
  </div>
      <div class="loading-title">영상이 업로드 되고 있습니다...</div>
    </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'UploadSlide',
  data(){
    return {
      // handleSelected,
      loading:false,
      loadingNumber:"0 %"
    }
  },
  mounted(){
    //로딩바 구현
    const numb = document.getElementsByClassName("loading-number");
    let counter = 0;
    setInterval(() => {
      if(counter == 100 ){
        clearInterval();
      }
      else{
        counter+=1;
        this.loadingNumber = counter + "%";
      }
    }, 80);
  },
  methods:{
    handleSelected(e) {
      console.log(e);
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        addListeners(reader);
        reader.readAsDataURL(selectedFile);
      }
    }
  }
}
</script>
