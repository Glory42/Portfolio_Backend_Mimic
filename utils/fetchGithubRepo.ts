import type { GithubRepo } from '../Types/GithubRepos.js';

export default async function fetchGithubRepos(): Promise<GithubRepo[]> {
  const token = process.env.GITHUB_REPO_TOKEN;

  const response = await fetch("https://api.github.com/users/yourUsername/repos", {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `token ${token}` })
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${text}`);
  }

  const data: GithubRepo[] = await response.json();
  const filterdData = data.filter((repo: GithubRepo) => repo.topics?.includes('featured'));
  return filterdData;
}