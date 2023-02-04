export const regexpEnum: {PASSWORD: RegExp, EMAIL: RegExp, PHONE: RegExp} = {
    PASSWORD: /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,15})$/,
    EMAIL: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
    PHONE: /^[+]*[0-9]{5,20}$/
};
