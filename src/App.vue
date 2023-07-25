<template>
  <div id="app">
    <nav>
      <div class="header">
        <img src="./assets/img/logo.png" alt="logo">
        <p>QQ音乐</p>
      </div>
      <div class="menu">
        <NavLeft></NavLeft>
      </div>
    </nav>
    <section>
      <header>
        <HeaderRight></HeaderRight>
      </header>
      <article>
        <router-view></router-view>
      </article>
      <footer>
        <FooterRight></FooterRight>
      </footer>
    </section>
  </div>
</template>

<script>
import NavLeft from './pages/nav/NavLeft.vue';
import FooterRight from './pages/section/footer/FooterRight.vue';
import HeaderRight from './pages/section/header/HeaderRight.vue'
import router from './router/index';
import axios from 'axios';

export default {
  name: 'App',
  router,
  components: {
    NavLeft,
    HeaderRight,
    FooterRight
  },
  mounted() {
    axios.get("/music.json").then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  },
  methods: {
  }
}
</script>

<style> * {
   margin: 0;
   padding: 0;
   user-select: none;
 }

 #app {
   width: 1020px;
   height: 690px;
   background-color: black;
   margin: 0 auto;
   display: flex;
   background-image: url(assets/img/背景图片.jpg);
 }

 nav>.header {
   width: 210px;
   height: 80px;
 }

 nav>.menu {
   width: 210px;
   height: 610px;
 }

 nav>.header>img {
   height: 25px;
   margin-top: 25px;
   margin-left: 40px;
 }

 nav>.header>p {
   width: 80px;
   height: 21px;
   margin-top: -28px;
   margin-left: 70px;
   color: white;
 }

 section {
   width: 810px;
   height: 690px;
   background-color: rgba(0, 0, 0, 0.5);
 }

 section>header {
   width: 810px;
   height: 80px;
   color: white;
 }

 section>article {
   width: 810px;
   height: 535px;
 }

 section>footer {
   width: 810px;
   height: 75px;
   color: white;
 }
</style>
