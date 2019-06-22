const fs = require("fs");
const path = require("path");

const data = {};
const pathTopicsData = path.resolve(__dirname, "./data");

fs.readdirSync(pathTopicsData).forEach(file => {
  const topic = file.replace(".js", "");
  data[topic] = require(pathTopicsData + "/" + file);
});

module.exports = (topic, key) => {
  const generate = data[topic];
  if (!generate) {
    const error = `NO_DATA_ERR: Topic "${topic}" has no data definition! Please add topic to data folder in generate-data!`;
    throw new Error(error);
  }
  return generate(key);
};
