import md5 from 'md5'
import path from 'path'
import axios from 'axios'

import * as fs from "fs";
import { readFile, set_fs, utils } from "../node_modules/xlsx/xlsx.mjs";
set_fs(fs);


import { config } from '../config/config.js'

let { appkey, SK, mapDomain, queryPath, getPoi } = config

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

let tablePath = path.join(process.cwd(), config.filePath)
let tableResult = {}

function importTable() {
    // Get all files in the directory with the specified extensions
    let files = fs.readdirSync(tablePath).filter(file => {
        return file.endsWith('.xlsx') || file.endsWith('.csv') || file.endsWith('.xls');
    });

    // Loop through each file and read its contents
    for (let file of files) {
        let workbook = readFile(path.join(tablePath, file));
        let wsnames = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[wsnames];
        // 获取表头
        // let tableHeader = Object.keys(utils.sheet_to_json(worksheet)[0])
        let tableRows = utils.sheet_to_json(worksheet)
        tableResult[file] = tableRows
    }

    return tableResult

}


function getLocation(locationStr) {
    let paramObj = {}
    Object.assign(paramObj, { 'get_poi': getPoi }, { 'location': locationStr }, { 'key': appkey })
    // console.log(paramObj)
    // Sort the members of paramArray object in ascending order according to the ASCII code corresponding to the key
    const sortedParamArray = Object.keys(paramObj).sort().reduce((obj, key) => {
        obj[key] = paramObj[key];
        return obj;
    }, {});

    // Use the sortedParamArray to construct the queryParam string
    let queryParam = Object.keys(sortedParamArray).map(key => `${key}=${sortedParamArray[key]}`).join('&');
    // console.log(queryParam)

    let strSource = `${queryPath}${queryParam}${SK}`
    let sigStr = md5(strSource)

    // 使用encodeURI对urlQuery进行url编码
    let encodedUrlQuery = encodeURI(`${mapDomain}${queryPath}${queryParam}&sig=${sigStr}`)
    // console.log(encodedUrlQuery);
    return encodedUrlQuery

}

function addResolveCloud(url) {
    return axios.get(url).then((response) => {
        let { address, formatted_addresses, poi_count, pois } = response.data.result
        return {
            address, formatted_addresses, poi_count, pois
        }
    }).catch(function (error) {
        console.log(error)
    })
}

function addStrRegex(addStr, addRegex) {
    let matches = addStr.match(addRegex)
    if (matches) {
        // const province = matches[1] || '';
        // const city = matches[2] || '';
        // const district = matches[3] || '';
        // const town = matches[4] || '';
        // const road = matches[5] || '';
        // const number = matches[6] || '';
        // const building = matches[7] || '';
        // const unit = matches[8] || '';
        // const room = matches[9] || '';
        let addStandard = ['province', 'city', 'district', 'town', 'road', 'number', 'building', 'unit', 'room']
        let resultArr = []
        for (let i = 1; i <= addStandard.length; i++) {
            let obj = { [addStandard[i]]: matches[i] }
            resultArr.push(obj)
        }
        return resultArr
    } else {
        throw Error('地址不正确')
    }
}



export {
    importTable,
    getLocation,
    addResolveCloud,
    addStrRegex
}

