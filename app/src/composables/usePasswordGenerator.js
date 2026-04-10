const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBER_CHARS = "0123456789";
const SPECIAL_CHARS = "!@#$-={}[]?;:";

function randomChar(chars) {
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

function shuffle(chars) {
  for (let i = chars.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[randomIndex]] = [chars[randomIndex], chars[i]];
  }
}

function parseCount(value, enabled) {
  if (!enabled) return 0;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? 1 : Math.max(1, parsed);
}

export function getMinimumPasswordLength(options = {}) {
  const includeLowercase = options.includeLowercase !== false;
  const includeUppercase = options.includeUppercase !== false;
  const includeNumbers = options.includeNumbers !== false;
  const includeSpecialChars = options.includeSpecialChars !== false;

  const numbersCount = parseCount(options.numbersCount, includeNumbers);
  const specialCharsCount = parseCount(options.specialCharsCount, includeSpecialChars);

  const requiredByTypes = Number(includeLowercase) + Number(includeUppercase);
  const minimum = requiredByTypes + numbersCount + specialCharsCount;

  return Math.max(1, minimum);
}

export function generatePassword(len = 10, options = {}) {
  const includeLowercase = options.includeLowercase !== false;
  const includeUppercase = options.includeUppercase !== false;
  const includeNumbers = options.includeNumbers !== false;
  const includeSpecialChars = options.includeSpecialChars !== false;

  const hasAnyType = includeLowercase || includeUppercase || includeNumbers || includeSpecialChars;
  if (!hasAnyType) return "";

  const numbersCount = parseCount(options.numbersCount, includeNumbers);
  const specialCharsCount = parseCount(options.specialCharsCount, includeSpecialChars);
  const minimumLength = getMinimumPasswordLength({
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSpecialChars,
    numbersCount,
    specialCharsCount,
  });

  const targetLen = Math.max(minimumLength, Number.parseInt(len, 10) || minimumLength);
  const passwordChars = [];
  let fillChars = "";

  if (includeLowercase) {
    passwordChars.push(randomChar(LOWERCASE_CHARS));
    fillChars += LOWERCASE_CHARS;
  }

  if (includeUppercase) {
    passwordChars.push(randomChar(UPPERCASE_CHARS));
    fillChars += UPPERCASE_CHARS;
  }

  if (includeNumbers) {
    fillChars += NUMBER_CHARS;
    for (let i = 0; i < numbersCount; i++) passwordChars.push(randomChar(NUMBER_CHARS));
  }

  if (includeSpecialChars) {
    fillChars += SPECIAL_CHARS;
    for (let i = 0; i < specialCharsCount; i++) passwordChars.push(randomChar(SPECIAL_CHARS));
  }

  const remainingLength = targetLen - passwordChars.length;
  for (let i = 0; i < remainingLength; i++) {
    passwordChars.push(randomChar(fillChars));
  }

  shuffle(passwordChars);
  return passwordChars.join("");
}
