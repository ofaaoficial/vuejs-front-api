<template>
  <div>    
    <div class="login">
      <form class="form" v-on:submit.prevent="validateLogin()">      
        <h2>Ingresar al sistema</h2>
        <input type="text" class="input" placeholder="Email" v-model="data.email">
        <input type="password" class="input" placeholder="Password" v-model="data.password">
        <button class="btn btn--crear">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',  
  components : {
  },
  data(){
    return {
      data : {
        email : '',
        password : ''
      }
    }
  },
  methods : {
    validateLogin(){      
      axios.post('http://localhost/DC_ServerSide_A/public/api/login',{
        email : this.data.email,
        password : this.data.password
      }).then(response => {
        sessionStorage.setItem('token', response.data.token);
        location.href = '/#/regiones';
      }).catch(error => {
        alert('invalid login');
      });
    }
  }
}
</script>
<style scoped>
  .login {
    width:30%; 
    margin-left:auto; 
    margin-right:auto; 
    margin-top:100px;
    background-color: rgb(253, 253, 253);
    border: 1px solid rgb(179, 179, 179);
    border-radius: 5px;
    padding: 20px;
  }

</style>

