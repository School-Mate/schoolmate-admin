"use client";

import Loader from "@/components/common/Loader";
import { swrFetcher } from "@/lib/fetcher";
import { BoardRequest, User } from "schoolmate-types";
import useSWR from "swr";
import BoardRequestListTable from "./BoardReqeustListTable";

const BoardRequestPage = () => {
  const { data: boardRequestdatas, isLoading } = useSWR<
    Array<BoardRequest & { user: User }>
  >(`/admin/boardrequest?process=pending`, swrFetcher);

  if (isLoading || !boardRequestdatas) return <Loader />;

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <BoardRequestListTable boards={boardRequestdatas} />
      </div>
    </>
  );
};

export default BoardRequestPage;
