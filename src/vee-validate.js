import { defineRule, configure } from 'vee-validate';
import {required, email, min, max, digits, alpha, confirmed} from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

configure({
    // Generates an English message locale generator
    generateMessage: localize('fr', {
        messages: {
            required: 'Champ requis',
            email: 'Veuillez saisir une adresse e-mail valide',
            digits: `Le champ doit contenir exactement 0:{length} chiffres`,
            confirmed: 'Les champs ne correspondent pas',
            alpha: `Le champ doit contenir uniquement des lettres`,
            max: `Le champ ne doit pas contenir plus de {length} caratères`,
            min: `Le champ doit contenir au moins {params} caratères`,
            alphaTiret: `Le champ ne peut pas contenir de chiffres`,
            oneUppercase: 'Le champ doit contenir une majuscule',
            oneLowercase: 'Le champ doit contenir une minuscule',
            oneNumber: 'Le champ doit contenir un chiffre',
            noNumber: 'Le champ  ne doit pas contenir de chiffre',
        },
    }),
});

defineRule('required',required);
defineRule('email', email);
defineRule('digits', digits);
defineRule('confirmed', confirmed);
defineRule('alpha', alpha);
defineRule('min', min);
defineRule('max', max);
defineRule("alphaTiret", value => {
        if (!value || !value.length) {
            return true;
        }
        return value?.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\-. '’ʼʹˈ]+$/g) !== null;
});

defineRule("oneUppercase", value => value?.match(/[A-Z]/g) !== null);
defineRule("oneLowercase", value => value?.match(/[a-z]/g) !== null);
defineRule("oneNumber", value => value?.match(/[0-9]/g) !== null);
defineRule("noNumber", value => value?.match(/[0-9]/g) === null);
defineRule("oneOfSelected",  (value, values) => values?.some(a => JSON.stringify(a) === JSON.stringify(value)));
