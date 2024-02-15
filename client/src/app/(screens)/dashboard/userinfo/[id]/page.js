import { Card, Title, LineChart } from "@tremor/react";

async function getUserData(id) {
  console.log(id, "params api test");
  const res = await fetch(
    `https://pr-stats.deveditor.workers.dev/pr-stats/api/author/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch reviewerInfo");
  }

  return res.json();
}

export default async function User({ params }) {
  const reviewerInfo = await getUserData(params.id);

  function getFormattedDate(originalData) {
    const date = new Date(originalData);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  }

  const sumOfCommentsCount = reviewerInfo.reviews.reduce(
    (accumulator, { commentsCount }) => {
      return accumulator + commentsCount;
    },
    0
  );

  const sumOfReviewTime = reviewerInfo.reviews.reduce(
    (accumulator, { reviewTime }) => {
      return accumulator + reviewTime;
    },
    0
  );

  const formattedData = reviewerInfo.reviews.map(
    function formatteDataForClientSide(prInfo) {
      return {
        ...prInfo,
        submittedAt: getFormattedDate(prInfo.submittedAt),
      };
    }
  );

  return (
    <div className="h-auto overflow-y-auto grid auto-rows-max p-4 gap-4 w-full">
      <div className="flex gap-4">
        <Card>
          <div></div>
          <Title>Comments count</Title>
          <div className="font-bold	text-lg text-cyan-600	">
            {sumOfCommentsCount}
          </div>
        </Card>
        <Card>
          <div></div>
          <Title>Review time</Title>
          <div className="font-bold	text-lg text-lime-600	">
            {sumOfReviewTime}
          </div>
        </Card>
      </div>
      <Card>
        <Title>Reviewer chart</Title>
        <LineChart
          className="mt-6"
          data={formattedData}
          index="submittedAt"
          categories={["reviewTime", "commentsCount"]}
          colors={["lime", "cyan"]}
          // valueFormatter={axisFormatter}
        />
      </Card>
      <Card>
        <Title>Pending pr's</Title>
        {reviewerInfo.reviews.map(({ pullRequestId }) => (
          <li key={pullRequestId}>pr id: {pullRequestId}</li>
        ))}
      </Card>
    </div>
  );
}