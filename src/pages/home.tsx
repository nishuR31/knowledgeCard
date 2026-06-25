import DecryptedText from '../components/ui/decryptText';
import { useNavigate } from 'react-router-dom';
import Strands from '../components/ui/strands';
import Button from '../components/ui/button';
import { ArrowBigRightDash } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';


export default function HomePage() {
    const navigate = useNavigate();
    const theme = useSelector((state: RootState) => state.themeSlice.theme);
    const strandColors =
        theme === "dark"
            ? [
                "#ff5500",
                "#ff0080",
                "#00d4ff",
                "#2563eb",
                "#22c55e",
            ]
            : [
                "#60a5fa",
                "#2dd4bf",
                "#c084fc",
                "#f59e0b",
                "#10b981",
            ];
    return (
        <>

            <main className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-transparent p-8 px-10">
                {/* Hero Title */}


                <h1 className="mb-6 text-[clamp(3rem,5vw,5rem)] py-10 flex mt-4 font-extrabold text-primary drop-shadow-lg">
                    Knowledge Card
                </h1>
                <Strands
                    colors={strandColors}
                    count={5}
                    speed={0.2}
                    amplitude={2}
                    waviness={2}
                    thickness={0.7}
                    glow={2}
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
                <hr className='w-[clamp(600px,5vw,1000px)] h-[10px] rounded-md  my-10 backdrop-blur-sm' />
                {/* Sub‑title with decryption animation for visual flair */}
                <DecryptedText
                    text="Your personal knowledge hub – capture, organize, and share insights instantly."
                    speed={40}
                    maxIterations={8}
                    sequential
                    animateOn="hover"
                    revealDirection="center"
                    className="text-secondary font-bold italic tracking-wide w-lg text-lg opacity-90"
                    encryptedClassName="text-muted"
                />

                {/* Brief description */}
                <p className="mt-4 min-w-screen text-center text-lg text-muted">
                    Knowledge Card is a lightweight web app that lets you see and manage knowledge cards
                    with a sleek, modern interface. Powered by React, Redux Toolkit, and cutting‑edge
                    visual effects, it brings your knowledge to life.
                </p>

                {/* Call‑to‑action button */}
                <hr className='w-[clamp(600px,5vw,1000px)] h-[10px] rounded-md  my-10 backdrop-blur-sm' />
                <Button
                    text="Get Started"
                    variant='primary'
                    icon={ArrowBigRightDash}
                    onClick={() => navigate("/knowledge")}
                />

            </main>

        </>)
};