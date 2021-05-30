import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from 'components/locales/en/translationEN.json';
import translationNL from 'components/locales/nl/translationNL.json';

const resources = {
	en: {
		translation: translationEN,
	},
	nl: {
		translation: translationNL,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: `en`,

	keySeperator: false,

	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
