
import Footer from '../components/footer';
import Strands from '../components/ui/strands';
import Button from '../components/ui/button';
import { Cog, Undo2, UndoIcon } from 'lucide-react';
import { animate } from 'animejs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export default function NotFound() {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const theme = useSelector((state: RootState) => state.themeSlice.theme);
    const strandColors = theme === 'dark'
        ? ["#5c1a1a", "#7a2020", "#6b1f1f", "#4a1515"] // muted dark maroon
        : ["#c4857a", "#b87070", "#c9908a", "#b06060"]; // muted dusty rose
    const messages = ["Oops! The page you’re looking for doesn’t exist.", "You can go back or head home!", "But if you stayed here for too long you might get stuck here forever...", "Just Kidding! probably!", "Why dont you try searching for it!", "You might just lost some of your knowledge cards"]

    const [location, setLocation] = useState("");
    const loc = useLocation();

    useEffect(() => {
        setLocation(loc.pathname);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            animate("#desc", {
                opacity: [1, 0],
                y: [
                    { to: '-2.75rem', ease: 'outExpo', duration: 600 },
                    { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
                ],
                duration: 1000,
                easing: 'easeOutExpo',
                onComplete: () => {
                    setIndex((prev) => (prev + 1) % messages.length);

                    requestAnimationFrame(() => {
                        animate("#desc", {
                            opacity: [0, 1],
                            y: [
                                { to: '-2.75rem', ease: 'outExpo', duration: 600 },
                                { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
                            ],
                            duration: 1000,
                            easing: 'easeOutExpo',
                        });
                    });
                },
            });
        }, 2500);

        return () => clearInterval(interval);
    }, []);


    return (
        <>
            {/* Animated background */}
            <Strands
                colors={strandColors}
                count={5}
                speed={0.3}
                amplitude={2}
                waviness={1}
                thickness={1}
                glow={3}
                taper={3}
                spread={1}
                intensity={0.4}
                saturation={1}
                opacity={1}
                scale={1.7}
                glass={true}
                refraction={1}
                dispersion={1}
                glassSize={1}
                hueShift={0}
                className="fixed inset-0 w-100vw! h-100vh! -z-0"
            />
            <main className="relative flex min-h-screen flex-col items-center justify-center bg-transparent  p-8 transition-all duration-[2000ms] ease-in-out z-10">
                <div className=" text-center  p-8 rounded-xl backdrop-blur-md bg-transparent shadow-2xl">
                    <div className='flex flex-row items-center justify-center gap-2'>
                        <span className="text-[clamp(3rem,5vw,5rem)] font-extrabold drop-shadow-lg text-theme">4</span>
                        <span className='animate-spin text-muted'><Cog size={50} /></span>
                        <span className="text-[clamp(3rem,5vw,5rem)] font-extrabold drop-shadow-lg text-theme">4</span>
                    </div>
                    <div className=' italic font-bold my-5'>
                        Url: <span className='text-theme card'>{location}</span> not found or doesn’t exist

                    </div>
                    <br />
                    <p id="desc" className="mt-4 py-5 text-2xl font-medium text-muted w-xl">{messages[index]}</p>


                    <div className='flex flex-row flex-wrap justify-center gap-5 pt-5'>
                        <Button text="Go Home" type='button' className='' variant='ghost' size='md' icon={UndoIcon} onClick={() => navigate('/')} />
                        <Button text="Go Back" type='button' className='' variant='primary' size='md' icon={Undo2} onClick={() => window.history.back()} />
                    </div>


                </div>
            </main>
            <Footer />
        </>
    );
}
