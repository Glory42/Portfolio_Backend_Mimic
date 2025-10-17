export type GithubRepo = {
  name: string;
  html_url: string;
  description: string;
  topics?: string[];
  [key: string]: any;
};
