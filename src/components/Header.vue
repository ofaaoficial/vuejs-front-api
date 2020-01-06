<template>
    <header class="header">
        <div class="navbar">
            <div class="navbar__title">ofaaoficial</div>
            <ul v-if="login" class="navbar__nav">            
                <li class="nav__item"><router-link to="/regiones">Regiones</router-link></li>
                <li class="nav__item"><router-link to="/platos">Platos</router-link></li>
                <li class="nav__item"><a href="#" v-on:click.prevent="Logout();">Salir</a></li>            
            </ul>        
        </div>
    </header>
</template>
<script>
export default {
  name: 'Header',
  data(){
      return {
          login : false,
      }
  },
  created(){
      this.login = this.validateLogin();
  },
  methods : {
      validateLogin(){
          if(sessionStorage.getItem('token')){
              return true;
          }
          location.href = '/#/';
          return false;
      },
      Logout(){
        sessionStorage.removeItem('token');
        location.href = '/#/';
      }     
  }  
}
</script>
<style>
/* Generales */
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
    text-decoration-line: none;
    list-style: none;
}

.container{
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
}

.title{
    
    font-size: 30px;
    font-weight: bold;        
    text-decoration-line: underline;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 100px;
}

.flex{
    display: flex;
}
    .flex--justify-center{
        justify-content: center;
    }

    .flex--align-center{
        align-items: center;
    }

/* Header */
.header{
    width: 100%;
    background-color: rgb(79, 236, 127);
    color: black;
    padding: 10px 0;
    border-bottom: 3px dotted rgb(100, 139, 112);
}

/* navbar */
.navbar{
    display: flex;
    align-items: center;
    padding: 0 20px;
}
    .navbar__title{
        width: 10%;
        font-size: 20px;
        font-weight: bold;
    }

.navbar__nav{     
    width: 90%;   
    display: flex;         
    justify-content: flex-end;
}
    .nav__item{
        margin-left: 20px;
        padding: 10px 20px;
    }

    .nav__item a{
        color: black;
    }

    .nav__item:hover{
        background-color: rgb(49, 150, 79);
        color: white;
        transition: .5s;
        border-radius: 5px;
    }
    .nav__item:hover a{            
        color: white;
        transition: .9s;
    }        
/* Tablas */
.table{
    border-collapse: collapse;
    width: 90%;
}
    .table thead{
        background-color: rgb(24, 155, 116);
        color: white;                
    }
    .table th, td{        
        border: 1px solid rgb(53, 53, 53);        
        padding: 15px 20px;
    }
    .table tr{
        background-color: rgb(241, 241, 241);
    }
    .table tr:hover{
        background-color: rgb(216, 216, 216);
    }
/* Botones */
.btn {
  padding: 10px 15px;
  border: 1px solid rgb(37, 37, 37);
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
  margin-left: 5px;
}

    .btn--crear {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: rgb(60, 194, 71);
    color: rgb(255, 244, 244);
    margin-left: auto;
    }
    .btn--crear:hover {
    transition: 1s;
    background-color: rgb(24, 131, 33);
    color: rgb(255, 244, 244);
    }
    .btn--editar {
    background-color: rgb(31, 168, 43);
    color: rgb(255, 244, 244);
    }
    .btn--editar:hover {
    transition: 1s;
    background-color: rgb(24, 131, 33);
    color: rgb(255, 244, 244);
    }
    .btn--borrar {
    background-color: rgb(168, 31, 31);
    color: rgb(255, 244, 244);
    }
    .btn--borrar:hover {
    transition: 1s;
    background-color: rgb(131, 24, 24);
    color: rgb(255, 244, 244);
    }
/*  Modal */
.modal{    
    display:none;
    top:0;
    padding-top:50px;
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.384);
    z-index: 1;
    
}
    .modal__active{
        overflow-y: hidden;
        overflow-x: hidden;
    }
    .modal__dialog{
        border-radius: 5px;
        background-color: white;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        padding-bottom: 20px;        
    }
    .modal__header, .modal__body,.modal__footer{
        padding: 20px;
    }

    .modal__header{      
        border-bottom: 2px solid rgb(206, 206, 206);
        border-radius: 5px;
    }
    .modal__close{
        float: right;
        text-decoration-line: none;      
    }    
/* Formularios */
.form, .input{
    width: 100%;
}
    .form__title{
        font-weight: bolder;
        margin-bottom: 20px;
    }
.input{
    padding: 10px;
    border: 1px solid rgb(126, 126, 126);
    border-radius: 3px;
    margin-top: 5px;    
}
.input:focus{    
    border: 1px solid rgb(43, 168, 190);    
}       

/* responsividad */
@media screen and (max-width: 870px){
    .navbar__nav, .navbar__title{
        flex-direction: column;
        width: 50%;
    }    

    .title{
        margin-left: 5px;
    }

    .table{
        min-width: 870px;
    }
        .table-responsive{
            overflow-x: scroll;
            padding: 20px;
        }    
}

</style>


