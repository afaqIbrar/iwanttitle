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
        callback([address, `NO Data found against the URL${url}`])
    })
}
const getTitle = (body) => {
    let match = body.match(/<title>([^<]*)<\/title>/);
    if (!match || typeof match[1] !== 'string')
        throw new Error('Error while parsing the data No data found');
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
    .then(result =>[address, getTitle(result)])
    .catch((error) => {
        console.log(error);
    return 'No Data Found Against Url';
})

module.exports = { getTitle, fetchRequest, getCorrectUrls, getPromiseData}