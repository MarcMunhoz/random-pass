const assert = require("node:assert/strict");
const { readFile } = require("node:fs/promises");
const test = require("node:test");

async function loadPasswordGenerator() {
  const source = await readFile(new URL("../src/composables/usePasswordGenerator.js", `file://${__filename}`), "utf8");
  return import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
}

function cryptoSequence(values) {
  const remaining = [...values];
  let calls = 0;

  return {
    get calls() {
      return calls;
    },
    getRandomValues(target) {
      calls += 1;
      target[0] = remaining.length > 0 ? remaining.shift() : 0;
      return target;
    },
  };
}

test("gera e embaralha a senha sem consultar Math.random", async () => {
  const { generatePassword } = await loadPasswordGenerator();
  const cryptoProvider = cryptoSequence([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  const originalRandom = Math.random;
  Math.random = () => {
    throw new Error("Math.random não pode gerar credenciais");
  };

  try {
    const password = generatePassword(10, {}, cryptoProvider);
    assert.equal(password.length, 10);
    assert.ok(cryptoProvider.calls > 0);
  } finally {
    Math.random = originalRandom;
  }
});

test("descarta valores que causariam viés antes de selecionar o índice", async () => {
  const { secureRandomIndex } = await loadPasswordGenerator();
  const acceptedRange = 0xfffffffA;
  const cryptoProvider = cryptoSequence([acceptedRange, acceptedRange - 1]);

  assert.equal(secureRandomIndex(10, cryptoProvider), 9);
  assert.equal(cryptoProvider.calls, 2);
});

test("aceita os limites suportados para a seleção de índice", async () => {
  const { secureRandomIndex } = await loadPasswordGenerator();

  assert.equal(secureRandomIndex(1, cryptoSequence([0xffffffff])), 0);
  assert.equal(secureRandomIndex(0x100000000, cryptoSequence([0xffffffff])), 0xffffffff);
});

test("rejeita limites inválidos para a seleção de índice", async () => {
  const { secureRandomIndex } = await loadPasswordGenerator();
  const cryptoProvider = cryptoSequence([0]);

  for (const invalidLimit of [0, -1, 1.5, 0x100000001]) {
    assert.throws(() => secureRandomIndex(invalidLimit, cryptoProvider), RangeError);
  }
});

test("recusa gerar índice quando a fonte segura está indisponível", async () => {
  const { secureRandomIndex } = await loadPasswordGenerator();

  assert.throws(
    () => secureRandomIndex(10, null),
    /fonte de aleatoriedade criptograficamente segura/i,
  );
});

test("recusa gerar senha quando a fonte segura está indisponível", async () => {
  const { generatePassword } = await loadPasswordGenerator();

  assert.throws(
    () => generatePassword(10, {}, null),
    /fonte de aleatoriedade criptograficamente segura/i,
  );
});

test("preserva classes e mínimos usando a fonte segura em todas as etapas", async () => {
  const { generatePassword } = await loadPasswordGenerator();
  const values = Array.from({ length: 23 }, (_, index) => index);
  const cryptoProvider = cryptoSequence(values);
  const originalRandom = Math.random;
  Math.random = () => {
    throw new Error("Math.random não pode gerar credenciais");
  };

  try {
    const password = generatePassword(
      12,
      { numbersCount: 2, specialCharsCount: 3 },
      cryptoProvider,
    );
    const specialCharacters = "!@#$-={}[]?;:";

    assert.equal(password.length, 12);
    assert.match(password, /[a-z]/);
    assert.match(password, /[A-Z]/);
    assert.ok((password.match(/[0-9]/g) || []).length >= 2);
    assert.ok([...password].filter((character) => specialCharacters.includes(character)).length >= 3);
    assert.equal(cryptoProvider.calls, 23);
  } finally {
    Math.random = originalRandom;
  }
});
