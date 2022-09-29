var path = require('path');
const { createTicket } = require('../../utils/freescout');

exports.create_ticket = async function (req, res) {
    if (!req.body.firstName) {
        return res.status(500).send("firstName is required");
    }

    if (!req.body.lastName) {
        return res.status(500).send("lastName is required");
    }

    if (!req.body.email) {
        return res.status(500).send("email is required");
    }

    if (!req.body.subject) {
        return res.status(500).send("subject is required");
    }

    if (!req.body.message) {
        return res.status(500).send("message is required");
    }

    return await createTicket(req.body.firstName, req.body.lastName, req.body.email, req.body.subject, req.body.message)
        .then((response) => res.status(200).send(response))
        .catch((error) => {
            console.log("createTicket: " + error);
            return res.status(500).send(error.message);
        });
};