import chalk from 'chalk'; // для покраски
import dedent from "dedent-js"; //убирает отступы

const printError = (error) => {
    console.log(chalk.bgRed(`Error ${error}`))
}

const printSuccess= (ms) => {
    console.log(chalk.bgGreen(`Success -  ${ms}`))
}

const printHelp = () => {
    console.log(dedent`
        ${chalk.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для сохранения токена
    `)
};

const printWeather = (res, icon) => {
    const { name, weather, main, wind } = res || {};
    console.log(dedent`
        ${chalk.bgBlue(' WEATHER ')}
        Погода в городе  ${name}
        ${icon} ${weather[0].description}
        Температура: ${main.temp} (ощущается как ${main.feels_like})
        Влажность: ${main.humidity}%
        Скорость ветра: ${wind.speed}m/s
    `)
};


export {printError, printSuccess, printHelp, printWeather}