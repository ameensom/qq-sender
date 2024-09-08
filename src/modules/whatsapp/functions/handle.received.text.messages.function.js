import * as Whatsapp from 'q-notifications/helpers/whatsapp/index.js';
import autoRespondMessages from './auto.respond.text.messages.function.js';

async function receivedTextMessage ({ phone, whatsAppNotificaiton }) {

  const openConversationMessage = autoRespondMessages();
  await Whatsapp.sendMessage({ phone, message: openConversationMessage });

  return;




}

export default receivedTextMessage;