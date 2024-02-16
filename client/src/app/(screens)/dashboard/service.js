import { PR_STATS_DOMAIN_URL, GITHUB_ACTION_DOMAIN_URL } from "@/app/constant";

//Common Repo info dashboard
export async function getContributors(id) {
	console.log(id, "params api test");
	const res = await fetch(`${GITHUB_ACTION_DOMAIN_URL}/contributors`);

	if (!res.ok) {
		throw new Error("Failed to fetch reviewerInfo");
	}

	return res.json();
}

export async function pullRequestList() {
	const res = await fetch(`${GITHUB_ACTION_DOMAIN_URL}/pulls`);

	if (!res.ok) {
		throw new Error("Failed to fetch reviewerInfo");
	}

	return res.json();
}

export async function getCommentsCount() {
	const res = await fetch(`${PR_STATS_DOMAIN_URL}/pr-stats/api/commentsCount`);

	if (!res.ok) {
		throw new Error("Failed to fetch reviewerInfo");
	}

	return res.json();
}

// Author info dashboard
export async function getAuthorInfo(id) {
	const res = await fetch(`${PR_STATS_DOMAIN_URL}/pr-stats/api/author/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch reviewerInfo");
	}

	return res.json();
}