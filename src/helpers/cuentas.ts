function calcularSaldos(personas: {nombre: string, monto: string}[]) {
  const montoTotal = personas.reduce((acc, b) => acc + Number(b.monto), 0);
  const promedioTotal = montoTotal / personas.length;

  const diferencias = personas.map((persona) => ({
    nombre: persona.nombre,
    diferencia: Number(persona.monto) - promedioTotal,
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