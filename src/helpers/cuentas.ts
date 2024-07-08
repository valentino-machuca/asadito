function calcularSaldos(personas: Persona[]) {

  const personascomen = personas.filter(p => p.come);
  const personastoman = personas.filter(p => p.toma);

  return {
    transacciones_comida: calcularCampo(personascomen, 'gasto_comida'),
    transacciones_bebida: calcularCampo(personastoman, 'gasto_bebida'),
  }
}

function calcularCampo(personas: Persona[], campo: 'gasto_comida' | 'gasto_bebida') {
  const montoTotal = personas.reduce((acc, b) => acc + Number(b[campo]), 0);
  const promedioTotal = montoTotal / personas.length;

  const diferencias = personas.map((persona) => ({
    nombre: persona.nombre,
    diferencia: Number(persona[campo]) - promedioTotal,
  }));

  let deudores = diferencias.filter((p) => p.diferencia < 0);
  let acreedores = diferencias.filter((p) => p.diferencia > 0);

  const transacciones: {deudor: string, acreedor: string, monto: number}[] = [];

  deudores.forEach(deudor => {
    while (deudor.diferencia < 0) {
      let acreedor = acreedores.find(a => a.diferencia > 0);
      
      if (!acreedor) break;
      
      let pago = Math.min(-deudor.diferencia, acreedor.diferencia);
      
      transacciones.push({
        deudor: deudor.nombre,
        acreedor: acreedor.nombre,
        monto: pago
      });

      deudor.diferencia += pago;
      acreedor.diferencia -= pago;
    }
  });

  return transacciones;
}

export default calcularSaldos;