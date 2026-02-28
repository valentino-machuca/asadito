type PointGroup = number[];
type TeamScore = PointGroup[];

/**
 * Adds a point to the team's score.
 * Points are grouped in sets of 5 (like matchsticks).
 * When the current group reaches 5, a new group is started.
 * Does nothing if the team has already reached 30 points.
 */
export const addPoint = (array: TeamScore): TeamScore => {
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
 * Removes the last point from the team's score.
 * If the last group becomes empty, it is removed as well.
 */
export const deletePoint = (array: TeamScore): TeamScore => {
    if (array.length === 0) return array;

    if (array[array.length - 1].length === 1) {
        array.pop();
    } else {
        array[array.length - 1].pop();
    }

    return array;
};
