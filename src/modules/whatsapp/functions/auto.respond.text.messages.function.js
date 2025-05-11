const defaultMessages = [
  'مرحبًا بك في قوافل',
  '',
  'للحصول على المساعدة',
  'يرجى التواصل معنا على الرقم التالي : ',
  'https://wa.me/966115107035',
  '',
  'شكرا لتواصلكم معنا.'
];

function autoRespondMessages () {

  return defaultMessages.join('\n');



}
export default autoRespondMessages;