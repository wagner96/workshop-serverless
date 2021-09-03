"use strict";
const client = require("./clientConnection");
const docClient = client();

module.exports.handler = async (event) => {
  try {
    console.log("liiist");

    const ret = await sendDy();
    return ret;
  } catch (error) {
    console.log(error);
  }
};
async function sendDy() {
  let ret = "";
  let params = {
    TableName: "Contacts",
  };

  await docClient
    .scan(params, function (err, data) {
      if (err) {
        ret = {
          statusCode: 500,
          body: JSON.stringify({
            message: "fail",
            error: err,
          }),
        };
      } else {
        ret = {
          statusCode: 200,
          body: JSON.stringify({
            message: "sucess",
            data: data.Items,
          }),
        };
      }
    })
    .promise();
  return ret;
}
