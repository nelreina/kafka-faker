const faker = require("faker");

module.exports = key => ({
  name: faker.name.findName(),
  gender: faker.random.arrayElement(["male", "female"]),
  age: faker.random.number({ min: 18, max: 80 }),
  job: faker.name.jobType(),
  key
});
