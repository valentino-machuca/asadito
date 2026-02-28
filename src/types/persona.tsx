export type Persona = {
    nombre: string;
    gasto_comida: string;
    gasto_bebida: string;
    come: boolean;
    toma: boolean;
}

export type Transaccion = {
    deudor: string;
    acreedor: string;
    monto: number;
}

export type SaldosResult = {
    transacciones_comida: Transaccion[];
    transacciones_bebida: Transaccion[];
}