const key = "90327800bfdfaf7f8fa90038c6d9a53bc8fee0bcKxyLMvRb1bTodl1ZKCyl63bBQ"
const request = require('request');

const sendText = (phone,message)=>{
            request.post('https://textbelt.com/text', {
            form: {
                phone: phone.toString(),
                message,
                key,
            },
        }, (err, httpResponse, body) => {
            console.log(JSON.parse(body));
        });
}

module.exports = sendText