"use client"
import fetchLeaderboard, { Analytics } from '@/actions/fetchLeaderboardData';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ContributorsInsights, addContributorsInsightsInsights, formatSinceAndUntil, mapMembers } from '../utils/leaderboardFunctions';

const LeaderboardPage: React.FC = () => {
  const [data, setData] = useState<[Analytics, Analytics, Analytics]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard().then((data) => {
      console.log(data);
      setData(data);
      setLoading(false);
    }).catch((e) => {
      console.error(e);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  const contributors = addContributorsInsightsInsights(data[0]);
  const contributors2 = addContributorsInsightsInsights(data[1]);
  const contributors3 = addContributorsInsightsInsights(data[2]);
  return (
    <>
      <ContributionsList data={contributors3} key={`contributors3`} />
      <ContributionsList data={contributors2} key={`contributors2`} />
      <ContributionsList data={contributors} key={`contributors`} />
    </>
  )
};

interface PersonPlace {
  data: ContributorsInsights['members'][number] & {
    loginUrl: string;
    projects_name_urls: string[];
  };
  place: number;
}

export const ContributionsList: React.FC<{ data: ContributorsInsights }> = ({ data }) => {
  //filter out members with name [bot] in it
  const mappedData = data.members.map(mapMembers).filter(p => !p.name.includes('[bot]'));

  return (
    <div className="font-inter container mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Our Contributions In Maakaf</h3>
      <p className="text-gray-400 mb-4">{formatSinceAndUntil(data.since, data.until)}</p>
      <ul className="grid gap-3">
        <li><h4>{data.stat === "allTimes" ? "All Times" : data.stat === "lastMonth" ? "Last Month" : "Last Week"}</h4></li>
        {mappedData.filter(p => p.score).map((data, ind) => (
          <li key={data.node_id}>
            <DisplayPerson2 data={data} place={ind + 1} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export const DisplayPerson2: React.FC<PersonPlace> = ({ data, place }) => {
  const insights = Object.entries(data.insights)
    .filter(([key, value]) => value)
    .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center px-6 py-4 bg-gray-900">
        <Image className="h-12 w-12 rounded-full object-cover" src={data.avatar_url} alt="avatar" width={48} height={48} />
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-white">{data.name}</h2>
          <p className="text-gray-400">{data.projects_names.map(p => p.name).join(', ')}</p>
        </div>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">
          <strong>Contribution percentage:</strong> {data.score}
        </p>
        <div className="mt-4">
          <h3 className="text-gray-900 text-lg font-semibold">Contributions</h3>
          <ul className="mt-2 text-gray-700">
            <li><strong>Additions:</strong> {data.stats.additions.toLocaleString()}</li>
            <li><strong>Deletions:</strong> {data.stats.deletions.toLocaleString()}</li>
            <li><strong>Commits:</strong> {data.stats.commits.toLocaleString()}</li>
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-gray-900 text-lg font-semibold">Insightful Contributions</h3>
          <ul className="mt-2 text-gray-700">
            {insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-gray-900 text-lg font-semibold">Projects Contributions</h3>
          <ul className="mt-2 text-gray-700">
            {data.projects_names.map((project, index) => (
              <li key={index}>{project.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;