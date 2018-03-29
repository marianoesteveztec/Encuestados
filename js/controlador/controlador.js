/*
 * Controlador
 */
  var Controlador = function(modelo) {
    this.modelo = modelo;
  };

  Controlador.prototype = {
    agregarPregunta: function(pregunta, respuestas) {
        this.modelo.agregarPregunta(pregunta, respuestas);
    },

    eliminarPregunta : function() {
      var idPregunta = parseInt($('.list-group-item.active').attr('id'));
      //console.log(idPregunta); controlo que tome bien el id
      if (idPregunta != -1){
        this.modelo.borrarPregunta(idPregunta);
      }
    },
    editarPregunta: function(){
      var idPregunta = parseInt($('.list-group-item.active').attr('id'));
      if (idPregunta != -1)
          var nuevaPregunta = prompt('Editar pregunta:', '');
      if (nuevaPregunta)
        this.modelo.editarPregunta(idPregunta,nuevaPregunta);
    },
    agregarVoto: function(pregunta,opcionVotada) {
      this.modelo.agregarVoto(pregunta,opcionVotada);
    },
    preguntaBorrarTodo: function(){
      this.modelo.borrarTodo();
    },

  };
