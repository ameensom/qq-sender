import rp from 'request-promise';

const { WHATSAPP_URL, WHATSAPP_ACCESS_TOKEN } = process.env;

async function sendMediaMessage ({ mediaId }) {

  try {
    const requestOptions = {
      uri: `${WHATSAPP_URL}/${mediaId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`
      },
      json: true,
      throwHttpErrors: false,
      simple: false,
      resolveWithFullResponse: true
    };


    const response = await rp(requestOptions);

    const { statusCode, body } = response;

    if (statusCode !== 200 && statusCode !== 201 || !body.id) {
      return { case: 2, message: 'Media was not found' };
    }
    return { case: 1, message: 'Media was found successfully.', body };
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export default sendMediaMessage;