import {
  buttonClickHandlar,
  buttonEnabled,
  convertEvaluate,
  buttonStatusHandlar,
  convert,
  percentClickHandler,
  percentStatusHandler,
  symbolsClick,
  buttonDisabled,
  
} from "./functions.js";
import { converteval } from "./functions.js";
//on threre i define all varriables and i was faced some issue with class query selector
document.addEventListener(`DOMContentLoaded`, run());
function run() {
  const inputDisplay = document.querySelector(`.display`);
  const outputDisplay = document.querySelector(`.display2`);
  const buttons = document.querySelectorAll(`.btn`);
  const inputType = document.getElementById(`inputtype`);
  const outputtype = document.getElementById(`outputtype`);
  const binaryBtn = document.querySelector(`.binaryBtn`);
  const decimelBtn = document.querySelectorAll(`.decimelBtn`);
  const hexaBtn = document.querySelectorAll(`.hexaBtn`);
  const octalBtn = document.querySelectorAll(`.octalBtn`);
  const dot = document.querySelector(`.dot`);
  const symbols = document.querySelectorAll(`.symbol`);
  const percents = document.querySelector(`.percent`);
  const ac = document.querySelector(`.ac`);
  const DEL = document.querySelector(`.del`);
buttonEnabled(percents);
 
  function updateOutputDisplay() {
    if (
      inputDisplay.innerHTML.includes(`+`) ||
      inputDisplay.innerHTML.includes(`-`) ||
      inputDisplay.innerHTML.includes(`X`) ||
      inputDisplay.innerHTML.includes(`÷`) ||
      inputDisplay.innerHTML.includes(`%`)
    ) {
    outputDisplay.innerHTML = convertEvaluate(inputDisplay.innerHTML, inputType.value, outputtype.value)===`NaN` ?`Input at least two valid numbers for perform any operation`: convertEvaluate(inputDisplay.innerHTML, inputType.value, outputtype.value)
    }
    else{
    outputDisplay.innerHTML = convert(
      inputDisplay.innerHTML,
      inputType.value,
      outputtype.value
    )}
  }

  // this function is called for update buttons initial status
  buttonStatusHandlar(
    binaryBtn,
    hexaBtn,
    decimelBtn,
    octalBtn,
    inputType.value
  );
  //end

  //this function or event listener will change the status of buttons when inputtype will change
  inputType.addEventListener(
    `change`,()=>{
    buttonStatusHandlar(
    binaryBtn,
    hexaBtn,
    decimelBtn,
    octalBtn,
    inputType.value
  )
    inputDisplay.innerHTML = ``;
    outputDisplay.innerHTML = ``;

    }
    
  );
  outputtype.addEventListener(`change`,()=>{
    updateOutputDisplay()
  })
  //end

  //this will run when any button will clicked
  buttons.forEach((button) => {
    button.addEventListener(`click`, (e) => {
      buttonClickHandlar(inputDisplay, e);
      updateOutputDisplay()
    });
  });
  symbols.forEach((symbol)=>{
    symbol.addEventListener(`click`,(e)=>{
      
      symbolsClick(e,inputDisplay,percents)
      
    })
  })
  //end

  //this is for AC or del
  ac.addEventListener(`click`, () => {
    inputDisplay.innerHTML = ``;
    outputDisplay.innerHTML = ``;
    buttonEnabled(percents)
  });

  DEL.addEventListener(`click`, () => {
    inputDisplay.innerHTML = inputDisplay.innerHTML.slice(0,-1)
    updateOutputDisplay(outputDisplay.innerHTML)
    percentStatusHandler(percents,inputDisplay)
  });
  percents.addEventListener(`click`,()=>{
    percentClickHandler(inputDisplay,percents,percents)
    updateOutputDisplay()
  })
}
//end
