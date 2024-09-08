const defaultMessages = [
  'مرحبًا بك في قوافل! للحصول على المساعدة،',
  ':يرجى التواصل معنا على الرقم التالي',
  '966506925762',
  '.شكرا لتواصلكم معنا.'
];

function autoRespondMessages () {

  return defaultMessages.join('\n');



}
export default autoRespondMessages;