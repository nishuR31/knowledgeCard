import Dock from './ui/dock.js';
import { BookText, House, Cog, BatteryCharging, BatteryFull, BatteryMedium, BatteryLow, BatteryWarning, Globe, GlobeOff, User, ArrowUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useBattery from '../hooks/useBattery.js';
import useOnline from '../hooks/useOnline.js';

const Footer = () => {
  const navigate = useNavigate();
  const { charging, level: rawLevel, err } = useBattery();
  const level = rawLevel ?? 0;
  const online = useOnline();
  const func = () => { };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const items = [
    { icon: <House size={20} />, label: 'Home', onClick: () => navigate('/') },
    { icon: <BookText size={20} />, label: 'Knowledge', onClick: () => navigate('/knowledge') },
    { icon: <User size={20} />, label: 'Author', onClick: () => navigate('/author') },
    { icon: <Cog size={20} />, label: 'Settings', onClick: () => navigate('/settings') },
    err ?
      { icon: <BatteryWarning size={20} className='text-red-700' />, label: err, onClick: func } :
      charging ? { icon: <BatteryCharging size={20} className='text-blue-500' />, label: level + "%", onClick: func } :
        (level > 70) ? { icon: <BatteryFull size={20} className='text-green-700' />, label: level + "%", onClick: func } :
          (level > 40) ? { icon: <BatteryMedium size={20} className='text-yellow-500' />, label: level + "%", onClick: func } :
            { icon: <BatteryLow size={20} className='text-red-600' />, label: level + "%", onClick: func },
    online ? { icon: <Globe size={20} className='text-green-700' />, label: 'Online', onClick: () => func } : { icon: <GlobeOff size={20} className='text-red-600' />, label: 'Home', onClick: () => func },
  ];

  return (
    <footer className="bg-transparent text-white  max-w-screen">
      <div className="flex justify-center mb-4">
        <Dock items={items} panelHeight={68} baseItemSize={50} magnification={65} />
      </div>
      <div className="card flex flex-row justify-around items-center text-sm h-25 space-y-1">
        <div>
          <Link to="/" className="flex items-center">
            <img src="/favicon.png" alt="Logo" className="overflow-hidden object-contain scale-150 h-24 w-24 pt-1" />
          </Link>
        </div>
        <div className='flex flex-col justify-center text-center space-y-5'>

          <div>© 2026 Knowledge Card. All rights reserved.</div>
          <div className="flex text-[clamp(1rem,1vw,2rem)] flex-wrap flex-row space-x-4">
            <Link to="/privacy" className="font-bond text-muted">Privacy Policy</Link>
            <Link to="/terms" className="font-bond text-muted">Terms of Service</Link>
            <Link to="/author" className="font-bond text-muted">Author</Link>
          </div>
        </div>
        <div className="">

          <button onClick={scrollToTop} className="p-2 rounded-full animate-bounce card transition">
            <ArrowUp size={20} />
          </button>
        </div>

      </div>


    </footer >
  );
};

export default Footer;