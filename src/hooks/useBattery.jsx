import { useState, useEffect } from "react";

const useBattery = () => {
    const [level, setLevel] = useState(0);
    const [charging, setCharging] = useState(false);
    const [err, setErr] = useState(null);
    useEffect(() => {
        try {
            const update = () => {
                navigator.getBattery().then((b) => {
                    setLevel(b.level * 100);
                    setCharging(b.charging);
                });
            };
            update();
            navigator.getBattery().then((b) => {
                b.addEventListener("levelchange", update);
                b.addEventListener("chargingchange", update);
            });
        }
        catch (err) {
            setErr(err.message);
        }
    }, []);
    return { charging, level, err };
};

export default useBattery;
