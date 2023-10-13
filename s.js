let password="";
let passwordLength=20;
let lengthRange=document.getElementById('rangeInput');
let displaylength=document.getElementById('displayLength');
let display=document.getElementById('display');
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
setLength();
lengthRange.addEventListener("change",function(event){
    passwordLength=event.target.value;
    setLength();
})
function setLength(){
     displaylength.innerHTML=passwordLength;
     lengthRange.value=passwordLength;
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomNumber(min=0,max=9){
    return randomNumber(min,max);
}

function generateLowerCase() {  
    return String.fromCharCode(generateRandomNumber(97,123))
}

function generateUpperCase() {  
 return String.fromCharCode(generateRandomNumber(65,91))
}

function generateSymbol() {
    const randNum =generateRandomNumber(0, symbols.length);
    return symbols.charAt(randNum);
}
// doing nessasary additon
let checkcount=0;
let uppercase=document.getElementById('uppercase');
let lowercase=document.getElementById('lowercase');
let numbers=document.getElementById('includenumbers');
let addsymbols=document.getElementById('includesymbols');
uppercase.addEventListener('change',handlecheck);
lowercase.addEventListener('change',handlecheck);
numbers.addEventListener('change',handlecheck);
addsymbols.addEventListener('change',handlecheck);
function handlecheck(){
    checkcount=0;
    if(lowercase)checkcount++;
    if(uppercase)checkcount++;
    if(numbers)checkcount++;
    if(addsymbols)checkcount++;
}
function generatePassword(){
    if(checkcount>passwordLength){
        passwordLength=checkcount;
    }
    if(passwordLength<=0){return}
    let funcArr = [];

    if(uppercase.checked)
        funcArr.push(generateUpperCase);

    if(lowercase.checked)
        funcArr.push(generateLowerCase);

    if(numbers.checked)
        funcArr.push(generateRandomNumber);

    if(addsymbols.checked)
        funcArr.push(generateSymbol);
    password="";
    for(let i=0; i<funcArr.length; i++) {
            console.log(password);
            password += funcArr[i]();
    }
    console.log(password);
    // doing other addition
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let index=generateRandomNumber(0,funcArr.length);
        password+=funcArr[index]();
    }
    console.log(funcArr.length);
    
    display.value=password;
}
async function copytoclip(){
    if(display.value){
    await navigator.clipboard.writeText(display.value);
    alert('text copied successfully');
    }
    return ;
}
