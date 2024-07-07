function calcularSaldos(personas: Persona[]) {

  // Filtrar las personas que comen y las que toman
  const comensales = personas.filter(persona => persona.come);
  const bebedores = personas.filter(persona => persona.toma);

  // Calcular el monto total y el promedio para comida y bebida
  const totalComida = comensales.reduce((acc, p) => acc + Number(p.gasto_comida), 0);
  const totalBebida = bebedores.reduce((acc, p) => acc + Number(p.gasto_bebida), 0);
  const promedioComida = totalComida / comensales.length;
  const promedioBebida = totalBebida / bebedores.length;

  // Calcular las diferencias para cada persona
  const diferencias = personas.map(persona => {
    const difComida = persona.come ? Number(persona.gasto_comida) - promedioComida : 0;
    const difBebida = persona.toma ? Number(persona.gasto_bebida) - promedioBebida : 0;
    return {
      nombre: persona.nombre,
      diferencia: difComida + difBebida,
    };
  });

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