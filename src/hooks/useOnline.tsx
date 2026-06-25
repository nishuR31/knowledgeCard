import { useState, useEffect } from "react";

interface Online {
    onLine?: boolean;
    online?: boolean;
    addEventListener?: (event: string, handler: () => void) => void;
    removeEventListener?: (event: string, handler: () => void) => void;
}

const useOnline = (): Online["online"] => {
    const [online, setOnline] = useState((navigator as Online).onLine);
    useEffect(() => {
        const handleOnline = () => setOnline(true);
        const handleOffline = () => setOnline(false);
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);
    return online;
};

export default useOnline;