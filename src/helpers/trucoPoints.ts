type PuntosGrupo = number[];
type TableroEquipo = PuntosGrupo[];

/**
 * Agrega un punto al equipo. Los puntos se agrupan de a 5 (como fósforos).
 * Cuando el grupo actual llega a 5, crea uno nuevo.
 * No hace nada si el equipo ya alcanzó los 30 puntos.
 */
export const addPoint = (array: TableroEquipo): TableroEquipo => {
    const flatArray = array.flat();

    if (flatArray.length >= 30) return array;

    const lastNumber = flatArray[flatArray.length - 1];
    const number = lastNumber < 5 ? lastNumber + 1 : 1;

    if (array.length > 0) {
        if (array[array.length - 1].length === 5) {
            array.push([number]);
        } else {
            array[array.length - 1].push(number);
        }
    } else {
        array.push([number]);
    }

    return array;
};

/**
 * Elimina el último punto del equipo.
 * Si el último grupo queda vacío, lo elimina también.
 */
export const deletePoint = (array: TableroEquipo): TableroEquipo => {
    if (array.length === 0) return array;

    if (array[array.length - 1].length === 1) {
        array.pop();
    } else {
        array[array.length - 1].pop();
    }

    return array;
};
