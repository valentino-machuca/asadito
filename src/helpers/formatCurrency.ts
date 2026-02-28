function formatCurrency(amount: number, currency = 'ARS', locale = 'es-AR') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

export default formatCurrency;
