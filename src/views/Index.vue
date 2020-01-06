<template>  
  <div class="index">    
    <Header/>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Login/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src

import Header from '@/components/Header.vue'
import Login from '@/components/Login.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Index',
  components: {
    Header,
    Login,
    Footer
  },
  created(){
    if(sessionStorage.getItem('token')){
      location.href = '/#/regiones';
    }
  }
}
</script>
