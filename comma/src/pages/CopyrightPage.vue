<template>
  <div class="copyright-page">
    <!-- Header -->
    <main-header />
    <!-- Start -->
    <div class="copyright-contain">
    <div class="inner">
        test
    </div>
    </div> 
    <!-- Footer -->
    <app-footer />
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import AppFooter from '../components/AppFooter.vue';

export default {
  name: 'CopyrightPage',
  components: {
    MainHeader,
    AppFooter,
  },
  methods:{

  }
}
</script>