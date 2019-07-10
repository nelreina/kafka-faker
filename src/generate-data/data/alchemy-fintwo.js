const faker = require("faker");
const S = require("string");

const generatePaymentId = key => {
  const nr = S(key).padLeft(4, "0").s;
  const paymentTemplate = "FCG171009000{{nr}}";
  return S(paymentTemplate).template({ nr }).s;
};

module.exports = key => ({
  accountCurrency: "USD",
  amount: faker.finance.amount(),
  amountCurrency: "CHF",
  charges: "SHA",
  remittanceInfo: faker.lorem.sentence(),
  paymentId: generatePaymentId(key),
  key: generatePaymentId(key),
  priority: "N",
  output: "ripple",
  corespondentId: "finastra-one",
  beneficiaryCostumerCity: faker.address.city(),
  beneficiaryCostumerCountry: faker.address.country(),
  beneficiaryCostumerName: faker.name.findName(),
  beneficiaryCostumerAccount: faker.finance.account(),
  beneficiaryCostumerStreet: faker.address.streetAddress(),
  institutionCity: faker.address.city(),
  institutionCountry: faker.address.country(),
  institutionName: faker.company.companyName(),
  institutionBIC: faker.finance.iban(),
  institutionStreet: faker.address.streetAddress(),
  orderingCostumerCity: faker.address.city(),
  orderingCostumerCountry: faker.address.country(),
  orderingCostumerName: faker.name.findName(),
  orderingCostumerAccount: faker.finance.account(),
  orderingCostumerStreet: faker.address.streetAddress()
});
