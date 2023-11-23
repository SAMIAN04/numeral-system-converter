//on threre i define all varriables and i was faced some issue with class query selector
document.addEventListener(`DOMContentLoaded`,run());
function run() {
const inputDisplay = document.querySelector(`.display`);
const outputDisplay = document.querySelector(`.display2`);
const buttons = document.querySelectorAll(`.btn`);
const inputType = document.getElementById(`inputtype`)
const outputtype = document.getElementById(`outputtype`)
const hexabtn = document.querySelectorAll(`.r`)
const forbin = document.querySelectorAll(`.forbin`) 
const foroct1 = document.getElementById(`foroct1`)
const foroct2 = document.getElementById(`foroct2`) 
const dot = document.querySelector(`.dot`)     
let input = ``; 
  hexabtn.disabled = true;
 dot.addEventListener(`click`,dotfun)
   function dotfun() {
    alert(`This feature is not availaible yet.I will add this feature soon insaallah.`)
   }
   buttons.forEach(button=>{
    button.addEventListener(`click`,handleButtonClick)
    });
function handleButtonClick(click) {
  const key = click.target.dataset.key;
  input = key;
   inputDisplay.innerHTML += input;
   if (key == `c`) {
    inputDisplay.innerHTML = ``
   }
   else if (key == `d`){
    inputDisplay.innerHTML = inputDisplay.innerHTML.slice(0,-2)
   }
   
   convert()
}
inputType.addEventListener(`change`,buttonHandler)

function buttonHandler() {
hexabtn.forEach(element => {
  element.disabled = false
   
   if (inputType.value == `10`) {
    element.disabled = true ;
    element.style.backgroundColor = `#cbcbcb83`
  }
  else if (inputType.value == `2`){
    element.disabled = true ;
    element.style.backgroundColor = `#cbcbcb83`
  }
  
  else if (inputType.value == `16`) {
    element.disabled = false;
    element.style.backgroundColor =  ` #fbabb8`;
    element.style.color = ``
  }
  if (inputType.value == `8`){
    element.disabled = true ;
    element.style.backgroundColor = `#cbcbcb83`
}});
forbin.forEach(element =>{
element.disabled = false ;
if (inputType.value == `2`) {
  element.disabled = true;
}})
octal();
convert()}
outputtype.addEventListener(`change`,convert)
function convert() {
  try {
    const inputBase = document.getElementById(`inputtype`).value;
    const outputBase = document.getElementById(`outputtype`).value;
    input = inputDisplay.innerHTML
    const decimalValue = parseInt(input,inputBase)
    const convertedValue = decimalValue.toString(outputBase).toUpperCase()
    outputDisplay.innerHTML = convertedValue;
if (convertedValue == `NAN`) {
      outputDisplay.innerHTML =``;
    }
  } catch (error) {
    outputDisplay.innerHTML = `input something valid`;
  }
}
function octal() {
  foroct1.disabled = false;
  foroct2.disabled = false;
  if (inputType.value == `8`) {
    foroct1.disabled = true;
    foroct2.disabled = true;
  }
  else if (inputType.value == `2`){
    foroct1.disabled = true;
    foroct2.disabled = true;
  }
}
setInterval(() => {
  buttonHandler()
}, 10);

}
//Hey if you are seeing this code I hope you will make something
//better than it. I was made this using my android phone. You have computer
//man go ahead and make something great.
