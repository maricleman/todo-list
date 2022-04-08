/// <reference types="react" />
export declare const useInput: (initialValue: any) => {
    value: any;
    setValue: import("react").Dispatch<any>;
    reset: () => void;
    bind: {
        value: any;
        onChange: (event: any) => void;
    };
};
