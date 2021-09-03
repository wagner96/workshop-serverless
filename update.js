"use strict";
const client = require("./clientConnection");
const docClient = client();

module.exports.handler = async (event) => {
  try {
    let body = JSON.parse(event.body);
    let id = event.pathParameters.id;

    let ret = await sendDy(body, id);
    return ret;
  } catch (error) {
    console.log(error);
  }
};
async function sendDy(body, id) {
  let ret = "";
  let params = {
    TableName: "Contacts",
    Key: {
      sequentialId: parseInt(id),
    },
    UpdateExpression: "set #fullname = :name, phone = :phone, obs = :obs",
    ExpressionAttributeValues: {
      ":name": body.name,
      ":phone": body.phone,
      ":obs": body.obs,
    },
    ExpressionAttributeNames:{
      "#fullname": "name"
    }
  };
  console.log(params);
  await docClient
    .update(params, function (err, data) {
      if (err) {
        console.log("err  ", err);
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
          }),
        };
      }
    })
    .promise();
  return ret;
}
