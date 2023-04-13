const md5 = require('md5')
let axios = require('axios')

// let appkey='Z3HBZ-FDL3B-WS6US-JAMB3-F6LFZ-CSFTY'
// let SK='Tfy6ksm01lndbA80BFXW7yUFxkLHZsI'
// let mapDomain='https://apis.map.qq.com' 
// let queryPath ='/ws/geocoder/v1?'
// let queryLocation = '30.72024,111.32161'
// let queryParam = `key=${appkey}&location=${queryLocation}`

// let str = `${queryPath}${queryParam}${SK}`
// let sigStr = md5(str)

// // console.log(sigStr)


// let urlQuery = `${mapDomain}${queryPath}${queryParam}&sig=${sigStr}`
// // 使用encodeURI对urlQuery进行url编码
// let encodedUrlQuery = encodeURI(urlQuery); 

// // console.log(urlQuery)
// console.log(encodedUrlQuery);


// axios.get(encodedUrlQuery).then((response)=>{
//     console.log(response.data)
// }).catch(function(error){
//     console.log(error)
// })


let appkey='Z3HBZ-FDL3B-WS6US-JAMB3-F6LFZ-CSFTY'
let SK='Tfy6ksm01lndbA80BFXW7yUFxkLHZsI'
let mapDomain='https://apis.map.qq.com' 
let queryPath ='/ws/geocoder/v1?'
let getPoi='1'
let queryLocation = '30.58559,114.268802'

let paramObj ={}
Object.assign(paramObj,{'get_poi':getPoi},{'location':queryLocation},{'key':appkey})
// console.log(paramObj)
// Sort the members of paramArray object in ascending order according to the ASCII code corresponding to the key
const sortedParamArray = Object.keys(paramObj).sort().reduce((obj, key) => {
  obj[key] = paramObj[key];
  return obj;
}, {});
console.log(sortedParamArray)

// Use the sortedParamArray to construct the queryParam string
let queryParam = Object.keys(sortedParamArray).map(key => `${key}=${sortedParamArray[key]}`).join('&');
// console.log(queryParam)

let strSource = `${queryPath}${queryParam}${SK}`
let sigStr = md5(strSource)


// 使用encodeURI对urlQuery进行url编码
let encodedUrlQuery =  encodeURI(`${mapDomain}${queryPath}${queryParam}&sig=${sigStr}`)
// console.log(encodedUrlQuery);


axios.get(encodedUrlQuery).then((response)=>{
    console.log(response.data.result.pois)
    // console.log(response.data)
}).catch(function(error){
    console.log(error)
})


