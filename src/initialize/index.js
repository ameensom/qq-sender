/**
 *
 * @param {import('express').Application} app
 */

import * as whatsapp from 'q-notifications/helpers/whatsapp/index.js';
import fs from 'fs-extra';

export default async function (app) {
  await import('./init.env.js');
  await import('./init.express.js');
  await import('./init.database.js');
  const { default: initRoutes } = await import('./init.routes.js');
  await initRoutes(app);
  // run().catch(console.error);
}
async function run () {
  const { default: WhatsappSentMessage } = await import('q-notifications/modules/whatsapp/whatsapp.sent.messages.model.js');

  const payload = {
    toNumber: '',
    templateName: 'qawafel_is_back',

    imageURL: 'https://ameensom.com/image.png'
  };
  let count = 1;

  const files = [1];
  for (const file of files) {
    // const readFile = await fs.readFile(`./a0000${file}.csv`).catch(console.error);
    // if (!readFile) {
    //   continue;
    // }
    // const numbers = readFile.toString().split('\n');
    await sendMessages(['966569996970']);
    console.log(`File ${file} done`);
  }

  async function sendMessages (numbersToSend) {
    const dndNumbers = doNotDisturb();

    await Promise.map(numbersToSend, async (number) => {
      payload.toNumber = number;

      if (dndNumbers.includes(number)) {
        console.log(`Do not disturb number ${number}`);
        return;
      }

      const { toNumber, templateName, imageURL } = payload;
      const whatsappSentMessage = new WhatsappSentMessage();

      await whatsappSentMessage.save();

      const phone = toNumber[0] === '+' ? toNumber : `+${toNumber}`;
      const text = 'أمين';

      const sendMessage = await whatsapp.sendMessage({ templateName, phone, imageURL, text });

      const { body } = sendMessage;

      await WhatsappSentMessage.updateOne({ _id: whatsappSentMessage._id }, { status: 'sent', ...body });
      console.log(`Message sent to ${number} - ${count++}`);

    }, { concurrency: 20 });
  }

}

function doNotDisturb () {
  return [
    '+966537020381', '+966554143669', '+966594080414', '+966561514946', '+966500796509', '+966551484070', '+966549009060', '+966554721112', '+966554100780', '+966563961083', '+966554922444', '+966500603311', '+966537900511', '+966553479975', '+966535820756', '+966533555423', '+966556999046', '+966508897379', '+966555379906', '+966554683266', '+966550336800', '+966502452252', '+966580871401', '+966538036701', '+966559193374', '+966504264485', '+966582810636', '+966556376484', '+966502638328', '+966559439923', '+966502180168', '+966508688301', '+966536036841', '+966551994985', '+966569640135', '+966504976895', '+966551115992', '+966570003849', '+966504712741'
  ];
}