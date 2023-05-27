let config = {
    filePath: 'file_items',
    appkey: 'Z3HBZ-FDL3B-WS6US-JAMB3-F6LFZ-CSFTY',
    SK: 'Tfy6ksm01lndbA80BFXW7yUFxkLHZsI',
    mapDomain: 'https://apis.map.qq.com',
    queryPath: '/ws/geocoder/v1?',
    translatePath:'/ws/coord/v1/translate?',
    translateType:3,
    getPoi: '1',
    durationSec: 260,
    addressRegex: /^(\S+省|自治区|特别行政区)?(\S+市|地区|自治州|盟)?(\S+区|县|市|旗|海域|岛)?(\S+镇|街道)?(\S+路|街|道)?(\S+号)?(\S+栋|楼)?(\S+单元)?(\S+室)?$/
}

export {
    config
}