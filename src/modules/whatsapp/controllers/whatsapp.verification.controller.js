const { WHATSAPP_VERIFICATION_TOKEN } = process.env;

export default (req, res) => {

  const { query } = req;

  const mode = query['hub.mode'];
  const token = query['hub.verify_token'];
  const challenge = query['hub.challenge'];
  console.log(JSON.stringify(query, null, 2));
  if (mode !== 'subscribe' || token !== WHATSAPP_VERIFICATION_TOKEN) {
    return res.sendStatus(403);
  }

  return res.status(200).send(challenge);

};