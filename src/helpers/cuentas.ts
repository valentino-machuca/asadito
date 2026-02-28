import type { Persona, SaldosResult, Transaccion } from '../types/persona';

/**
 * Calcula las transacciones necesarias para saldar cuentas entre un grupo de personas,
 * separando independientemente los gastos de comida y de bebida.
 *
 * Cada persona participa solo en los pools que le corresponden:
 * - `come: true`  → entra en el cálculo de comida
 * - `toma: true`  → entra en el cálculo de bebida
 * - Ninguno       → no se le cobra nada (acompañante)
 *
 * Si ningún participante está en un pool (p.ej. nadie marcó `come`),
 * la función retorna un array vacío para esa categoría en lugar de dividir por cero.
 */
export function calcularSaldos(personas: Persona[]): SaldosResult {
    const personascomen = personas.filter(p => p.come);
    const personastoman = personas.filter(p => p.toma);

    return {
        transacciones_comida: calcularCampo(personascomen, 'gasto_comida'),
        transacciones_bebida: calcularCampo(personastoman, 'gasto_bebida'),
    };
}

/**
 * Dado un grupo de personas y un campo de gasto, calcula quién le debe plata a quién
 * usando un algoritmo greedy: empareja deudores con acreedores minimizando transacciones.
 *
 * Retorna un array vacío si no hay participantes (protección contra división por cero).
 */
function calcularCampo(
    personas: Persona[],
    campo: 'gasto_comida' | 'gasto_bebida'
): Transaccion[] {
    if (personas.length === 0) return [];

    const montoTotal = personas.reduce((acc, p) => acc + Number(p[campo]), 0);
    const promedioTotal = montoTotal / personas.length;

    const diferencias = personas.map(persona => ({
        nombre: persona.nombre,
        diferencia: Number(persona[campo]) - promedioTotal,
    }));

    const deudores = diferencias.filter(p => p.diferencia < 0);
    const acreedores = diferencias.filter(p => p.diferencia > 0);

    const transacciones: Transaccion[] = [];

    deudores.forEach(deudor => {
        while (deudor.diferencia < 0) {
            const acreedor = acreedores.find(a => a.diferencia > 0);
            if (!acreedor) break;

            const pago = Math.min(-deudor.diferencia, acreedor.diferencia);

            transacciones.push({
                deudor: deudor.nombre,
                acreedor: acreedor.nombre,
                monto: pago,
            });

            deudor.diferencia += pago;
            acreedor.diferencia -= pago;
        }
    });

    return transacciones;
}

export default calcularSaldos;
