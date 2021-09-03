const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

module.exports = function client() {
  try {
    let docClient = new AWS.DynamoDB.DocumentClient({
      apiVersion: "2012-08-10",
    });
    return docClient;
  } catch (error) {
    return error;
  }
};
