import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(
    key: string,
    intitialValue: T | (() => T)
) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue == null) {
            if (typeof intitialValue === 'function') {
                return (intitialValue as () => T)();
            } else {
                return intitialValue;
            }
        } else {
            return JSON.parse(jsonValue);
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue] as [T, typeof setValue];
}
