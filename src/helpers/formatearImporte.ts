function formatearImporte(numero: number, moneda = 'ARS', idioma = 'es-AR') {

   return new Intl.NumberFormat(idioma, {
     style: 'currency',
     currency: moneda,
     minimumFractionDigits: 2,
     maximumFractionDigits: 2
   }).format(numero);
 }

 export default formatearImporte;