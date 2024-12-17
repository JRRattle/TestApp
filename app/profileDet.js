//global variables uid and email 
//used to extract uid and email from sign up and login 
//used to send the variables to a setDoc function 

var uid = ""; 
var email = "";


function setUid(value) {
    uid = value;
}

function getUid(){
    return uid;
}

function setGlobalEmail(value){
    email = value;
}

function getGlobalEmail(value){
    return email;
}

export {uid, email, setUid, getUid, setGlobalEmail, getGlobalEmail};  