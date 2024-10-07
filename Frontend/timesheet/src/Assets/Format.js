let signup = {
    "username": {
        "type": "text",
        "name": "username",
        "defaultValue": "Username",
        "required": true
    },
    "orgName": {
        "type": "text",
        "name": "orgName",
        "defaultValue": "Full name",
        "required": true
    },
    "emailId": {
        "type": "email",
        "name": "emailId",
        "defaultValue": "email@gmail.com",
        "required": true
    },
    "mobileNo": {
        "type": "text",
        "name": "mobileNo",
        "defaultValue": "Mobile Number",
        "required": false
    },
    "password": {
        "type": "password",
        "name": "password",
        "defaultValue": "Password",
        "required": true
    }
}

let login = {
    "username": {
        "type": "text",
        "name": "username",
        "defaultValue": "Username",
        "required": true
    },
    "password": {
        "type": "password",
        "name": "password",
        "defaultValue": "Password",
        "required": true
    }
}

exports.login = login;
exports.signup = signup;