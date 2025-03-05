'use strict';

// Form information
const form = document.querySelector('form');
const confirmedForm = document.querySelector('.confirmed');
const holderName = document.querySelector('.login__input--name');
const cardNumber = document.querySelector('.login__input--idCard');
const expiryMonth = document.querySelector('.date__input--month');
const expiryYear = document.querySelector('.date__input--year');
const cardCvc = document.querySelector('.cvc__input--idCard');
const btnConfirm = document.querySelector('.btn__confirm');
const btnContinue = document.querySelector('.continue__btn');

// Card information
const cardNameText = document.querySelector('.front__name--card');
const cardNumberText = document.querySelector('.front__number--card');
const cardMonthText = document.querySelector('.front__month--card');
const cardYearText = document.querySelector('.front__year--card');
const cardCvcText = document.querySelector('.back__cvc--card');

// Errors
const blankError1 = document.querySelector('.empty__error1');
const blankError2 = document.querySelector('.empty__error2');
const blankError3 = document.querySelector('.empty__error3');
const blankError4 = document.querySelector('.empty__error4');
const lengthError2 = document.querySelector('.length__error2');
const lengthError3 = document.querySelector('.length__error3');
const lengthError4 = document.querySelector('.length__error4');
const wrongFormatError1 = document.querySelector('.format__error1');
const wrongFormatError2 = document.querySelector('.format__error2');
const wrongFormatError3 = document.querySelector('.format__error3');
const wrongFormatError4 = document.querySelector('.format__error4');

const account = {
  owner: 'Jane Appleseed',
  number: [0],
  date: [0],
};

const createUsernames = function (acc) {
  acc.username = acc.owner
    .toUpperCase()
    .split(' ')
    .map(name => name)
    .join(' ');
};

const createCardNumber = function (acc) {
  acc.number = cardNumber.value.split('');

  const spaceBetween = acc.number
    .join('')
    .match(/.{1,4}/g)
    .join(' ');

  acc.num = spaceBetween;
};

const createCardDate = function (acc) {
  acc.date[0] = expiryMonth.value.toString().split('');

  const formattedMonth = `${acc.date[0].join('') + ' / '}`;

  acc.date = [formattedMonth];
  console.log(formattedMonth);
};

// Card section
holderName.addEventListener('input', function () {
  if (holderName.value.length > 25)
    holderName.value = holderName.value.slice(0, 25);

  if (holderName.value) {
    account.owner = holderName.value;
    createUsernames(account);
  }
  cardNameText.textContent = account.username;

  if (!holderName.value) {
    cardNameText.textContent = 'JANE APPLESEED';
  }
});

cardNumber.addEventListener('input', function () {
  if (cardNumber.value) {
    createCardNumber(account);
  }
  cardNumberText.textContent = account.num;

  if (!cardNumber.value) {
    cardNumberText.textContent = '0000 0000 0000 0000';
  }
});

cardCvc.addEventListener('input', function () {
  cardCvcText.textContent = cardCvc.value;

  if (!cardCvc.value) {
    cardCvcText.textContent = '000';
  }
});

expiryMonth.addEventListener('input', function () {
  if (expiryMonth.value) {
    createCardDate(account);
  }
  cardMonthText.textContent = account.date[0];

  if (!expiryMonth.value) {
    cardMonthText.textContent = '00 /';
  }
});

expiryYear.addEventListener('input', function () {
  cardYearText.textContent = expiryYear.value;

  if (!expiryYear.value) {
    cardYearText.textContent = '00';
  }
});

// Error section
const confirmedOrNot = function (errorExist = true) {
  if (errorExist) {
    let editCardNum = [Number(cardNumber.value)];
    let checkLength = cardNumber.value.length;

    // format err
    if (!Number(editCardNum[0])) {
      wrongFormatError2.classList.remove('hidden');
      errorExist = true;
    } else {
      wrongFormatError2.classList.add('hidden');
      errorExist = false;
    }
    editCardNum = [Number(holderName.value)];
    if (!Number(editCardNum[0])) {
      wrongFormatError1.classList.add('hidden');
      errorExist = false;
    } else {
      wrongFormatError1.classList.remove('hidden');
      errorExist = true;
    }
    editCardNum = [Number(cardCvc.value)];
    if (!Number(editCardNum[0])) {
      wrongFormatError4.classList.remove('hidden');
      errorExist = true;
    } else {
      wrongFormatError4.classList.add('hidden');
      errorExist = false;
    }
    editCardNum = [Number(expiryMonth.value)];
    let editCardNumYear = [Number(expiryYear.value)];
    if (!Number(editCardNum[0]) || !Number(editCardNumYear[0])) {
      wrongFormatError3.classList.remove('hidden');
      errorExist = true;
    } else {
      wrongFormatError3.classList.add('hidden');
      errorExist = false;
    }

    // length err
    if (checkLength !== 16) {
      lengthError2.classList.remove('hidden');
      errorExist = true;
    } else {
      lengthError2.classList.add('hidden');
      errorExist = false;
    }
    checkLength = cardCvc.value.length;
    if (checkLength !== 3) {
      lengthError4.classList.remove('hidden');
      errorExist = true;
    } else {
      lengthError4.classList.add('hidden');
      errorExist = false;
    }
    let checkLengthYear = expiryYear.value.length;
    checkLength = expiryMonth.value.length;
    if (checkLength !== 2 || checkLengthYear !== 2) {
      lengthError3.classList.remove('hidden');
      errorExist = true;
    } else {
      lengthError3.classList.add('hidden');
      errorExist = false;
    }

    // empty err
    if (!holderName.value) {
      blankError1.classList.remove('hidden');
    } else {
      blankError1.classList.add('hidden');
    }
    if (!cardNumber.value) {
      blankError2.classList.remove('hidden');
      wrongFormatError2.classList.add('hidden');
      lengthError2.classList.add('hidden');
    } else {
      blankError2.classList.add('hidden');
    }
    if (!expiryMonth.value || !expiryYear.value) {
      blankError3.classList.remove('hidden');
      blankError4.classList.remove('newEmptErr4');
      wrongFormatError3.classList.add('hidden');
      lengthError3.classList.add('hidden');
    } else {
      blankError3.classList.add('hidden');
    }
    if (!cardCvc.value) {
      blankError4.classList.remove('hidden');
      wrongFormatError4.classList.add('hidden');
      lengthError4.classList.add('hidden');
    } else {
      blankError4.classList.add('hidden');
    }

    // err exist or not
    if (
      holderName.value &&
      cardNumber.value &&
      expiryMonth.value &&
      expiryYear.value &&
      cardCvc.value &&
      errorExist === false
    ) {
      form.classList.add('hidden');
      confirmedForm.classList.remove('hidden');
    }
  }
};

btnConfirm.addEventListener('click', confirmedOrNot);

btnContinue.addEventListener('click', function (e) {
  e.preventDefault();
  form.classList.remove('hidden');
  confirmedForm.classList.add('hidden');
  holderName.value =
    cardNumber.value =
    expiryMonth.value =
    expiryYear.value =
    cardCvc.value =
      '';
  cardNameText.textContent = 'JANE APPLESEED';
  cardNumberText.textContent = '0000 0000 0000 0000';
  cardCvcText.textContent = '000';
  cardMonthText.textContent = '00 /';
  cardYearText.textContent = '00';
});
