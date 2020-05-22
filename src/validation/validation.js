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
    mimes
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