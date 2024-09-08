import Joi from 'q-notifications/helpers/joi.js';
import WhatsappSentMessage from 'q-notifications/modules/whatsapp/whatsapp.sent.messages.model.js';
import * as Whatsapp from 'q-notifications/helpers/whatsapp/index.js';

export default async (req, res) => {
  { // validation
    const expectedBody = Joi.object().keys({
      toNumber: Joi.string(),
      templateName: Joi.string(),
      secretKey: Joi.string().required(),
      customData: Joi.object().required().keys({
        imageURL: Joi.string().required()
      })
    }).required();

    const { error } = Joi.validateAndConvert({ object: req, property: 'body', expectedObject: expectedBody });
    if (error) {
      return res.status(400).json({ case: 0, message: error });
    }
  }


  const { toNumber, templateName, secretKey, customData } = req.body;
  if (secretKey !== process.env.FACEBOOK_APP_SECRET) {
    return res.status(403).json({ case: 1, message: 'Invalid secret key' });
  }
  const whatsappSentMessage = new WhatsappSentMessage();

  await whatsappSentMessage.save();

  const phone = toNumber[0] === '+' ? toNumber : `+${toNumber}`;


  const sendMessage = await Whatsapp.sendMessage({ templateName, phone, customData });

  const { body } = sendMessage;

  await WhatsappSentMessage.updateOne({ _id: whatsappSentMessage._id }, { status: 'sent', ...body });

  return res.json({
    status: 'whatsapp_accepted',
    statusCode: 0
  });

};