//this function convert the base of number
export function convert(numbers, fromBase, toBase) {
  let floatpart = ``;
  let ok = ``;
  if (fromBase == toBase) {
    return numbers;
  } else if (numbers == ``) {
    return ``;
  } else {
    let parts = numbers.toString().split(`.`);
    let intpart = parts[0];
    floatpart = parts[1];
    let intResult = parseInt(intpart, fromBase);
    let fresult = intResult.toString(toBase).toUpperCase();

    if (floatpart != undefined && floatpart != ``) {
      if (fromBase == 10) {
        let subFloat = ((`0.` + floatpart) * toBase).toString();
        // ok = subFloat.split(`.`)[0];

        if (subFloat.length == 1) {
          return fresult + `.` + subFloat;
        } else {
          let finalResult = [subFloat.toString().split(`.`)[0]];

          for (let index = 0; index < 400; index++) {
            let subFloatParts = subFloat.toString().split(`.`);
            //
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
          let allFinalResult = {};
          allFinalResult = finalResult.filter((num) => num!=NaN).join(``);
          return fresult + `.` + allFinalResult;
        }
      } else {
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
        } //

        let allFinalResult = finalResult.filter((num) => !isNaN(num)).join(``);

        let fintResult = intResult.toString(toBase);
        return fintResult + `.` + allFinalResult;
        // ok = subFloat.split(`.`)[0];
      }
    } else {
      if (numbers !== ``) {
        let decimalValue = parseInt(numbers, fromBase);
        let result = decimalValue.toString(toBase).toUpperCase();
        return result;
      }
    }
  }
}//end

//this function evaluate converted number
export function converteval(
  plus,
  minus,
  into,
  devid,
  inputDisplay,
  inputType,
  outputtype
) {
  if (inputDisplay.includes(plus)) {
    let numbers = inputDisplay.split(plus);
    if (numbers.length < 2) {
      return;
    } else {
      let evalnumbers =
        parseFloat(convert(numbers[0], inputType.value, 10)) +
        parseFloat(convert(numbers[1], inputType.value, 10));
      let finalEvalNumbers = convert(
        evalnumbers.toString(),
        10,
        outputtype.value
      );

      if (isNaN(finalEvalNumbers)) {
        return ` Input a valid number`;
      } else {
        return finalEvalNumbers;
      }
    }
  } else if (inputDisplay.includes(minus)) {
    let numbers = inputDisplay.split(minus);
    if (numbers.length < 2) {
      return;
    } else {
      let evalnumbers =
        parseFloat(convert(numbers[0], inputType.value, 10)) -
        parseFloat(convert(numbers[1], inputType.value, 10));
      let finalEvalNumbers = convert(
        evalnumbers.toString(),
        10,
        outputtype.value
      );

      if (isNaN(finalEvalNumbers)) {
        return `stupid input a valid number`;
      } else {
        return finalEvalNumbers;
      }
    }
  } else if (inputDisplay.includes(into)) {
    let numbers = inputDisplay.split(into);
    if (numbers.length < 2) {
      return;
    } else {
      let evalnumbers =
        parseFloat(convert(numbers[0], inputType.value, 10)) *
        parseFloat(convert(numbers[1], inputType.value, 10));
      let finalEvalNumbers = convert(
        evalnumbers.toString(),
        10,
        outputtype.value
      );

      if (isNaN(finalEvalNumbers)) {
        return `stupid input a valid number`;
      } else {
        return finalEvalNumbers;
      }
    }
  } else if (inputDisplay.includes(devid)) {
    let numbers = inputDisplay.split(devid);
    if (numbers.length < 2) {
      return;
    } else {
      let evalnumbers =
        parseFloat(convert(numbers[0], inputType.value, 10)) /
        parseFloat(convert(numbers[1], inputType.value, 10));
      let finalEvalNumbers = convert(
        evalnumbers.toString(),
        10,
        outputtype.value
      );

      if (isNaN(finalEvalNumbers)) {
        return `stupid input a valid number`;
      } else {
        return finalEvalNumbers;
      }
    }
  }
}

//this function will enable and disable the buttons based on input base
export function buttonStatusHandlar(
  binaryBtn,
  hexaBtn,
  decimelBtn,
  octalBtn,
  inputType
) {
  decimelBtn.forEach((btn) => {
    buttonDisabled(btn);
  });
  octalBtn.forEach((btn) => {
    buttonDisabled(btn);
  });
  hexaBtn.forEach((btn) => {
    buttonDisabled(btn);
  });
  if (inputType == 10) {
    decimelBtn.forEach((btn) => {
      buttonEnabled(btn);
    });
  } else if (inputType == 2) {
    buttonEnabled(binaryBtn);
  } else if (inputType == 16) {
    hexaBtn.forEach((btn) => {
      buttonEnabled(btn);
      decimelBtn.forEach((btn) => {
        buttonEnabled(btn);
      });
    });
  } else if (inputType == 8) {
    octalBtn.forEach((btn) => {
      buttonEnabled(btn);
    });
  }
}
//end

// function for handlebuttonclick
export function buttonClickHandlar(inputDisplay, button) {
  inputDisplay.innerHTML += button.target.dataset.key;
}
//end

//extra functions which will help the real function
export function buttonDisabled(btn) {
  btn.disabled = true;
  btn.style.color = `#cbcbcb83`;
}
export function buttonEnabled(btn) {
  btn.disabled = false;
  btn.style.color = ``;
}

// update display

export function updateOutputDisplay() {
  if (
    inputDisplay.innerHTML.includes(`+`) ||
    inputDisplay.innerHTML.includes(`-`) ||
    inputDisplay.innerHTML.includes(`X`) ||
    inputDisplay.innerHTML.includes(`÷`)
  ) {
  } else {
    outputDisplay = convert(
      inputDisplay.innerHTML,
      inputType.value,
      outputtype.value
    );
  }
}
//end
//all about button click and percent handle


export function symbolsClick(symbol, inputDisplay, percent) {
  if (
    inputDisplay.innerHTML.includes(`+`) ||
    inputDisplay.innerHTML.includes(`-`) ||
    inputDisplay.innerHTML.includes(`X`) ||
    inputDisplay.innerHTML.includes(`÷`)
  ) {
    return
  } 
  else {
    
    inputDisplay.innerHTML += symbol.target.dataset.key;
    
    
  }
}
export function percentStatusHandler(percent, inputDisplay) {
  buttonEnabled(percent);
  if (inputDisplay.innerHTML.includes(`%`) == false) {
    buttonEnabled(percent);
  }
}
export function percentClickHandler(inputDisplay, percent, symbol) {
  if (inputDisplay.innerHTML.includes(`%`)) {
    return;
  } else {
    inputDisplay.innerHTML += symbol.dataset.key;
    buttonDisabled(percent);
  }
}
//end
export function convertEvaluate(inputDisplay, inputType, outputtype) {
  let finalEvalNumbers;
  if (inputDisplay.includes(`+`)) {
    let numbers = inputDisplay.split(`+`);
    let secondNumber =
      numbers[0].toString() * (numbers[1].slice(0, -1) / 100).toString();

    if (inputDisplay.includes(`%`)) {
      let evalnumbers = eval(
        parseFloat(convert(numbers[0], inputType, 10)) +
          parseFloat(convert(secondNumber.toString(), inputType, 10))
      );
      finalEvalNumbers = convert(evalnumbers.toString(), 10, outputtype);
    } else {
      if (numbers.length < 2) {
        return `input one more number`;
      } else {
        let evalnumbers =
          parseFloat(convert(numbers[0], inputType, 10)) +
          parseFloat(convert(numbers[1], inputType, 10));
        finalEvalNumbers = convert(evalnumbers.toString(), 10, outputtype);
      }
    }
  } else if (inputDisplay.includes(`-`)) {
    let numbers = inputDisplay.split(`-`);
    let secondNumber =
      numbers[0].toString() * (numbers[1].slice(0, -1) / 100).toString();

    if (inputDisplay.includes(`%`)) {
      let evalnumbers = eval(
        parseFloat(convert(numbers[0], inputType, 10)) -
          parseFloat(convert(secondNumber.toString(), inputType, 10))
      );
      finalEvalNumbers = convert(evalnumbers.toString(), 10, outputtype);
    } else {
      if (numbers.length < 2) {
        return `input one more number`;
      } else {
        let evalnumbers =
          parseFloat(convert(numbers[0], inputType, 10)) -
          parseFloat(convert(numbers[1], inputType, 10));
        finalEvalNumbers = convert(evalnumbers.toString(), 10, outputtype);
      }
    }
  } else if (inputDisplay.includes(`X`)) {
    let numbers = inputDisplay.split(`X`);
    let secondNumber = numbers[1].slice(0, -1) / 100;

    if (inputDisplay.includes(`%`)) {
      let evalnumbers = eval(
        parseFloat(convert(numbers[0], inputType, 10)) *
          parseFloat(convert(secondNumber.toString(), inputType, 10))
      );
      finalEvalNumbers = convert(evalnumbers.toString(), 10, outputtype);
    } else {
      if (numbers.length < 2) {
        return `input one more number`;
      } else {
        let evalnumbers =
          parseFloat(convert(numbers[0], inputType, 10)) *
          parseFloat(convert(numbers[1], inputType, 10));
        finalEvalNumbers = convert(evalnumbers.toString(), 10, outputtype);
      }
    }
  } else if (inputDisplay.includes(`÷`)) {
    let numbers = inputDisplay.split(`÷`);
    
    let secondNumber = numbers[1].slice(0, -1) / 100;

    if (inputDisplay.includes(`%`)) {
      let evalnumbers = eval(
        parseFloat(convert(numbers[0], inputType, 10)) /
          parseFloat(convert(secondNumber.toString(), inputType, 10))
      );
      finalEvalNumbers = convert(evalnumbers.toString(), 10, outputtype);
    } else {
      if (numbers.length < 2) {
        return `input one more number`;
      } else {
        let evalnumbers =
          parseFloat(convert(numbers[0], inputType, 10)) /
          parseFloat(convert(numbers[1], inputType, 10));
        finalEvalNumbers = convert(evalnumbers.toString(), 10, outputtype);
      }
    }
  } else if (
    inputDisplay.includes(`+`)==false ||
    inputDisplay.includes(`-`)==false ||
    inputDisplay.includes(`X`)==false ||
    inputDisplay.includes(`÷`)==false &&
    inputDisplay.includes(`%`)==true
  ) {
    finalEvalNumbers =convert( inputDisplay.slice(0, -1) / 100,10,outputtype)
    
  }
  return finalEvalNumbers;
}
