const { saveDocumentGenerateID, findInCollection } = require('../../utils/firestore');

exports.restock_notification = async function (req, res) {
    if (!req.body.sku) {
        return res.status(500).send("sku is required");
    }

    /* if (!req.body.quantity) {
        return res.status(500).send("quantity is required");
    } */

    const notifications = await findInCollection("restock_notifications", "sku", req.body.sku);

    if (notifications.length > 0) {
        for (let i = 0; i < notifications.length; i++) {
            const payload = {
                to: notifications[i].email,
                template: {
                    name: "restock_notification",
                    data: {
                        productHandle: notifications[i].productHandle,
                        productTitle: notifications[i].productTitle,
                        variantTitle: notifications[i].variantTitle,
                        variantSku: notifications[i].variantSku,
                    }
                }
            };
            console.log(payload);
            await saveDocumentGenerateID("mail", payload);
        }
    }

    res.status(200).send(`${req.body.sku} Restock Notifications Sent`)
};