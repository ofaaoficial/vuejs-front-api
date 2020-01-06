<template>
    <div>
        <Header/>

        <div class="container">
            
            <div class="flex">
                <h2 class="title">Platos</h2>              
                <button class="btn btn--crear" v-on:click="crearPlato()">Crear</button>
            </div>
            
            <div class="flex flex--justify-center table-responsive">                
                <table class="table">
                    <thead>
                        <th>id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Region</th>
                        <th colspan="2">
                            Options
                        </th>
                    </thead>
                    <tbody>
                        <tr v-for="plato in platos" v-bind:key="plato.id">
                            <th>{{ plato.id }}</th>
                            <td>{{ plato.name }}</td>
                            <td>{{ plato.description }}</td>
                            <td><img :src="plato.image"/></td>
                            <td>{{ plato.region_id }}</td>
                            <td>
                                <button class="btn btn--editar" v-on:click="editarPlato(plato)">Editar</button>
                                <button class="btn btn--borrar" v-on:click="borrarPlato(plato.id)">Borrar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="modal" id="modal-create">
            <div class="modal__dialog">
                <div class="modal__header">
                    Crear plato
                    <a href="#" class="modal__close" v-on:click.prevent="closeModal('modal-create')">x</a>
                </div>
                <form class="form" v-on:submit.prevent="almacenarPlato();">   
                    <div class="modal__body">                        
                        <input type="text" class="input" placeholder="Name" v-model="plato.name">
                        <input type="text" class="input" placeholder="Description" v-model="plato.description">                      
                        <input type="text" class="input" placeholder="URL image" v-model="plato.image">
                        <input type="text" class="input" placeholder="Region id" v-model="plato.region_id">                      
                    </div>
                    <div class="modal-footer">
                    <button type="submit" class="btn btn--editar">Crear</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="modal" id="modal-edit">
            <div class="modal__dialog">
                <div class="modal__header">
                    Editar plato
                    <a href="#" class="modal__close" v-on:click.prevent="closeModal('modal-edit')">x</a>
                </div>
                <form class="form" v-on:submit.prevent="actualizarPlato();">   
                    <div class="modal__body">                        
                        <input type="text" class="input" placeholder="Name" v-model="plato.name">
                        <input type="text" class="input" placeholder="Description" v-model="plato.description">                      
                        <input type="text" class="input" placeholder="URL image" v-model="plato.image">
                        <input type="text" class="input" placeholder="Region id" v-model="plato.region_id">                      
                    </div>
                    <div class="modal-footer">
                    <button type="submit" class="btn btn--editar">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>        
        <Footer/>
    </div>    
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default {
  name: "Platos",
  components: {
    Header,
    Footer
  },
  created() {
    this.obtenerPlatos();
  },
  data() {
    return {
      platos: [],
      plato: { id: "", name: "", description: "", image: "", region_id: "" }
    };
  },
  methods: {
    obtenerPlatos() {
        axios.get("http://localhost/DC_ServerSide_A/public/api/platos?token=" + sessionStorage.getItem("token"))
        .then(response => {
          this.platos = response.data;
        });
    },
    crearPlato() {
        this.plato = { id: "", name: "", description: "", image: "", region_id: "" };
        document.querySelector('#modal-create').style.display = 'block';
        document.getElementsByTagName('body')[0].className = 'modal__active';
    },
    almacenarPlato(){
        axios.post("http://localhost/DC_ServerSide_A/public/api/platos?token=" + sessionStorage.getItem("token"),{
            name : this.plato.name,
            description : this.plato.description,
            image : this.plato.image,
            region_id : this.plato.region_id            
        })
        .then(response => {
            this.plato.id = parseInt(this.platos.length) + 2;
            this.platos.push(this.plato);
            this.plato = { id: "", name: "", description: "", image: "", region_id: "" };            
            this.closeModal('modal-create');
            alert("Plato creado correctamente");
        }).catch(error => {
            console.log(error);
            alert("data cannot be processed");
        });
    },
    editarPlato(plato) {
        this.plato = plato;        
        document.querySelector('#modal-edit').style.display = 'block';
        document.getElementsByTagName('body')[0].className = 'modal__active';
    },
    actualizarPlato() {
        axios.put("http://localhost/DC_ServerSide_A/public/api/platos/" +this.plato.id+"?token=" + sessionStorage.getItem("token"),{
            name : this.plato.name,
            description : this.plato.description,
            image : this.plato.image,
            region_id : this.plato.region_id            
        })
        .then(response => {                        
            this.plato = { id: "", name: "", description: "", image: "", region_id: "" };            
            this.closeModal('modal-edit');
            alert("Plato actualizado correctamente");
        }).catch(error => {
            console.log(error);
            alert("data cannot be processed");
        });
    },
    borrarPlato(id) {
        axios.delete("http://localhost/DC_ServerSide_A/public/api/platos/" +id+"?token=" + sessionStorage.getItem("token"),{
            id : id,            
        })
        .then(response => {                        
            this.obtenerPlatos();                    
            alert("Plato eliminado correctamente");
        }).catch(error => {
            console.log(error);
            alert("data cannot be processed");
        });
    },
    closeModal(modal){
        document.getElementsByTagName('body')[0].classList.remove('modal__active');         
        document.querySelector('#'+modal).style.display = 'none';              
    }
  }
};
</script>


