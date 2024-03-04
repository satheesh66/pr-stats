import React from "react";

import {
	getAuthorPrInfoApi,
	getReviewedPrsListApi,
} from "@/app/pr-stats/route";
import { Card } from "@tremor/react";
import { ChartComponent } from "@/app/pr-stats/(components)/chart";
import { getFormattedDate } from "@/app/pr-stats/util";
import { ReviewTimeChartWrapper } from "../reviewtimechartwrapper";
import { ReviewedPrsList } from "@/app/pr-stats/(components)/";

export default async function AuthorInfo({ params }) {
	console.log(params, "params me");
	const authorInfo = await getAuthorPrInfoApi(params.id);
	const reviewedPrsList = await getReviewedPrsListApi(params.id);

	console.log(reviewedPrsList, "reviewedPrsList*****");

	const { reviews: reviewers } = authorInfo;

	const commentsCountFormattedData = reviewers.map(
		function formatteDataForClientSide(prInfo) {
			return {
				...prInfo,
				submittedAt: getFormattedDate(prInfo.submittedAt),
			};
		}
	);

	return (
		<div className="p-4 flex flex-col gap-y-4 overflow-scroll">
			<Card className="rounded">
				<div className="border-b-2">Comments count</div>
				<ChartComponent
					data={commentsCountFormattedData}
					index={"submittedAt"}
					categories={["commentsCount"]}
					colors={["cyan"]}
				/>
			</Card>
			<ReviewTimeChartWrapper reviewers={reviewers} />
			<ReviewedPrsList reviewers={reviewers} />
		</div>
	);
}
