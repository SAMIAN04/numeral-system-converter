//on threre i define all varriables and i was faced some issue with class query selector
document.addEventListener(`DOMContentLoaded`, run());
function run() {
  const inputDisplay = document.querySelector(`.display`);
  const outputDisplay = document.querySelector(`.display2`);
  const buttons = document.querySelectorAll(`.btn`);
  const inputType = document.getElementById(`inputtype`);
  const outputtype = document.getElementById(`outputtype`);
  const hexabtn = document.querySelectorAll(`.r`);
  const forbin = document.querySelectorAll(`.forbin`);
  const foroct1 = document.getElementById(`foroct1`);
  const foroct2 = document.getElementById(`foroct2`);
  const dot = document.querySelector(`.dot`);
  let input = ``;
  hexabtn.disabled = true;
  dot.addEventListener(`click`, dotfun);
  //function for `.` dot
  function dotfun() {
    if (inputDisplay.innerHTML.includes(`.`)) {
      return;
    } else {
      inputDisplay.innerHTML += `.`;
    }
  }
  buttons.forEach((button) => {
    button.addEventListener(`click`, handleButtonClick);
  });
  //function for  buttons click events
  function handleButtonClick(click) {
    const key = click.target.dataset.key;
    input = key;
    inputDisplay.innerHTML += input;
    if (key == `c`) {
      inputDisplay.innerHTML = ``;
      outputDisplay.innerHTML = ``;
    } else if (key == `d`) {
      inputDisplay.innerHTML = inputDisplay.innerHTML.slice(0, -2);
    }

    convert();
  }
  inputType.addEventListener(`change`, buttonHandler);
  //function for disable and enable buttons
  function buttonHandler() {
    inputDisplay.innerHTML = ``;
    outputDisplay.innerHTML = ``;
    hexabtn.forEach((element) => {
      element.disabled = false;
      element.style.backgroundColor = ` #fbabb8`;

      if (inputType.value == `10`) {
        element.disabled = true;
        element.style.backgroundColor = `#cbcbcb83`;
      } else if (inputType.value == `2`) {
        element.disabled = true;
        element.style.backgroundColor = `#cbcbcb83`;
      } else if (inputType.value == `16`) {
        element.disabled = false;

        element.style.color = ``;
      }
      if (inputType.value == `8`) {
        element.disabled = true;
        element.style.backgroundColor = `#cbcbcb83`;
      }
    });
    forbin.forEach((element) => {
      element.disabled = false;
      if (inputType.value == `2`) {
        element.disabled = true;
      }
    });
    octal();
    convert();
  }
  outputtype.addEventListener(`change`, convert);
  //function for convert numbers

  let floatpart;

  function convert() {
    let fromBase = inputType.value;
    let toBase = outputtype.value;
    let numbers = inputDisplay.innerHTML;

    if (fromBase == toBase) {
      outputDisplay.innerHTML = numbers;
    } else {
      let parts = numbers.split(`.`);
      let intpart = parts[0];
      floatpart = parts[1];
      let intResult = parseInt(intpart, fromBase);
      let fresult = intResult.toString(toBase).toUpperCase();

      let finalResult;
      if (floatpart != undefined && floatpart != ``) {
        let subFloat = (floatpart * toBase).toString();
        if (fromBase == 10) {
          let subFloat = ((`0.` + floatpart) * toBase).toString();
          ok = subFloat.split(`.`)[0];
          console.log(subFloat);
          for (let index = 0; index < 9; index++) {
            let subFloatParts = subFloat.toString().split(`.`);
            console.log(subFloatParts);
            let subFloat2 = `0.` + subFloatParts[1];
            subFloat = subFloat2 * toBase;
            console.log(subFloat);
            ok +=
              toBase == 16
                ? subFloat
                    .toString()
                    .split(`.`)[0]
                    .replace(10, `A`)
                    .replace(11, `B`)
                    .replace(12, `C`)
                    .replace(13, `D`)
                    .replace(14, `E`)
                    .replace(15, `F`)
                : subFloat.toString().split(`.`)[0];
            if (ok.includes(NaN)) {
              outputDisplay.innerHTML = fresult + `.`;
            } else {
              outputDisplay.innerHTML = fresult + (`.` + ok);
            }
          }
        } else {
          let decimelResult;

          let ok = [];
          for (let index = 0; index < floatpart.toString().length; index++) {
            let floatIndex = floatpart[index];

            let subFloat2 =
              floatIndex
                .replace(`A`, 10)
                .replace(`B`, 11)
                .replace(`C`, 12)
                .replace(`D`, 13)
                .replace(`E`, 14)
                .replace(`F`, 15) / Math.pow(fromBase, index + 1);
            ok.push(subFloat2);
          }

          let result = ok.reduce((acc, curr) => acc + curr);

          let resultParts = result.toString().split(`.`);
          let floatResult = resultParts[1];

          let subFloat = (result * toBase).toString();

          let finalResult = [subFloat.toString().split(`.`)[0]];
          for (let index = 0; index < 400; index++) {
            let subFloatParts = subFloat.toString().split(`.`);
            let subFloat2 = `0.` + subFloatParts[1];
            subFloat = subFloat2 * toBase;
            finalResult.push(
              toBase == 16
                ? subFloat
                    .toString()
                    .split(`.`)[0]
                    .replace(10, `A`)
                    .replace(11, `B`)
                    .replace(12, `C`)
                    .replace(13, `D`)
                    .replace(14, `E`)
                    .replace(15, `F`)
                : subFloat.toString().split(`.`)[0]
            );
          }

          let allFinalResult = finalResult
            .filter((num) => !isNaN(num))
            .join(``);
  let fintResult = intResult.toString(toBase)
          outputDisplay.innerHTML =
            fintResult + `.` + allFinalResult;
          // ok = subFloat.split(`.`)[0];
        }
      } else {
        if (inputDisplay.innerHTML !== ``) {
          let decimalValue = parseInt(inputDisplay.innerHTML, fromBase);
          let result = decimalValue.toString(toBase).toUpperCase();
          outputDisplay.innerHTML = result;
        }
      }
    }
  } //
  //function for enable disable based on octal
  function octal() {
    foroct1.disabled = false;
    foroct2.disabled = false;
    if (inputType.value == `8`) {
      foroct1.disabled = true;
      foroct2.disabled = true;
    } else if (inputType.value == `2`) {
      foroct1.disabled = true;
      foroct2.disabled = true;
    }
  }
  //  setInterval(() => {
  buttonHandler();
  //  }, 10);
}

//Hey if you are seeing this code I hope you will make something
//better than it. I was made this using my android phone. You have computer
//man go ahead and make something great.
