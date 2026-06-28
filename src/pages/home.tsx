import DecryptedText from '../components/ui/decryptText';
import { useNavigate } from 'react-router-dom';
import Strands from '../components/ui/strands';
import Button from '../components/ui/button';
import { ArrowBigRightDash } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useEffect } from 'react';


export default function HomePage() {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    const theme = useSelector((state: RootState) => state.themeSlice.theme);
    const strandColors =
        theme === "dark"
            ? [
                "#1e3a6e", // deep navy
                "#2a1a5e", // dark indigo
                "#0e4a6e", // dark teal-blue
                "#1a3a5c", // midnight blue
                "#162d4a", // dark slate blue
            ]
            : [
                "#7c9cbf", // muted steel blue
                "#8fadb8", // dusty teal
                "#a89fc4", // soft lavender
                "#b5a87a", // warm sand
                "#7aab8a", // muted sage
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
                glow={1}
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
            <main className="flex min-h-screen  min-w-screen flex-col items-center justify-center bg-transparent p-8 px-10 z-10">
                {/* Hero Title */}


                <h1 className="mb-6 text-[clamp(3rem,5vw,5rem)] py-10 flex mt-4 font-extrabold text-primary drop-shadow-lg">
                    Knowledge Card
                </h1>
                <hr className='text-transparent w-[clamp(600px,5vw,1000px)] h-[10px] rounded-md  my-10 backdrop-blur-sm' />
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
                <p className=" card mt-4 min-w-screen text-center text-lg text-muted">
                    Knowledge Card is a lightweight web app that lets you see and manage knowledge cards
                    with a sleek, modern interface. Powered by React, Redux Toolkit, and cutting‑edge
                    visual effects, it brings your knowledge to life.
                </p>

                {/* Call‑to‑action button */}
                <hr className=' text-transparent w-[clamp(600px,5vw,1000px)] h-[10px] rounded-md  my-10 backdrop-blur-lg' />
                <Button
                    text="Get Started"
                    variant='primary'
                    icon={ArrowBigRightDash}
                    onClick={() => navigate("/knowledge")}
                />

            </main>

        </>)
};