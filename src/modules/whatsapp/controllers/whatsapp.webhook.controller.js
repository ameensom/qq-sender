const { FACEBOOK_APP_SECRET } = process.env;
import WhatsappNotification from 'q-notifications/modules/whatsapp/index.js';
import * as Whatsapp from 'q-notifications/helpers/whatsapp/index.js';
import crypto from 'crypto';
import whatsappSentMessagesModel from '../whatsapp.sent.messages.model';

export default async (req, res) => {
  try {
    const { body } = req;
    const hmac = crypto.createHmac('sha1', FACEBOOK_APP_SECRET);
    hmac.update(req['rawBody'], 'utf8');

    const appSignature = `sha1=${hmac.digest('hex')}`;
    if (req.headers['x-hub-signature'] !== appSignature) {
      return res.sendStatus(403);
    }

    const valueObject = body.entry[0]?.changes[0]?.value;
    const [{ wa_id: phone }] = valueObject?.contacts || [{ wa_id: '' }];
    const whatsAppNotificaiton = await WhatsappNotification.Model.create({ ...body, phone });
    const [{ id: messageID, type: messageType }] = valueObject?.messages || [{ id: '', type: '' }];



    if (messageID && phone) {
      await Whatsapp.changeMessageStatus({ status: 'read', messageID, phone });
    }

    if (valueObject?.statuses?.length) {
      const [{ id, status }] = valueObject?.statuses || [{ id: '', status: '' }];
      if (id && status) {
        await whatsappSentMessagesModel.Model.updateOne({ 'messages.id': id }, { status });
      }
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