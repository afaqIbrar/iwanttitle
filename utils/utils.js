const https = require('https');
const fetchRequest = (url, address, callback = () => { }) => {
    https.get(url, (res) => {
        let data = ''
        res.setEncoding('utf8');
        if (res.statusCode === 301 || res.statusCode === 302) {
            const newUrl = res.headers.location
            https.get(newUrl, function (res) {
                res.on('data', (d) => {
                    data += d
                })
                res.on('end', () => {
                    callback([address, getTitle(data)])
                })
            })
        }
        else {
            res.on('data', (chunk) => {
                data += chunk
            })
            res.on('end', () => {
                callback([address, getTitle(data)])
            })
        }
    }).on('error', (e) => {
        console.error(e);
        callback([address, 'NO RESPONSE'])
    })
}
const getTitle = (body) => {
    let match = body.match(/<title>([^<]*)<\/title>/);
    if (!match || typeof match[1] !== 'string')
        throw new Error('Unable to parse the title tag');
    return match[1];
}
const getCorrectUrls = (addresses) => {
    const regex = new RegExp('^https://');
    return addresses.map(address => 
        !regex.test(address)
          ? 'https://' + address.replace('http://', '') + '//'
          : address + '/'
    )
}

const getPromiseData = (url , address) => fetch(url)
    .then(response => response.text())
    .then(body =>[address, getTitle(body)])
    .catch((error) => {
    console.log(`error while fetching URL(${url}) :`, error);
    return 'NO RESPONSE';
})

module.exports = { getTitle, fetchRequest, getCorrectUrls, getPromiseData}