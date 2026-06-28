import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/ui/button';
import useGithub from '../hooks/useGithub';
import { setUser } from '../features/userSlice';
import type { RootState } from '../store/store';
import Strands from '../components/ui/strands';
import { GitBranch, GitCommit, ChevronLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const strandColors = ["#3b82f6", "#06b6d4", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];



const Author = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = 'nishur31'; // Replace with actual GitHub username
  const existingUser = useSelector((state: RootState) => state.userSlice.user);
  // Always call the hook to comply with React Hooks rules
  const { data: githubData, loading, error } = useGithub(username);
  const data = existingUser ?? githubData;
  const regex: RegExp = /(@\w+)/g;

  const dataBio = data?.bio
    ?.split(regex)
    .map((part: string, index: number) => {
      if (regex.test(part)) {
        const username = part.slice(1);

        return (
          <a
            key={index}
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted font-bold hover:underline"
          >
            {part}
          </a>
        );
      }

      return part;
    });

  useEffect(() => {
    if (!existingUser && data) {
      dispatch(setUser(data));
    }

  }, [data, existingUser, dispatch]);

  if (loading) return <p className='text-muted'>Loading author information...</p>;
  if (error) return <p className='text-danger'>Failed to load author information.</p>;
  if (!data) return <p className='text-muted'>No author information available.</p>;



  return (<>
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
    <div className="card max-w-2xl max-h-fit my-10 mx-auto align-center justify-center flex flex-col items-center bg-transparent  z-10">
      <img src={data?.avatar_url ?? ""} alt={data.login} className="rounded-full w-32 h-32 mb-4" />
      <h1 className="text-3xl font-bold mb-2 text-secondary">{data.name || data.login}</h1>
      {/* {data.bio && <p className="text-center font-bold italic max-w-md mb-4 text-muted" >{data.bio}</p> */}
      <p>{dataBio}</p>
      <div className="flex flex-wrap flex-row justify-around space-x-4">
        <div className='badge card text-theme'>
          {data.followers} Followers
        </div>
        <div className='badge card text-theme'>
          {data.following} Following
        </div>      </div>

      <div className="mt-5 flex flex-wrap flex-row justify-around space-x-4 gap-4">
        <Button
          text="GitHub Profile"
          variant="primary"
          size="md"
          icon={GitBranch}
          onClick={() => window.open(data.html_url, '_blank')}
        />
        <Button
          text="GitHub Repo"
          variant="outline"
          size="md"
          icon={GitCommit}
          onClick={() => window.open("https://github.com/nishuR31?tab=repositories", '_blank')}
        />
        <Button
          text="Back Home"
          variant="ghost"
          size="md"
          icon={ChevronLeftIcon}
          onClick={() => navigate('/')}
        />

      </div>
    </div></>
  );
};

export default Author;
