import rp from 'request-promise';

const { WHATSAPP_PHONE_ID, WHATSAPP_URL, WHATSAPP_ACCESS_TOKEN } = process.env;

async function sendTextMessage ({ phone, message }) {

  try {
    console.time('Whatsapp Text Message Send');
    const requestOptions = {
      uri: `${WHATSAPP_URL}/${WHATSAPP_PHONE_ID}/messages`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`
      },
      body: {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phone,
        type: 'text',
        text: { // the text object
          preview_url: false,
          body: message
        }
      },
      json: true,
      throwHttpErrors: false,
      simple: false,
      resolveWithFullResponse: true
    };

    const response = await rp(requestOptions);
    console.timeEnd('Whatsapp Text Message Send');
    const { statusCode, body } = response;

    if (statusCode !== 200 && statusCode !== 201) {
      return { case: 2, message: 'Message was not sent' };
    }
    return { case: 1, message: 'Message was sent successfully.', body };
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export default sendTextMessage;