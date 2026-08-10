const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBER_CHARS = "0123456789";
const SPECIAL_CHARS = "!@#$-={}[]?;:";
const UINT32_RANGE = 0x100000000;

export function secureRandomIndex(maxExclusive, cryptoProvider = globalThis.crypto) {
  if (!cryptoProvider || typeof cryptoProvider.getRandomValues !== "function") {
    throw new Error("Fonte de aleatoriedade criptograficamente segura indisponível");
  }

  if (!Number.isInteger(maxExclusive) || maxExclusive < 1 || maxExclusive > UINT32_RANGE) {
    throw new RangeError("O limite aleatório deve ser um inteiro entre 1 e 2^32");
  }

  const acceptedRange = UINT32_RANGE - (UINT32_RANGE % maxExclusive);
  const randomValue = new Uint32Array(1);

  do {
    cryptoProvider.getRandomValues(randomValue);
  } while (randomValue[0] >= acceptedRange);

  return randomValue[0] % maxExclusive;
}

function randomChar(chars, cryptoProvider) {
  return chars.charAt(secureRandomIndex(chars.length, cryptoProvider));
}

function shuffle(chars, cryptoProvider) {
  for (let i = chars.length - 1; i > 0; i--) {
    const randomIndex = secureRandomIndex(i + 1, cryptoProvider);
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

export function generatePassword(len = 10, options = {}, cryptoProvider = globalThis.crypto) {
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
    passwordChars.push(randomChar(LOWERCASE_CHARS, cryptoProvider));
    fillChars += LOWERCASE_CHARS;
  }

  if (includeUppercase) {
    passwordChars.push(randomChar(UPPERCASE_CHARS, cryptoProvider));
    fillChars += UPPERCASE_CHARS;
  }

  if (includeNumbers) {
    fillChars += NUMBER_CHARS;
    for (let i = 0; i < numbersCount; i++) passwordChars.push(randomChar(NUMBER_CHARS, cryptoProvider));
  }

  if (includeSpecialChars) {
    fillChars += SPECIAL_CHARS;
    for (let i = 0; i < specialCharsCount; i++) passwordChars.push(randomChar(SPECIAL_CHARS, cryptoProvider));
  }

  const remainingLength = targetLen - passwordChars.length;
  for (let i = 0; i < remainingLength; i++) {
    passwordChars.push(randomChar(fillChars, cryptoProvider));
  }

  shuffle(passwordChars, cryptoProvider);
  return passwordChars.join("");
}
