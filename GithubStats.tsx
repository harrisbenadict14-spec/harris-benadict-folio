import { useQuery } from '@tanstack/react-query';
import { Github } from 'lucide-react';

export default function GithubStats({ username = 'harris-benadict' }: { username?: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['github-user', username],
    queryFn: async () => {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error('Failed to fetch GitHub data');
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // Cache data for 1 hour
  });

  if (isLoading) {
    return <div className="animate-pulse bg-muted h-24 w-72 rounded-xl"></div>;
  }

  if (error) return null; // Fail silently on portfolio

  return (
    <a 
      href={data.html_url} 
      target="_blank" 
      rel="noreferrer"
      className="group flex items-center gap-4 p-4 border rounded-xl hover:bg-muted/50 transition-colors max-w-sm"
    >
      <img src={data.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full ring-2 ring-primary/20" />
      <div>
        <h3 className="font-semibold text-lg flex items-center gap-2">
          {data.name || data.login} <Github className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </h3>
        <p className="text-sm text-muted-foreground">{data.public_repos} Repositories • {data.followers} Followers</p>
      </div>
    </a>
  );
}