module.exports = {
    "username"      : 'test',
    "password"      : 'test',
    "database"      : 'fondoo',
    "host"          : 'localhost',
    "dialect"       : 'mongodb',
    "encrypt_type"  : 'sha256',
    "encrypt_key"   : '4b 8?((~FKnpD))>8kb!B |#-uXIO24G3rc:&MG+FR{x;r#Uq4k{Ef@F4E9^-qS!', //change hash key
    "apiKey"        : 'Your API KEY', //put your apiSecret as a token, this will be used as the auth header when sending requests
    "lifetime"      : 1209600,
    "security"      : {
        "tokenLife"     : 3600
    }
}