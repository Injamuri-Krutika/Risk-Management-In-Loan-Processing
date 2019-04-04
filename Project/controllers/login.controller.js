// Controller to handle all login/* routes
/* eslint-disable no-console */
import Customers from "../models/customers.model";

exports.verifyCredentials = (request, response) => {
  console.log(`${JSON.stringify(request.body, null, 4)}`);
  Customers.findOne({ user: request.body.user }).exec((err, doc) => {
    if (err) console.log("An error cooured while verifying");
    if (doc === []) return response.send("Not found");
    if (doc) {
      console.log(request.body.password);
      console.log(doc.isVerified);

      console.log(`here1 ${(doc.password, request.body.password)} `);
      if (doc.password === request.body.password) {
        if (doc.isVerified) {
          console.log("Inside Is verified");
          return response.send({
            status: "dashboard",
            customerDetails: doc
          });
        }
        return response.send({ status: "Unverified" });
      }
      return response.send({ status: "Bad Credentials" });
    }
    return response.send({ status: "Invalid" });
  });
};
