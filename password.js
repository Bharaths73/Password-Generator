const inputSlider=document.querySelector('[data-lengthSlider]');
const lengthDisplay=document.querySelector("[data_lengthNumber]");
const passwordDisplay=document.querySelector('[data-passwordDisplay]');
const copyMsg=document.querySelector('[data-copyMsg]');
const copyBtn=document.querySelector('[data-copy]');
const upperCaseCheck=document.querySelector('#uppercase');
const lowerCaseCheck=document.querySelector('#lowercase');
const numbersCheck=document.querySelector('#numbers');
const symbolsCheck=document.querySelector('#symbols');
const indicator=document.querySelector('[data-indicator]');
const generator=document.querySelector('.generate-button');
const allcheckBox=document.querySelectorAll('input[type="checkbox"]');
const symbol='!@#$%^&*()+'

console.log("checkbox");
let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
setIndicator("#ccc")
async function copyContent()
{
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
    catch{
        copyMsg.innerText='fail';
    }
    copyMsg.classList.add('active');
    setTimeout(()=>{
        copyMsg.classList.remove('active');
    },2000);
}

function handleSlider()
{
   inputSlider.value=passwordLength;
   lengthDisplay.innerText=passwordLength;
   const mini=inputSlider.min;
   console.log(mini);
   const maxi=inputSlider.max;
   console.log(maxi);
   inputSlider.style.backgroundSize=((passwordLength-mini)*100/(maxi-mini))+"% 100%";
   console.log(inputSlider.style.backgroundSize)
}

function setIndicator(color)
{
   indicator.style.background=color;
   indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

inputSlider.addEventListener('input',function(event){
   passwordLength=event.target.value;
   handleSlider();
});

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    {
        copyContent();
    }
});

generator.addEventListener('click',function(){
     if(checkCount<=0)
     {
        return;
     }
     if(passwordLength<checkCount)
     {
        passwordLength=checkCount;
        handleSlider();
     }
     password="";
     /*if(upperCaseCheck.checked)
     {
        password+=getRandomUppercase();
     }
     if(lowerCaseCheck.checked)
     {
        password+=getRandomLowercase();
     }
     if(numbersCheck.checked)
     {
        password+=getRandomNumber();
     }
     if(symbolsCheck.checked)
     {
        password+=getSymbols();
     }*/

     let funcArr=[];
     
     if(upperCaseCheck.checked)
     {
        funcArr.push(getRandomUppercase);
     }
     if(lowerCaseCheck.checked)
     {
        funcArr.push(getRandomLowerCase);
     }
     if(numbersCheck.checked)
     {
        funcArr.push(getRandomNumber);
     }
     if(symbolsCheck.checked)
     {
        funcArr.push(getSymbols);
     }

     for(let i=0;i<funcArr.length;i++)
     {
        password+=funcArr[i]();
     }

     for(let i=0;i<passwordLength-funcArr.length;i++)
     {
       let randIndex= getRandomInteger(0,funcArr.length);
       password+=funcArr[randIndex]();
     }

     password=shufflePassword(Array.from(password));
     passwordDisplay.value=password;
     calcStrength();
});

function shufflePassword(array)
{
    for(let i=array.length-1;i>0;i--)
    {
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str='';
    array.forEach(el=>str+=el);
    return str;
}

function handleCheckboxChange()
{
    checkCount=0;
    allcheckBox.forEach(function(checkbox){
        if(checkbox.checked)checkCount++;
    });

    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleSlider();
    }
}

allcheckBox.forEach( (checkbox)=>{
    checkbox.addEventListener('change',handleCheckboxChange);
});


function getRandomInteger(min,max)
{
    let random=Math.floor(Math.random()*(max-min))+min;
    return random;
}

function getRandomNumber()
{
    return getRandomInteger(0,9);
}

function getRandomUppercase()
{
    return String.fromCharCode(getRandomInteger(65,91));
}

function getRandomLowerCase()
{
    return String.fromCharCode(getRandomInteger(97,123));
}

function getSymbols()
{
    const random=getRandomInteger(0,9);
    return symbol.charAt(random);   
}

function calcStrength()
{
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(upperCaseCheck.checked)
    {
        hasUpper=true;
    }
    if(lowerCaseCheck.checked)
    {
        hasLower=true;
    }
    if(numbersCheck.checked)
    {
        hasNum=true;
    }
    if(symbolsCheck.checked)
    {
        hasSym=true;
    }

    if(hasUpper && hasLower && (hasNum||hasSym) && passwordLength>=0)
    {
        setIndicator('#0f0');
    }
    else if((hasLower||hasUpper)&&(hasNum||hasSym)&&passwordLength>=6)
    {
        setIndicator('#ff0');
    }
    else{
        setIndicator('#f00');
    }
}
