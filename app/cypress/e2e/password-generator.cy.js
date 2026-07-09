const selectors = {
  password: "[data-cy=password-value]",
  length: "[data-cy=password-length]",
  lowercase: "[data-cy=include-lowercase]",
  uppercase: "[data-cy=include-uppercase]",
  numbers: "[data-cy=include-numbers]",
  specials: "[data-cy=include-specials]",
  numbersCount: "[data-cy=numbers-count]",
  specialsCount: "[data-cy=specials-count]",
  generate: "[data-cy=generate-password]",
  refresh: "[data-cy=refresh-password]",
  copy: "[data-cy=copy-password]",
};

const specialCharsPattern = /[!@#$\-={}[\]?;:]/g;

function passwordText() {
  return cy.get(selectors.password).invoke("text");
}

function setNumber(selector, value) {
  cy.get(selector).invoke("val", value).trigger("input");
}

function expectPasswordLength(length) {
  passwordText().should("have.length", length);
}

describe("Password generator", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(win) {
        if (!win.navigator.clipboard) {
          Object.defineProperty(win.navigator, "clipboard", {
            configurable: true,
            value: {
              writeText: () => Promise.resolve(),
            },
          });
        }

        cy.stub(win.navigator.clipboard, "writeText").resolves().as("writeText");
      },
    });
  });

  it("shows an initial password with the default configuration", () => {
    expectPasswordLength(10);
    passwordText().should("match", /[a-z]/);
    passwordText().should("match", /[A-Z]/);
    passwordText().should("match", /\d/);
    passwordText().should("match", specialCharsPattern);
  });

  it("respects password length changes", () => {
    setNumber(selectors.length, 18);

    expectPasswordLength(18);
  });

  it("respects selected character classes", () => {
    cy.get(selectors.uppercase).uncheck({ force: true });
    cy.get(selectors.numbers).uncheck({ force: true });
    cy.get(selectors.specials).uncheck({ force: true });
    setNumber(selectors.length, 12);

    passwordText().should("match", /^[a-z]{12}$/);
  });

  it("respects minimum numbers and special characters", () => {
    setNumber(selectors.length, 14);
    setNumber(selectors.numbersCount, 4);
    setNumber(selectors.specialsCount, 3);

    passwordText().then((password) => {
      expect((password.match(/\d/g) || []).length).to.be.at.least(4);
      expect((password.match(specialCharsPattern) || []).length).to.be.at.least(3);
    });
  });

  it("regenerates the displayed password on request", () => {
    passwordText().then((initialPassword) => {
      cy.get(selectors.refresh).click();
      passwordText().should((nextPassword) => {
        expect(nextPassword).to.have.length(10);
        expect(nextPassword).not.to.equal(initialPassword);
      });
    });
  });

  it("copies the password and shows visual feedback", () => {
    passwordText().then((password) => {
      cy.get(selectors.copy).click();
      cy.get("@writeText").should("have.been.calledWith", password);
      cy.get(selectors.copy).should("contain.text", "Copiado!");
    });
  });
});
