const defaultMessages = [
  'شكرا لتواصلك مع قوافل',
  '',
  'عذرا و لكننا لا نتابع الرسائل الواردة الى هذا الرقم',
  '',
  'للاستفسار بخصوص خدماتنا او للمساعدة في حال واجهتك مشكلة',
  '',
  'https://wa.me/',
  '',
  'او عبر البريد الالكتروني 📨',
  'hello@qawafel.sa'
];

function autoRespondMessages () {

  return defaultMessages.join('\n');



}
export default autoRespondMessages;