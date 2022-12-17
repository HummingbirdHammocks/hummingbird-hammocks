const { saveDocumentGenerateID, findInCollection, deleteDocument } = require('../../utils/firestore');

exports.restock_notification = async function (req, res) {
    if (!req.body.sku) {
        return res.status(500).send("sku is required");
    }

    /* if (!req.body.quantity) {
        return res.status(500).send("quantity is required");
    } */

    const notifications = await findInCollection("restock_notifications", "variantSku", req.body.sku);

    if (notifications.length > 0) {
        for (let i = 0; i < notifications.length; i++) {
            const payload = {
                to: notifications[i].data().email,
                template: {
                    name: "restock_notification",
                    data: {
                        productHandle: notifications[i].data().productHandle,
                        productTitle: notifications[i].data().productTitle,
                        variantTitle: notifications[i].data().variantTitle,
                        variantSku: notifications[i].data().variantSku,
                    }
                }
            };
            console.log(payload);
            const saveResult = await saveDocumentGenerateID("mail", payload);
            if (saveResult) {
                console.log(notifications[i])
                await deleteDocument("restock_notifications", notifications[i].id);
            } else {
                return res.status(500).send(`Error sending email: ${notifications[i].id}`);
            }
        }
        return res.status(200).send(`${req.body.sku} Restock Notifications Sent`);
    } else {
        return res.status(200).send(`No ${req.body.sku} Notifications Found`);
    }
};