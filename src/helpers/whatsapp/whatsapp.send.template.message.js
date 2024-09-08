import rp from 'request-promise';

const { WHATSAPP_PHONE_ID, WHATSAPP_URL, WHATSAPP_ACCESS_TOKEN } = process.env;

async function sendTemplateMessage ({ templateName, phone, imageURL }) {
  const templateComponents = getTemplateComponents({ imageURL });
  try {
    const requestOptions = {
      uri: `${WHATSAPP_URL}/${WHATSAPP_PHONE_ID}/messages`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`
      },
      body: {
        messaging_product: 'whatsapp',
        to: phone,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: 'ar'
          },
          components: templateComponents
        }
      },
      json: true,
      throwHttpErrors: false,
      simple: false,
      resolveWithFullResponse: true
    };

    const response = await rp(requestOptions);

    const { statusCode, body } = response;

    if (statusCode !== 200 && statusCode !== 201) {
      console.log('Error sending whatsapp template message', JSON.stringify(body, null, 2));
      return { case: 2, message: 'Template message was not sent' };
    }
    return { case: 1, message: 'Template message was sent successfully.', body };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function getTemplateComponents ({ imageURL }) {

  const components = [];
  if (imageURL) {
    components.push({
      type: 'header',
      parameters: [
        {
          type: 'image',
          image: {
            link: imageURL
          }
        }
      ]
    });
  }

  return components;
}
export default sendTemplateMessage;