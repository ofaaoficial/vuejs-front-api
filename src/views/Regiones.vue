<template>
  
<!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  <div>    
    <Header/>

    <div class="container">
      <div class="flex">
        <h2 class="title">Regiones</h2>
        <button v-on:click="crearRegion();" class="btn btn--crear">Crear region</button>           
      </div>
    </div>
    <div class="flex flex--justify-center table-responsive">
      <table class="table">
          <thead>
              <th>id</th>
              <th>name</th>
              <th>description</th>
              <th colspan="2">options</th>
          </thead>
          <tbody>
              <tr v-for="region in regiones" v-bind:key="region.id">
                  <td>{{ region.id }}</td>
                  <td>{{ region.name }}</td>
                  <td>{{ region.description }}</td>
                  <td>
                    <button class="btn btn--editar" v-on:click="editarRegion(region)">Editar</button>                    
                  </td>
              </tr>
          </tbody>
      </table>
    </div>    
    <div class="modal" id="modal-create">
      <div class="modal__dialog">
        <div class="modal__header">
            Crear region
            <a href="#" class="modal__close" v-on:click.prevent="closeModal('modal-create')">x</a>
        </div>
        <form class="form" v-on:submit.prevent="almancenarRegion();">   
        <div class="modal__body">            
            <input type="text" class="input" placeholder="Name" v-model="region.name">
            <input type="text" class="input" placeholder="Description" v-model="region.description">                      
        </div>
        <div class="modal__footer">
          <button type="submit" class="btn btn--editar">Actualizar</button>
        </div>
        </form>
      </div>
    </div>

    <div class="modal" id="modal-edit">
      <div class="modal__dialog">
        <div class="modal__header">
            Editar region
            <a href="#" class="modal__close" v-on:click.prevent="closeModal('modal-edit')">x</a>
        </div>
        <form class="form" v-on:submit.prevent="actualizarRegion();">   
        <div class="modal__body">            
            <input type="text" class="input" placeholder="Name" v-model="region.name">
            <input type="text" class="input" placeholder="Description" v-model="region.description">                      
        </div>
        <div class="modal__footer">
          <button type="submit" class="btn btn--editar">Actualizar</button>
        </div>
        </form>
      </div>
    </div>


    <Footer/>
  </div>  
</template>

<script>
import axios from 'axios';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Regiones',    
  components : {
    Header,
    Footer
  },
  data(){
    return {
      regiones : [],
      region : { id: '', name: '', description : '' },      
    }
  },
  created (){
      this.obtenerRegiones();
  },
  methods : {
    obtenerRegiones(){      
      axios.get('http://localhost/DC_ServerSide_A/public/api/regiones?token=' + sessionStorage.getItem('token')).then(response => {
        this.regiones = response.data;        
      });
    },
    almancenarRegion(){
      if(this.crearRegion.name != '' && this.crearRegion.description != ''){
        axios.post('http://localhost/DC_ServerSide_A/public/api/regiones?token=' + sessionStorage.getItem('token'),{
          name : this.region.name,
          description : this.region.description
        }).then(response =>{ 
          this.closeModal('create');
          this.regiones.push(this.region);
          this.region = { id: '',name: '', description : '' };
          alert('Region creada correctamente');          
        }).catch(error => {
          alert(error);
        });
      }
    },
    crearRegion(){
      document.querySelector('#modal-create').style.display = 'block';
      document.getElementsByTagName('body')[0].className = 'modal__active';
    },
    editarRegion(region){
      this.region = region;
      document.querySelector('#modal-edit').style.display = 'block';
      document.getElementsByTagName('body')[0].className = 'modal__active';
    },    
    actualizarRegion(){
      axios.put('http://localhost/DC_ServerSide_A/public/api/regiones/'+ this.region.id +'?token=' + sessionStorage.getItem('token'),{
        name : this.region.name,
        description : this.region.description,
      }).then(response => {
        this.closeModal('modal-edit');
        this.region = { id: '', name: '', description : '' };
        alert('Region actualizada correctamente');
        
      }).catch(error => { alert(error); console.log(error) });      
    },    
    closeModal(modal){
      document.getElementsByTagName('body')[0].classList.remove('modal__active');         
      document.querySelector('#'+modal).style.display = 'none';
    }
  }
}
</script>

