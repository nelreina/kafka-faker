require("dotenv").config();
const log4js = require("@nelreina/node-log4js");
const logger = log4js("fake-kafka");
const generateData = require("./generate-data");
const kafka = require("kafka-node");
const faker = require("faker");
const args = require("minimist")(process.argv.slice(2));

const { topic, seconds, host, limit, start } = args;

const INTERVAL = seconds ? seconds + " seconds" : process.env["fake.interval"];
const TOPIC = topic ? topic : process.env["fake.kafka.topic"];
const HOST = host ? host : process.env["kafka.host"];
const START = parseInt(start) || 0;
const LIMIT = (parseInt(limit) || 1000) + START;
let run;

if (!INTERVAL || !TOPIC) {
  logger.error("TOPIC and INTERVAL are mandatory");
  process.exit(0);
}

const client = new kafka.KafkaClient({ kafkaHost: `${HOST}:9092` });
const producer = new kafka.Producer(client);
producer.on("error", err => logger.error(err.message));

logger.info(`Fake Kafka Producer: ${JSON.stringify({ TOPIC, INTERVAL })} `);

const interval = parseInt(INTERVAL.split(" ")[0] * 1000);

const sendFakeData = count => {
  try {
    const data = generateData(TOPIC, count);
    const payloads = [
      {
        topic: TOPIC,
        key: data.key || faker.random.number(1, 20000),
        messages: JSON.stringify(data)
      }
    ];

    producer.send(payloads, (err, data) => logger.info(data));
    logger.info(JSON.stringify(payloads));
    if (count === LIMIT) {
      clearInterval(run);
      logger.info("Wait 10 seconds before exit application...");
      setTimeout(() => {
        logger.info("Exit app");
        process.exit(0);
      }, 10000);
    }
  } catch (error) {
    logger.error(error.message);
    process.exit(0);
  }
};

let count = START;
producer.on("ready", () => {
  run = setInterval(() => {
    sendFakeData(++count);
  }, interval);
});
