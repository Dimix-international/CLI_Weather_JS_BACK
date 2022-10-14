#!/user/bin/env node
//файл будет запускаться node js


import {getArgs} from './helpers/args.js';
import {printHelp, printSuccess, printError, printWeather} from './servises/log-service.js';
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from './servises/storage-service.js';
import {getIcon, getWeather} from "./servises/api-servise.js";

const saveToken = async (token) => {

    if(!token.length) {
        printError('Not token!');
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Token was saved');
    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {

    if (!city.length) {
        printError('Not city!');
        return
    }
    try {
        await getWeather(city);
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('City was saved');
    } catch (e) {
        printError(e.message)
    }
}

const getForcats = async () => {
    try {
        const city = await getKeyValue('city');
        const weather = await getWeather(process.env.CITY ?? city);
        printWeather(weather, getIcon(weather.weather[0].icon));

    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Incorrect city');
        } else if (e?.response?.status === 401) {
            printError('Incorrect token');
        } else {
            printError(e.message);
        }
    }
}

const initCLI = () => {
    // console.log(process.env); //переменные окружения
    // console.log(process.argv); //аргументы командной строки
    const args = getArgs(process.argv);
    //если передадим h, - То args.h равен true
    //если передадим s, moscow - То args.s равен moscow

    console.log(args);
    // node weather.js -s результат  { s: true }
    // node weather.js -s -h результат { s: true, h: true }
    // node weather.js -s moscow -h результат { s: 'moscow', h: true }
    if (args.h) {
      return  printHelp();
    }

    if (args.s) {
        return saveCity(args.s)
    }

    if (args.t) {
        return saveToken(args.t)
    }

   return getForcats();

};

initCLI();