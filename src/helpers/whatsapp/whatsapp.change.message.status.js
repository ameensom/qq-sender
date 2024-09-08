import rp from 'request-promise';
const { WHATSAPP_PHONE_ID, WHATSAPP_URL, WHATSAPP_ACCESS_TOKEN } = process.env;

async function changeMessageStatus ({ status, messageID, phone }) {
  try {
    const response = await rp({
      uri: `${WHATSAPP_URL}/${WHATSAPP_PHONE_ID}/messages`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`
      },
      body: {
        messaging_product: 'whatsapp',
        status,
        to: phone,
        message_id: messageID
      },
      json: true,
      throwHttpErrors: false,
      simple: false,
      resolveWithFullResponse: true
    });
    const { statusCode, body } = response;

    if (statusCode !== 200 || !body.success) {
      return { case: 2, message: 'Failed to change status.', body, status, messageID, phone };
    }

    return { case: 1, message: `Message marked as ${status}`, messageID };

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default changeMessageStatus;