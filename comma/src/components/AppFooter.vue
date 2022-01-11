<template>
  <div class="app-footer">
    <div class="inner">
      <div class="footer-top">
        <ul class="footer-left">
          <li><a>이용약관</a></li>
          <li><a>개인정보처리방침</a></li>
          <li><router-link :to="{ name: 'CopyrightPage' }">저작권처리방침</router-link></li>
        </ul>
        <ul class="footer-right">
          <li><a>인스타그램</a></li>
          <li><a>유튜브</a></li>
          <li><a>페이스북</a></li>
          <li><a>블로그</a></li>
        </ul>
      </div>
      <div class="footer-bottom">
        <h1>(주)파인드커넥트</h1>
        <ul>
          <li>대표 : 박현준</li>
          <li>사업자 등록번호 : 618-86-01352 <a>[사업자번호조회]</a></li>
          <li>통신판매번호 : 제 2019-서울성동-01462호</li>
          <li>메일 : tech@findconnect.co.kr</li>
          <li>서울시 성동구 상원12길 30, 동진아이티타워 311호 (우편번호 04793)</li>
        </ul>
        <p>&copy; findconnect all rights reserved</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>