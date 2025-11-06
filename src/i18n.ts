import i18next from 'i18next';
import { LanguageDetector } from 'i18next-http-middleware';

const languageDetector = new LanguageDetector(null, {
  order: ['cookie', 'header'],
  lookupCookie: 'nextdeal-language',
});

i18next
  .use(languageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en'],
    resources: {
      en: {
        common: {
          welcome: "Welcome",
        },
      },
    },
    keySeparator: false,
    ns: ['common'],
    defaultNS: 'common',
    debug: false,
  });

i18next.on('languageChanged', () => {
  // console.log({ l });
});

export default i18next;
