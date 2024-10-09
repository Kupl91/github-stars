import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
  html_url: string;
}

const fetchPopularRepos = async (): Promise<Repo[]> => {
  const res = await axios.get(
    'https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc'
  );
  return res.data.items;
};

const Home: React.FC = () => {
  const { data, error, isLoading } = useQuery<Repo[], Error>(
    'popularRepos',
    fetchPopularRepos
  );

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Популярные TS проекты на GitHub</h1>
      <ul>
        {data?.map(repo => (
          <li key={repo.id} className="mb-2">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {repo.name}
            </a> - ⭐ {repo.stargazers_count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;