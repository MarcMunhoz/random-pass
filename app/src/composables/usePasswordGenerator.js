export function generatePassword(len = 10) {
  let text = "";
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$-={}[]?;:ABCDEFGHIJKLMNOPQRSTUVWYZ";
  const specialChars = "!@#$-={}[]?;:";

  // Ensure at least two special characters
  const specialCharPositions = [];
  for (let i = 0; i < 2; i++) {
    specialCharPositions.push(Math.floor(Math.random() * len));
  }
  specialCharPositions.sort((a, b) => a - b);

  let specialCharIndex = 0;
  let sameCharCount = 0;

  for (let i = 0; i < len; i++) {
    if (i === specialCharPositions[specialCharIndex]) {
      text += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
      specialCharIndex++;
    } else {
      let randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
      if (text[i - 1] === randomChar) {
        if (sameCharCount < 2) {
          text += randomChar;
          sameCharCount++;
        } else {
          let diffCharIndex = chars.indexOf(randomChar) - 1;
          if (diffCharIndex < 0) diffCharIndex = chars.length - 1;
          text += chars[diffCharIndex];
          sameCharCount = 0;
        }
      } else {
        text += randomChar;
        sameCharCount = 0;
      }
    }
  }

  return text;
}
