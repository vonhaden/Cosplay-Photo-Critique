import en from "vee-validate/dist/locale/en.json";
import { required, email, min, max } from "vee-validate/dist/rules";
import { extend, localize } from "vee-validate";

extend("required", {
    ...required,
    message: "This field is required"
});

extend("email", email);

extend("min", min);

extend("max", max);

localize("en", en);
