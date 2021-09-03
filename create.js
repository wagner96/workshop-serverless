"use strict";
const client = require("./clientConnection");
const docClient = client();

module.exports.handler = async (event) => {
  try {
    let body = JSON.parse(event.body);

    let ret = await sendDy(body);
    return ret;
  } catch (error) {
    console.log(error);
  }
};
async function sendDy(body) {
  let ret = "";
  let params = {
    TableName: "Contacts",
    Item: {
      sequentialId: new Date().getTime(),
      name: body.name,
      phone: body.phone,
      obs: body.obs,
    },
  };

  await docClient
    .put(params, function (err, data) {
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
            data: params.Item,
          }),
        };
      }
    })
    .promise();
  return ret;
}
