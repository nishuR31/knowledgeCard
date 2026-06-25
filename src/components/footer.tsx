import Dock from './ui/dock';
import { BookText, House, Cog, BatteryCharging, BatteryFull, BatteryMedium, BatteryLow, BatteryWarning, Globe, GlobeOff, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useBattery from '../hooks/useBattery.jsx';
import useOnline from '../hooks/useOnline.jsx';

const Footer = () => {
  const navigate = useNavigate();
  const { charging, level, err } = useBattery();
  const online = useOnline();
  const func = () => { };

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
    <footer className="bg-transparent text-white py-6 min-w-screen">
      <div className="flex justify-center mb-4">
        <Dock items={items} panelHeight={68} baseItemSize={50} magnification={65} />
      </div>
      <div className="flex flex-col items-center text-sm space-y-1">
        <div>© 2026 Knowledge Card. All rights reserved.</div>
        <div className="flex flex-wrap flex-row space-x-4">
          <Link to="/privacy" className="">Privacy Policy</Link>
          <Link to="/terms" className="">Terms of Service</Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;