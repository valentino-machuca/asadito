import calcularSaldos from "../../helpers/cuentas";

describe('Testeando calculadora de saldos: ', () => {
    test('must return [test1 => $500 => test2]', () => {
        const personas : Persona[] = [
            {nombre: 'test1', gasto_bebida: '0', gasto_comida: '500', come: true, toma: false},
            {nombre: 'test2', gasto_bebida: '0', gasto_comida: '1500', come: true, toma: false}
        ];
        const expectedresult : {deudor: string, acreedor: string, monto: number}[] = [{ deudor: 'test1', acreedor: 'test2', monto: 500 }]
        expect(calcularSaldos(personas)).toEqual(expectedresult);
    });

    // test('must return [test3 => $500 => test1], [test3 => $500 => test2], [test2 => $750 => test1]', () => {
    //     const personas : Persona[] = [
    //         {nombre: 'test1', gasto_bebida: '0', gasto_comida: '1500', come: true, toma: false},
    //         {nombre: 'test2', gasto_bebida: '0', gasto_comida: '1500', come: true, toma: true},
    //         {nombre: 'test3', gasto_bebida: '1500', gasto_comida: '0', come: true, toma: true}  
    //     ];
    //     const expectedresult : {deudor: string, acreedor: string, monto: number}[] = [
    //         { deudor: 'test3', acreedor: 'test1', monto: 500 },
    //         { deudor: 'test3', acreedor: 'test2', monto: 500 },
    //         { deudor: 'test2', acreedor: 'test3', monto: 750 },
    //     ]
    //     expect(calcularSaldos(personas)).toEqual(expectedresult);
    // });
});