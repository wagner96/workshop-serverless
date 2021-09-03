"use strict";
const client = require("./clientConnection");
const docClient = client();

module.exports.handler = async (event) => {
  try {
    let id = event.pathParameters.id;

    const ret = await sendDy(id);
    return ret;
  } catch (error) {
    console.log(error);
  }
};
async function sendDy(id) {
  let ret = "";
  let params = {
    TableName: "Contacts",
    Key: {
      sequentialId: parseInt(id),
    },
  };

  await docClient
    .get(params, function (err, data) {
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
            data: data.Item,
          }),
        };
      }
    })
    .promise();
  return ret;
}
