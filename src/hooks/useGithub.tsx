import { useState, useEffect } from "react";

interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  // Add any other fields you need
  [key: string]: any;
}

export default function useGithub(username: string) {
  const [data, setData] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setError("Username is required");
      return;
    }
    let isMounted = true;
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        const json = await response.json();
        if (isMounted) {
          setData(json as GithubUser);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          if (err.name !== "AbortError") {
            setError(err.message || "Failed to fetch GitHub data");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [username]);

  return { data, loading, error };
}
