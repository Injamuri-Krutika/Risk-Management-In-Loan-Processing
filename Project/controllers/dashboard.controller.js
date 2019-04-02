// Controller to handle all login/* routes
/* eslint-disable no-console */
import Users from '../Models/Users.model';

exports.getDetails = (request, response) => {
  console.log(`${JSON.stringify(request.params.user, null, 4)}`);
  Users.findOne({ user: request.params.user }).exec((err, doc) => {
    console.log(doc);
    if (err) console.log('An error cooured while verifying');
    if (doc) {
      return response.send(doc);
    }
    return response.send({});
  });
};
// gnbmjdmlsstwnotf;
