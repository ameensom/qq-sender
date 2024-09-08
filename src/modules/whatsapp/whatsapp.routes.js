import * as whatsapp from './controllers/index.js';


export default function (app) {
  app.post('/api/whatsapp/webhook/', whatsapp.webhook);
  app.get('/api/whatsapp/webhook/', whatsapp.verification);
  app.post('/api/whatsapp/send/', whatsapp.send);
}