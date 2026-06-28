import { useSelector } from "react-redux";
import KnowledgeCard from "../components/ui/KnowledgeCard";
import Strands from "../components/ui/strands";
import data from "../data/data";
import type { RootState } from "../store/store";

export default function Knowledge() {
    const theme = useSelector((state: RootState) => state.themeSlice.theme);
    const strandColors =
        theme === "dark"
            ? [
                "#062e1f", // deep forest green
                "#0b3d2e", // dark emerald
                "#123524", // pine green
                "#1a3b2a", // evergreen
                "#0f2f23", // dark moss
            ]
            : [
                "#8fbfa1", // soft sage
                "#9fc9b2", // muted mint
                "#a8d5ba", // pale green
                "#b7d9a8", // light olive
                "#7fbf9b", // fresh green
            ];

    return (
        <>
            <Strands
                colors={strandColors}
                count={5}
                speed={0.2}
                amplitude={2}
                waviness={2}
                thickness={0.7}
                glow={0.6}
                taper={3}
                spread={1}
                intensity={0.6}
                saturation={2}
                opacity={1}
                scale={1.5}
                glass={true}
                refraction={1}
                dispersion={5}
                glassSize={1}
                hueShift={0}
                className="fixed inset-0 w-100vw! h-100vh! z-0"
            />
            <main className="p-4">
                <div className="flex flex-row flex-wrap justify-around gap-5">
                    {data.map((card, index) => (
                        <KnowledgeCard key={index} card={card} />
                    ))}
                </div>
            </main>
        </>
    );
}