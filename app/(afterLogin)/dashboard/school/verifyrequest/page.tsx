"use client";

import Loader, { SmallLoader } from "@/components/common/Loader";
import { swrFetcher } from "@/lib/fetcher";
import { BoardRequest, Image, User, UserSchoolVerify } from "schoolmate-types";
import useSWR from "swr";
import VerifyReqeustListTable from "./_component/VerifyReqeustListTable";
import { useState } from "react";

const VerfiyRequestPage = () => {
  const [page, setPage] = useState(1);
  const {
    data: verfiyRequestdatas,
    isLoading,
    mutate,
  } = useSWR<{
    contents: Array<UserSchoolVerify & { user: User; image: Image }>;
    totalPage: number;
  }>(`/admin/verify?page=${page}`, swrFetcher);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {isLoading || !verfiyRequestdatas ? (
          <SmallLoader />
        ) : (
          <>
            <VerifyReqeustListTable
              verifys={verfiyRequestdatas.contents}
              callbackReload={mutate}
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
                  {page}/{verfiyRequestdatas.totalPage}
                </span>

                <button
                  className="w-8 h-8 rounded-full border border-stroke dark:border-strokedark text-black dark:text-white items-center flex justify-center"
                  onClick={() => setPage(page + 1)}
                  disabled={verfiyRequestdatas.totalPage == page}
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

export default VerfiyRequestPage;
