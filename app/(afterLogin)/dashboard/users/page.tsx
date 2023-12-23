"use client";

import Loader, { SmallLoader } from "@/components/common/Loader";
import { swrFetcher } from "@/lib/fetcher";
import { BoardRequest, User } from "schoolmate-types";
import useSWR from "swr";
import UserListTable from "./_component/UserListTable";
import { useState } from "react";

const UserListPage = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const { data: userDatas, isLoading } = useSWR<{
    contents: Array<any>;
    totalPage: number;
  }>(`/admin/users?page=${page}&keyword=${keyword}`, swrFetcher);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-row items-center mb-2 w-full justify-end">
          <span className="font-bold w-10 text-black dark:text-white">
            검색
          </span>
          <input
            type="text"
            onChange={e => setKeyword(e.target.value)}
            placeholder="이름, 전화번호, 이메일, 학교명을 입력하세요."
            className="w-42 h-10 border border-stroke dark:border-strokedark rounded-md px-4 text-black dark:text-white"
          />
        </div>
        {isLoading || !userDatas ? (
          <SmallLoader />
        ) : (
          <>
            <UserListTable users={userDatas.contents} />
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
                  {page}/{userDatas.totalPage}
                </span>

                <button
                  className="w-8 h-8 rounded-full border border-stroke dark:border-strokedark text-black dark:text-white items-center flex justify-center"
                  onClick={() => setPage(page + 1)}
                  disabled={userDatas.totalPage == page}
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

export default UserListPage;
