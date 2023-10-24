module.exports = function (RED) {
  var base = require('./base')

  function pulsosFlow (config) {
    RED.nodes.createNode(this, config)
    var node = this
    var thisId = this.id
    var litros = config.litros
    var intervalo = config.intervalo
    this.on('input', function (msg) {
      var pulsos = msg.payload
      // check for overriding message properties
      if (msg.litros) {
        litros = msg.litros
      }
      if (!litros) {
        litros = 100
      }
      if (msg.intervalo) {
        intervalo = msg.intervalo
      }
      if (!intervalo) {
        intervalo = 60
      }
      var data = base.init(pulsos, litros, intervalo, thisId)
      msg.payload = data
      node.send(msg)
    })
  }
  RED.nodes.registerType('pulsos-flow', pulsosFlow)
}
