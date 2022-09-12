const generatePasswordButton = document.querySelector(
  '#generate-password',
) as HTMLDivElement;
const generatedPasswordElement = document.querySelector(
  '#generated-password',
) as HTMLDivElement;
const generatedPasswordElementTitle = generatedPasswordElement.querySelector(
  'h4',
) as HTMLHeadingElement;

const openCloseGeneratorButton = document.querySelector(
  '#open-generate-password',
) as HTMLSpanElement;
const generatePasswordContainer = document.querySelector(
  '#generate-options',
) as HTMLDivElement;
const lengthInput = document.querySelector('#length') as HTMLInputElement;
const lettersInput = document.querySelector('#letters') as HTMLInputElement;
const numbersInput = document.querySelector('#numbers') as HTMLInputElement;
const symbolsInput = document.querySelector('#symbols') as HTMLInputElement;
const copyPasswordButton = document.querySelector(
  '#copy-password',
) as HTMLButtonElement;

const getLetterLowerCase = (): string => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = (): string => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = (): string => {
  return Math.floor(Math.random() * 10).toString();
};

const getSymbol = (): string => {
  const symbols = '(){}[]=<>/,.!@#$%&*+-';
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = (
  getLetterLowerCase: () => string,
  getLetterUpperCase: () => string,
  getNumber: () => string,
  getSymbol: () => string,
): void => {
  let password = '';

  const passwordLength = +lengthInput.value;

  const generators: (() => string)[] = [];

  if (lettersInput.checked) {
    generators.push(getLetterLowerCase, getLetterUpperCase);
  }

  if (numbersInput.checked) {
    generators.push(getNumber);
  }

  if (symbolsInput.checked) {
    generators.push(getSymbol);
  }

  if (generators.length === 0) {
    return;
  }

  for (let i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
      const randomValue =
        generators[Math.floor(Math.random() * generators.length)]();

      password += randomValue;
    });
  }

  password = password.slice(0, passwordLength);

  generatedPasswordElement.style.display = 'block';
  generatedPasswordElementTitle.innerText = password;
};

// Eventos
generatePasswordButton.addEventListener('click', () => {
  generatePassword(
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol,
  );
});

openCloseGeneratorButton.addEventListener('click', () => {
  generatePasswordContainer.classList.toggle('hide');
});

copyPasswordButton.addEventListener('click', (e) => {
  e.preventDefault();

  const password = generatedPasswordElementTitle.innerText;

  navigator.clipboard.writeText(password).then(() => {
    copyPasswordButton.innerText = 'Senha copiada com sucesso!';

    setTimeout(() => {
      copyPasswordButton.innerText = 'Copiar';
    }, 1000);
  });
});
