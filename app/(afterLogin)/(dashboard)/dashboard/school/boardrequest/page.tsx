"use client";

import Loader, { SmallLoader } from "@/components/common/Loader";
import { swrFetcher } from "@/lib/fetcher";
import { BoardRequest, User } from "schoolmate-types";
import useSWR from "swr";
import BoardRequestListTable from "./_component/BoardReqeustListTable";
import { useState } from "react";

const BoardRequestPage = () => {
  const [page, setPage] = useState(1);
  const { data: boardRequestdatas, isLoading } = useSWR<{
    contents: Array<BoardRequest & { user: User }>;
    totalPage: number;
  }>(`/admin/boardrequest?page=${page}`, swrFetcher);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {isLoading || !boardRequestdatas ? (
          <SmallLoader />
        ) : (
          <>
            <BoardRequestListTable boards={boardRequestdatas.contents} />
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
                  {page}/{boardRequestdatas.totalPage}
                </span>

                <button
                  className="w-8 h-8 rounded-full border border-stroke dark:border-strokedark text-black dark:text-white items-center flex justify-center"
                  onClick={() => setPage(page + 1)}
                  disabled={boardRequestdatas.totalPage == page}
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

export default BoardRequestPage;
