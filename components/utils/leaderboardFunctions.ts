// Utils:

import { Analytics } from "@/actions/fetchLeaderboardData";

export function formatSinceAndUntil(since: number, until: number) {
  const sinceDate = new Date(since*1000);
  const sinceYear = sinceDate.getFullYear();
  const sinceMonth = String(sinceDate.getMonth() + 1).padStart(2, "0");
  const sinceDay = String(sinceDate.getDate()).padStart(2, "0");

  const untilDate = new Date(until*1000);
  const untilYear = untilDate.getFullYear();
  const untilMonth = String(untilDate.getMonth() + 1).padStart(2, "0");
  const untilDay = String(untilDate.getDate()).padStart(2, "0");
  
  return `From ${sinceDay}-${sinceMonth}-${sinceYear} to ${untilDay}-${untilMonth}-${untilYear}`;
};

// Insights:
function getMostCommits(members: Analytics["members"]) {
    if (members.length === 0) return null;
    return members.reduce((max, member) => member.stats.commits > max.stats.commits ? member : max);
}

function getHighDeletionsToCommitsRatio(members: Analytics["members"]) {
    if (members.length === 0) return null;
    return members.reduce((max, member) => {
        const ratio = member.stats.deletions / member.stats.commits;
        const maxRatio = max.stats.deletions / max.stats.commits;
        return ratio > maxRatio ? member : max;
    });
}

function getConsistentContributor(members: Analytics["members"]) {
    if (members.length === 0) return null;
    return members.reduce((max, member) => member.stats.commits > max.stats.commits ? member : max);
}

function getFocusedCommits(members: Analytics["members"]) {
    if (members.length === 0) return null;
    return members.reduce((min, member) => member.stats.commits < min.stats.commits ? member : min);
}

function getZeroDeletions(members: Analytics["members"]) {
    if (members.length === 0) return null;
    return members.find(member => member.stats.deletions === 0) || null;
}

function getAutomatedContributions(members: Analytics["members"]) {
    return members.find(member => member.name.includes('bot')) || null;
}

function getBalancedAdditionsDeletions(members: Analytics["members"]) {
    if (members.length === 0) return null;
    return members.reduce((max, member) => {
        const balance = Math.abs(member.stats.additions - member.stats.deletions);
        const maxBalance = Math.abs(max.stats.additions - max.stats.deletions);
        return balance < maxBalance ? member : max;
    });
}

function getFocusedSingleCommit(members: Analytics["members"]) {
    if (members.length === 0) return null;
    return members.find(member => member.stats.commits === 1) || null;
}

function getHighAdditionsToDeletionsRatio(members: Analytics["members"]) {
    if (members.length === 0) return null;
    return members.reduce((max, member) => {
        const ratio = member.stats.additions / member.stats.deletions;
        const maxRatio = max.stats.additions / max.stats.deletions;
        return ratio > maxRatio ? member : max;
    });
}

function getRegularContributor(members: Analytics["members"]) {
    if (members.length === 0) return null;
    return members.reduce((max, member) => member.stats.commits > max.stats.commits ? member : max);
}

function getInsights(members: Analytics["members"]) {
    return {
        mostCommits: getMostCommits(members),
        highDeletionsToCommitsRatio: getHighDeletionsToCommitsRatio(members),
        consistentContributor: getConsistentContributor(members),
        focusedCommits: getFocusedCommits(members),
        zeroDeletions: getZeroDeletions(members),
        automatedContributions: getAutomatedContributions(members),
        balancedAdditionsDeletions: getBalancedAdditionsDeletions(members),
        focusedSingleCommit: getFocusedSingleCommit(members),
        highAdditionsToDeletionsRatio: getHighAdditionsToDeletionsRatio(members),
        regularContributor: getRegularContributor(members),
    };
}

export function addContributorsInsightsInsights(data: Analytics) {
    const insghts = getInsights(data.members)
  const contributorsWithInsights = data.members.map(c => {
    return {
      ...c,
      insights: {
        mostCommits: insghts.mostCommits?.node_id === c.node_id,
        highDeletionsToCommitsRatio: insghts.highDeletionsToCommitsRatio?.node_id === c.node_id,
        consistentContributor: insghts.consistentContributor?.node_id === c.node_id,
        focusedCommits: insghts.focusedCommits?.node_id === c.node_id,
        zeroDeletions: insghts.zeroDeletions?.node_id === c.node_id,
        automatedContributions: insghts.automatedContributions?.node_id === c.node_id,
        balancedAdditionsDeletions: insghts.balancedAdditionsDeletions?.node_id === c.node_id,
        focusedSingleCommit: insghts.focusedSingleCommit?.node_id === c.node_id,
        highAdditionsToDeletionsRatio: insghts.highAdditionsToDeletionsRatio?.node_id === c.node_id,
        regularContributor: insghts.regularContributor?.node_id === c.node_id
      }
    }
  });
  contributorsWithInsights.sort((a, b) => b.stats.commits - a.stats.commits);
  return {...data, members: contributorsWithInsights};
}

export type ContributorsInsights = ReturnType<typeof addContributorsInsightsInsights>;

export function mapMembers(data: ContributorsInsights["members"][number]) {
    return {
      ...data,
      projects_name_urls: data.projects_names.map(
        p => `https://github.com/${p.url}`
      ),
      loginUrl: `https://github.com/${data.name}`,
    };
  }
