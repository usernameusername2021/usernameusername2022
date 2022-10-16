const PASSWORD_RULE = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

const PASSWORD_RULE_MESSAGE = 'Password should have 1 upper case, lowercase letter and number';

export const REGEX = {
    PASSWORD_RULE,
};

export const MESSAGE = {
    PASSWORD_RULE_MESSAGE,
};