Balanced.COOKIE = {
    MARKETPLACE_URI: 'mru',
    API_KEY_SECRET: 'apiKeySecret',
    EMBER_AUTH_TOKEN: 'ember-auth-rememberable',
    CSRF_TOKEN: 'csrftoken',
    SESSION: 'session',
    set: function (name, value, options) {
        $.cookie(name, value, options);
    }
};

Balanced.TIME = {
    THREE_YEARS: 365 * 3
};

Balanced.KEYS = {
    ENTER: 13,
    ESCAPE: 27
};

Balanced.BANK_ACCOUNT_TYPES = [
    {
        label: 'Checking',
        value: 'checking'
    },
    {
        label: 'Savings',
        value: 'savings'
    }
];

Balanced.SEARCH = {
    CATEGORIES: ['transaction', 'account', 'funding_instrument'],
    TRANSACTION_TYPES: ['debit', 'credit', 'hold', 'refund'],
    FUNDING_INSTRUMENT_TYPES: ['bank_account', 'card']
};

//  time in ms to throttle between key presses for search
Balanced.THROTTLE = 400;

Balanced.PASSWORD = {
    MIN_CHARS: 6,
    REGEX: /(?=.*[A-z])(?=.*\d)/
};

