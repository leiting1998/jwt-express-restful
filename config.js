const port = process.env.PORT || 3000;
const connexionString = 'mongodb://localhost/test';
const jwtKey = 'secret'

module.exports = {
    port: port,
    connexionString: connexionString,
    jwtKey: jwtKey
}




