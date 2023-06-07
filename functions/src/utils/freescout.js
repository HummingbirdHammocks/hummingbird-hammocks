const axios = require('axios');

exports.createTicket = async function (
  firstName,
  lastName,
  email,
  subject,
  message,
  orderNumber,
  attachments
) {
  if (!firstName || !lastName || !email || !subject || !message) {
    return false;
  }

  const url = process.env.FREESCOUT_API_URL + '/api/conversations';

  const config = {
    headers: {
      'X-FreeScout-API-Key': process.env.FREESCOUT_API_KEY
    }
  };

  const payload = {
    type: 'email',
    mailboxId: 1,
    subject: subject,
    customer: {
      firstName: firstName,
      lastName: lastName,
      email: email
    },
    threads: [
      {
        text: message,
        type: 'customer',
        customer: {
          firstName: firstName,
          lastName: lastName,
          email: email
        },
        attachments: attachments
      }
    ],
    customFields: [
      {
        id: 1,
        value: orderNumber
      }
    ],
    imported: false,
    status: 'active'
  };

  return await axios
    .post(url, payload, config)
    .then((response) => {
      if (response.data) {
        console.log('createTicket: ' + response.data);
        return response.data;
      } else {
        console.log(response.data);
        throw new Error(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};

exports.getUserTickets = async function (email) {
  if (!email) {
    return false;
  }

  const url =
    process.env.FREESCOUT_API_URL +
    '/api/conversations?customerEmail=' +
    email +
    '&embed=threads&state=published';

  const config = {
    headers: {
      'X-FreeScout-API-Key': process.env.FREESCOUT_API_KEY
    }
  };

  return await axios
    .get(url, config)
    .then((response) => {
      if (response.data) {
        console.log('getUserTickets: ' + response.data);
        return response.data;
      } else {
        console.log(response.data);
        throw new Error(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};

exports.createTicketThread = async function (conversationId, payload) {
  if (!conversationId) {
    return false;
  }

  const url = process.env.FREESCOUT_API_URL + '/api/conversations/' + conversationId + '/threads';

  const config = {
    headers: {
      'X-FreeScout-API-Key': process.env.FREESCOUT_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };

  return await axios
    .post(url, payload, config)
    .then((response) => {
      if (response.data) {
        console.log('createTicketThread: ' + response.data);
        return response.data;
      } else {
        console.log(response.data);
        throw new Error(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};
