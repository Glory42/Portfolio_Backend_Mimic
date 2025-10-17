import { ContributionCalendar } from '../Types/GithubStatus.js'

async function fetchGithubStatus(): Promise<ContributionCalendar> {
    const username = 'yourUsername';
    const token = process.env.GITHUB_STATUS_TOKEN;
    if (!token) throw new Error('GitHub token not set in environment variables');

    const fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - 1);
    const toDate = new Date();

    const query = `
        query {
            user(login: "${username}") {
                contributionsCollection(from: "${fromDate.toISOString()}", to: "${toDate.toISOString()}") {
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                                color
                            }
                        }
                    }
                }
            }
        }
    `;

    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github+json',
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${text}`);
    }

    const data = await response.json();
    const calendar: ContributionCalendar = data.data.user.contributionsCollection.contributionCalendar;

    return calendar;
}

export default fetchGithubStatus;