import Button from '../components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { setTheme, setBase } from '../features/themeSlice';
import { ArrowBigRightDash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Strands from '../components/ui/strands';

const Settings = () => {
    const theme = useSelector((state: RootState) => state.themeSlice.theme);
    const base = useSelector((state: RootState) => state.themeSlice.base);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch(setTheme({ theme: newTheme }));
        document.body.classList.remove(theme);
        document.body.classList.add(newTheme);
    };

    const changeBase = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newBase = e.target.value as "mini" | "glass" | "clay";
        dispatch(setBase({ base: newBase }));
        document.body.classList.remove(base);
        document.body.classList.add(newBase);
    };

    const preview = (
        <div className="card border text-theme w-72 p-5 space-y-4">
            <div>
                <div className="flex items-center justify-between">
                    <h3 className="text-primary text-lg font-bold">
                        Premium Preview
                    </h3>

                    <span className="badge bg-primary text-primary">
                        PRO
                    </span>
                </div>

                <p className="text-muted text-sm mt-1">
                    Preview how colors, spacing and components adapt to the theme.
                </p>
            </div>

            <input
                type="text"
                placeholder="Enter your name"
                className="input   text-foreground placeholder:text-muted"
            />

            <div className="flex flex-row flex-wrap justify-around gap-2">
                <Button
                    text="Primary"
                    variant="primary"
                    size="sm"
                />
                <Button
                    text="Outline"
                    variant="outline"
                    size="sm"
                />
                <Button
                    text="Ghost"
                    variant="ghost"
                    size="sm"
                />

                <Button
                    text="Secondary"
                    variant="secondary"
                    size="sm"
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-1 p-3">
                    <p className="text-xs text-muted">
                        Revenue
                    </p>
                    <p className="text-primary font-bold">
                        $12.4k
                    </p>
                </div>

                <div className="rounded-lg border border-border bg-accent p-3">
                    <p className="text-xs text-muted">
                        Growth
                    </p>
                    <p className="text-primary font-bold">
                        +24%
                    </p>
                </div>
            </div>

            <div>
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted">
                        Progress
                    </span>
                    <span className="text-primary">
                        78%
                    </span>
                </div>

                <div className="h-2 rounded-full  overflow-hidden">
                    <div
                        className="h-full  rounded-full"
                        style={{ width: "78%" }}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center border-t border-border pt-3">
                <span className="text-muted-foreground text-xs">
                    Active Theme
                </span>

                <span className="text-success font-medium">
                    ● Connected
                </span>
            </div>
        </div>
    );

    return (
        <>
            <Strands

                colors={["#ff0000", "#ff8306", "#ff4c05", "#ff0000"]}
                count={5}
                speed={0.3}
                amplitude={2}
                waviness={1}
                thickness={1}
                glow={1}
                taper={3}
                spread={1}
                intensity={0.5}
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
            <main className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-transparent p-8 px-10 z-10">
                <h1 className="mb-6 text-3xl font-bold text-primary">Settings</h1>
                <p className="mb-4 text-center text-secondary max-w-md">Adjust the theme and base style of the app. Your choices are reflected instantly.</p>
                <div className="mb-4">
                    <p className="mb-2 text-muted">Current Theme: <strong className='text-theme'>{theme}</strong></p>
                    <Button text={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`} variant="primary" size="md" onClick={toggleTheme} />
                </div>
                <div className="mb-4">
                    <label className="mr-2 text-theme" htmlFor="baseSelect">Base Style:</label>
                    <select id="baseSelect" value={base} onChange={changeBase} className="border dropdown rounded p-1">
                        <option value="glass" className='glass text-primary'>Glass</option>
                        <option value="mini" className='mini text-primary'>Mini</option>
                        <option value="clay" className='clay text-primary'>Clay</option>
                    </select>
                </div>
                {preview}
                <Button text="Back to Home" variant="outline" size="md" icon={ArrowBigRightDash} onClick={() => navigate('/')} className="mt-6" />
            </main>
        </>
    );
};

export default Settings;
