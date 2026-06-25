import { useState, useEffect } from "react";

interface BatteryManager extends EventTarget {
    level: number;
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
}

interface NavigatorWithBattery extends Navigator {
    getBattery?: () => Promise<BatteryManager>;
}

interface BatteryState {
    level: number;
    charging: boolean;
    err: string | null;
}

const useBattery = (): BatteryState => {
    const [level, setLevel] = useState(0);
    const [charging, setCharging] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        const nav = navigator as NavigatorWithBattery;
        if (!nav.getBattery) {
            setErr("Battery API not supported");
            return;
        }
        let battery: BatteryManager | null = null;
        const update = () => {
            if (!battery) return;
            setLevel(Math.round(battery.level * 100));
            setCharging(battery.charging);
        };
        nav.getBattery().then((b) => {
            battery = b;
            update();
            b.addEventListener("levelchange", update);
            b.addEventListener("chargingchange", update);
        }).catch((e: unknown) => {
            setErr(e instanceof Error ? e.message : "Battery error");
        });
        return () => {
            if (battery) {
                battery.removeEventListener("levelchange", update);
                battery.removeEventListener("chargingchange", update);
            }
        };
    }, []);

    return { charging, level, err };
};

export default useBattery;
