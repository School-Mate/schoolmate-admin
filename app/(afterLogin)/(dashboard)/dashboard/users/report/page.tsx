"use client";

import { SmallLoader } from "@/components/common/Loader";
import { swrFetcher } from "@/lib/fetcher";
import { useState } from "react";
import { Report } from "schoolmate-types";
import useSWR from "swr";
import ReportListTable from "./_component/ReportListTable";
import { ReportWithTarget } from "@/types/report";

const UserReportPage = () => {
  const [page, setPage] = useState(1);
  const {
    data: reportDatas,
    isLoading,
    mutate,
  } = useSWR<{
    contents: Array<ReportWithTarget>;
    totalPage: number;
  }>(`/admin/report?process=pending&page=${page}`, swrFetcher);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {isLoading || !reportDatas ? (
          <SmallLoader />
        ) : (
          <>
            <ReportListTable
              reports={reportDatas.contents}
              updateReport={mutate}
            />
            <div className="flex justify-center mt-8 mb-4">
              <div className="flex items-center justify-center gap-1">
                <button
                  className="w-8 h-8 rounded-full border border-stroke dark:border-strokedark text-black dark:text-white items-center flex justify-center"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  <i className="fas fa-chevron-left text-sm" />
                </button>

                <span className="text-black dark:text-white mx-5">
                  {page}/{reportDatas.totalPage}
                </span>

                <button
                  className="w-8 h-8 rounded-full border border-stroke dark:border-strokedark text-black dark:text-white items-center flex justify-center"
                  onClick={() => setPage(page + 1)}
                  disabled={reportDatas.totalPage == page}
                >
                  <i className="fas fa-chevron-right mx-auto text-sm" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserReportPage;
