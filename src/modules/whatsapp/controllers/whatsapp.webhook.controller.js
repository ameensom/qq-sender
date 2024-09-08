const { FACEBOOK_APP_SECRET } = process.env;
import WhatsappNotification from 'q-notifications/modules/whatsapp/index.js';
import * as Whatsapp from 'q-notifications/helpers/whatsapp/index.js';
import crypto from 'crypto';

export default async (req, res) => {
  try {
    const { body } = req;
    const hmac = crypto.createHmac('sha1', FACEBOOK_APP_SECRET);
    hmac.update(req['rawBody'], 'utf8');

    const appSignature = `sha1=${hmac.digest('hex')}`;
    if (req.headers['x-hub-signature'] !== appSignature) {
      return res.sendStatus(403);
    }

    const [{ wa_id: phone }] = body.entry[0]?.changes[0]?.value?.contacts || [{ wa_id: '' }];
    const whatsAppNotificaiton = await WhatsappNotification.Model.create({ ...body, phone });

    const [{ id: messageID, type: messageType }] = body.entry[0]?.changes[0]?.value?.messages || [{ id: '' }];



    if (messageID && phone) {
      await Whatsapp.changeMessageStatus({ status: 'read', messageID, phone });
    }


    if (messageType === 'text') {
      const [{ text: message }] = whatsAppNotificaiton.entry[0]?.changes[0]?.value?.messages || [{ text: { body: '' } }];
      await WhatsappNotification.Model.updateOne({ _id: whatsAppNotificaiton._id }, { message: message.body });
      await WhatsappNotification.handleMessageText({ messageID, phone, whatsAppNotificaiton });
    }





    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(200);
  }
};