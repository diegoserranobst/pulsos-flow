var container = {}

function execute(payload, litros, intervalo, thisId) {

  var lastReporte = 0
  var lastPulsos = 0

  if (!container[thisId]) {
    container[thisId] = {}
    container[thisId]['lastReporte'] = 0
    container[thisId]['lastPulsos'] = 0
  } else {
    lastReporte = container[thisId]['lastReporte']
    lastPulsos = container[thisId]['lastPulsos']
  }

  console.log('container', container)

  var nowPulsos = payload.pulsos
  var totalizador = payload.totalizador
  var _totalizador = 0;

  if (!totalizador || totalizador.length === 0) {
    _totalizador = 0;
  } else {
    _totalizador = +totalizador[0].value
  }

  var d = new Date();
  var ts = Date.parse(d) / 1000;

  var delta, r, ls
  var pulsos = 0;

  const isReset = nowPulsos < lastPulsos
  if (isReset) {
    // loguear para analisis
    console.log('isReset', isReset)
    console.log('nowPulsos', nowPulsos)
    console.log('lastPulsos', lastPulsos)
  }

  if (lastReporte && !isReset) {
    delta = ts - lastReporte;

    // Q&D: Si hay 2 medidas en el mismo momento, ajustar para no dividir por 0
    if (delta === 0) {
      delta = 0.01;
    }

    pulsos = nowPulsos - lastPulsos;

    r = pulsos / delta;

    ls = r * litros; // tenemos litros por segundo
  } else {
    // Init como si fuera el primer pulso
    ls = 0;
  }

  lastReporte = ts;
  lastPulsos = nowPulsos;

  container[thisId]['lastReporte'] = lastReporte
  container[thisId]['lastPulsos'] = lastPulsos

  const litrosAgregados = pulsos * litros;

  const obj = {
    ls: ls,
    mt3: (ls * 60 * 60) / 1000,
    totalizador: _totalizador + litrosAgregados
  };

  return obj;
}

module.exports = {
  init: function(payload, litros, intervalo, thisId) {
    let data = execute(payload, litros, intervalo, thisId);
    return data;
  }
};
