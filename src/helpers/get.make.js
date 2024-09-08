const makes = Object.freeze({
  genuine: 'أصلي وكالة',
  original: 'أصلي',
  replacement: 'بديل',
  used: 'مستعمل',
  renewed: 'مجدد'
});

export default (make) => {
  if (!makes[make]) {
    return { nameArabic: '', nameEnglish: '' };
  }

  return { nameArabic: makes[make], nameEnglish: make.charAt(0).toUpperCase() + make.slice(1) };
};