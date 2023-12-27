"use client";
import React from "react";
import CardDataStats from "../CardDataStats";

import useSWR from "swr";
import { swrFetcher } from "@/lib/fetcher";
import Loader from "../common/Loader";
import { numberWithCommas } from "@/lib/utils";

type AnalyticsLast2Week = {
  total_count: number;
  current_week_count: number;
  previous_week_count: number;
  growth_rate: string;
};

type AnalyticsTotal = {
  user: {
    last2week: AnalyticsLast2Week;
    total: number;
  };
  article: {
    last2week: AnalyticsLast2Week;
    total: number;
  };
  asked: {
    last2week: AnalyticsLast2Week;
    total: number;
  };
};

const Analytics: React.FC = () => {
  const { data, isLoading, error } = useSWR<AnalyticsTotal>(
    "/admin/analytics",
    swrFetcher
  );

  if (!data) return <Loader />;

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <CardDataStats
          isLoading={isLoading}
          title="유저 수"
          total={numberWithCommas(data.user.total) + "명"}
          rate={Number(data.user.last2week.growth_rate).toFixed(2) + "%"}
          levelUp={Number(data.user.last2week.growth_rate) > 0}
          levelDown={Number(data.user.last2week.growth_rate) < 0}
        >
          <i className="fas fa-users" />
        </CardDataStats>
        <CardDataStats
          isLoading={isLoading}
          title="에스크 질문 수"
          total={numberWithCommas(data.asked.total) + "개"}
          rate={Number(data.asked.last2week.growth_rate).toFixed(2) + "%"}
          levelUp={Number(data.asked.last2week.growth_rate) > 0}
          levelDown={Number(data.asked.last2week.growth_rate) < 0}
        >
          <i className="fas fa-question" />
        </CardDataStats>
        <CardDataStats
          isLoading={isLoading}
          title="게시글 수"
          total={numberWithCommas(data.article.total) + "개"}
          rate={Number(data.article.last2week.growth_rate).toFixed(2) + "%"}
          levelUp={Number(data.article.last2week.growth_rate) > 0}
          levelDown={Number(data.article.last2week.growth_rate) < 0}
        >
          <i className="fas fa-newspaper" />
        </CardDataStats>
      </div>
    </>
  );
};

export default Analytics;
