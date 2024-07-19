'use server';



  // const LEADERBOARD_ROUTE =
    // 'https://baas-data-provider.onrender.com/leaderboard';
  const LEADERBOARD_ROUTE_LOCAL = 'http://localhost:8080/leaderboard'; // If you want to use local server use

export type Analytics = {
  members: {
    name: string;
    node_id: string;
    projects_names: {
      url: string;
      name: string;
    }[];
    avatar_url: string;
    score: number;
    stats: {
      additions: number;
      deletions: number;
      commits: number;
    };
  }[];
  since: number;
  until: number;
  stat: 'allTimes' | 'lastMonth' | 'lastWeek';
};



async function fetchLeaderboard() {
  const response = await fetch(LEADERBOARD_ROUTE_LOCAL)

  // fetch from endpoint POST with page, limit, filter as ILeaderboardResponse
  const data = await response.json() as unknown as [Analytics, Analytics, Analytics];

  return data;
}

export default fetchLeaderboard;



