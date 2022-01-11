import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage'
import EditorPage from '@/pages/EditorPage'
import MyPage from '@/pages/MyPage'
import ExpertPage from '@/pages/ExpertPage'
import CopyrightPage from '@/pages/CopyrightPage'
import NaverAccess from "../components/NaverAccess"

Vue.use(Router)
/*import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '1081604850885-i17bkadu4ifgpd8g30cjt00om4jv0rs3.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: true
}
Vue.use(GAuth, gauthOption)*/

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/editor',
      name: 'EditorPage',
      component: EditorPage,
      meta:{
        title:"COM,MA-편집페이지"
      }
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MyPage,
      meta:{
        title:"COM,MA-마이페이지"
      }
    },
    {
      path: '/expert',
      name: 'ExpertPage',
      component: ExpertPage,
      meta:{
        title:"COM,MA-전문가페이지"
      }
    },
    {
      path: '/copyright',
      name: 'CopyrightPage',
      component: CopyrightPage
    },
    {
      path: '/naver-access',
      name: 'NaverAccess',
      component: NaverAccess
    }
  ]
})

const DEFAULT_TITLE = 'COM,MA';
router.afterEach((to, from) => {
   
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
})
export default router;