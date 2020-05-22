import en from "vee-validate/dist/locale/en.json";
import {
    required,
    email,
    min,
    max,
    alpha_spaces,
    alpha_dash,
    size,
    dimensions,
    mimes,
    numeric
} from "vee-validate/dist/rules";
import { extend, localize } from "vee-validate";

localize("en", en);

extend("required", {
    ...required,
    message: "This field is required"
});

extend("email", email);

extend("min", min);

extend("max", max);

extend("alpha_spaces", alpha_spaces);

extend("alpha_dash", alpha_dash);

extend("size", size);

extend("dimensions", dimensions);

extend("mimes", mimes);

extend("numeric", numeric);

extend("decimal", {
    validate: (value, { decimals = "*", separator = "." } = {}) => {
        if (value === null || value === undefined || value === '') {
            return {
                valid: false
            };
        }
        if (Number(decimals) === 0) {
            return {
                valid: /^-?\d*$/.test(value),
            };
        }
        const regexPart = decimals === "*" ? "+" : `{1,${decimals}}`;
        const regex = new RegExp(
            `^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`
        );
        return {
            valid: regex.test(value),
            data: {
                serverMessage: "Only decimal values are available"
            }
        };
    },
    message: `{serverMessage}`
});
