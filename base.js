const util = require("util");

function execute(accPulsos, pulsos, delta, totalizador, litros) {
  var _totalizador = 0;

  if (!totalizador || totalizador.length === 0) {
    _totalizador = 0;
  } else {
    _totalizador = +totalizador[0].value;
  }

  if (delta > 0) {
    r = accPulsos / delta;
    ls = r * litros; // tenemos litros por segundo
  } else {
    // Init como si fuera el primer pulso
    ls = 0;
  }

  const litrosAgregados = pulsos * litros;

  const obj = {
    ls: ls,
    mt3: (ls * 60 * 60) / 1000,
    totalizador: _totalizador + litrosAgregados
  };

  return obj;
}

var container = {};

module.exports = {
  init: function(payload, litros, intervalo, thisId) {
    if (!container[thisId]) {
      container[thisId] = {};
      container[thisId]["cola"] = [];
    }

    cola = container[thisId]["cola"];

    // console.log("container", util.inspect(container, null, 4));

    var d = new Date();
    var ts = Date.parse(d) / 1000;
    var pulsos = payload.pulsos;
    var totalizador = payload.totalizador;

    // Usar cola para guardar reportes
    cola.push({
      pulsos: pulsos,
      ts: ts
    });

    // Achicar cola hasta contener reportes en relacion a intervalo
    var workCola = [];
    for (const reporte of cola.reverse()) {
      const pulsos = reporte.pulsos;
      // console.log("reporte", reporte);
      const delta = ts - reporte.ts;
      // console.log("delta", delta);
      workCola.push(reporte);
      if (delta >= intervalo) {
        // console.log("break");
        break;
      }
    }

    // Update cola general
    cola = workCola.reverse();
    // console.log("cola", cola);

    const totalPulsos = cola.reduce((acc, current) => acc + current.pulsos, 0);
    const tsFirstPulso = cola[0].ts;

    const colaLength = cola.length;
    let accPulsos = cola[colaLength - 1].pulsos - cola[0].pulsos;
    const delta = cola[colaLength - 1].ts - cola[0].ts;

    if (accPulsos < 0) {
      accPulsos = 0;
      cola = [];
      cola.push({
        pulsos: pulsos,
        ts: ts
      });
      console.log("isReset", true);
    }

    let data = execute(accPulsos, pulsos, delta, totalizador, litros);

    container[thisId]["cola"] = cola;

    return data;
  }
};
