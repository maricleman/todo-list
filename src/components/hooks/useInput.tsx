import { useState } from "react";

/**
 * Custom hook to simplify form submission.
 * Read more here:
 * https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
 */

export const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        reset: () => setValue(""),
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value);
            }
        }
    };
};