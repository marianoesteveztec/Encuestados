/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntaVotada = new Evento(this);
  this.preguntaBorrarTodo = new Evento(this);

  this.verificarLocalStorage();
};

Modelo.prototype = {

  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var auxId = -1;
    for(var i=0;i<this.preguntas.length;++i){
      if(this.preguntas[i].id > auxId){
        auxId = this.preguntas[i].id;
      }
    }
    return auxId;
  },

  obtenerPregunta: function(valor){
      var identificador;
      if(typeof valor == 'number'){
        identificador = 'id';
      }
      else{
        identificador = 'textoPregunta'
      }
      for(var i=0;i<this.preguntas.length;++i){
        if(this.preguntas[i][identificador] === valor){
          return this.preguntas[i];
        }
      }
      throw new Error("La pregunta no está definida");
    },


    //se agrega una pregunta dado un nombre y sus respuestas
    agregarPregunta: function(nombre, respuestas) {
      var id = this.obtenerUltimoId();
      id++;
      var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
      this.preguntas.push(nuevaPregunta);
      this.guardar();
      this.preguntaAgregada.notificar();
    },

  //se elimina una pregunta dado un Id
  borrarPregunta: function(IdPregunta) {
    //De todas las preguntas busco posicion con mismo Id y aplico Splice
    for(var i=0;i<this.preguntas.length;i++){
      if(this.preguntas[i].id === IdPregunta){
        this.preguntas.splice(i,1);
        break;
      }
    }
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  //Modifico sintaxis de pregunta
  editarPregunta: function(idPregunta,nuevaPregunta) {
    //Obtengo pregunta a modificar y aplico nuevo texto
    var auxPregunta = this.obtenerPregunta(idPregunta);
    auxPregunta.textoPregunta = nuevaPregunta;
    //Splice en la posicion de la regunta a modificar  con la nueva pregunta
    var preguntaModificar = this.preguntas.splice(this.preguntas.indexOf(this.obtenerPregunta(idPregunta)), 1, auxPregunta);
    this.guardar();
    this.preguntaEditada.notificar();
  },

  //Borrar todo
  borrarTodo: function(IdPregunta) {
    this.preguntas = []
    this.guardar();
    this.preguntaBorrarTodo.notificar();
  },

  //Agrego Voto
  agregarVoto:function(pregunta,opcionVotada){
    //Para cada opcion de la pregunta
    for(var i=0; i<pregunta.cantidadPorRespuesta.length;++i){
      //Si es la respuesta le sumo
      if (pregunta.cantidadPorRespuesta[i].textoRespuesta === opcionVotada) {
        var indicePregunta = -1;
        for(var j=0; j<this.preguntas.length; ++j){
          if(this.preguntas[j].textoPregunta === pregunta.textoPregunta){
            indicePregunta = j;
          }
        }
        pregunta.cantidadPorRespuesta[i].cantidad += 1;
        this.preguntas.splice(indicePregunta, 1, pregunta);
      }
    }
    this.guardar();
    this.preguntaVotada.notificar();
  },

  verificarLocalStorage: function(){
    if (localStorage.getItem('preguntas') !== null) {
      this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
    }
  },


  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },
};
