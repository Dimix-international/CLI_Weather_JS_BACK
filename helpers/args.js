
const getArgs = (args) => {

    const res = {};
    const [executer, file, ...rest] = args;

    // yarks либа делает преобразования

    rest.forEach((value, index, array) => {
        //проверим если начинается аргумент с дефиса
        if (value.charAt(0) === '-') {

            if (index === array.length - 1) {
                res[value.substring(1)] = true
            } else if (array[index + 1].charAt(0) !== '-') {
                res[value.substring(1)] = array[index + 1]
            } else {
                res[value.substring(1)] = true
            }

        }
    });

    return res;

}

export { getArgs };
