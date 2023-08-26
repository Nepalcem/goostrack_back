// const nodemailer = require("nodemailer");
const ElasticEmail = require("@elasticemail/elasticemail-client");

const { META_PASSWORD, META_EMAIL, ELASTIC_EMAIL_API_KEY } = process.env;

// const nodemailerConfig = {
//   service: "SendGrid",
//   auth: {
//     user: META_EMAIL,
//     pass: META_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const sendEmail = async (data) => {
//   const email = { ...data, from: META_EMAIL };
//   await transport.sendMail(email);
//   return true;
// };

const defaultClient = ElasticEmail.ApiClient.instance;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTIC_EMAIL_API_KEY;

const api = new ElasticEmail.EmailsApi();

const sendEmail = (data) => {
  const { to, subject, html } = data;
  const email = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [new ElasticEmail.EmailRecipient(to)],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content: html,
        }),
      ],
      Subject: subject,
      From: META_EMAIL,
    },
  });

  const callback = function (error, data, response) {
    if (error) {
      console.error(error);
    } else {
      console.log("API called successfully.");
    }
  };

  api.emailsPost(email, callback);
};

module.exports = sendEmail;
