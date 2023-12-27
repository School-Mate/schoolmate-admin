"use client";

import Loader from "@/components/common/Loader";
import { swrFetcher } from "@/lib/fetcher";
import { numberWithCommas } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  AskedUser,
  School,
  User,
  UserBlock,
  UserSchool,
} from "schoolmate-types";
import useSWR from "swr";
import UserDetail from "./_component/UserDetail";

const UserDetailPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: userData, isLoading } = useSWR<
    User & {
      userSchool: UserSchool & { school: School };
      askedUser: AskedUser;
      _count: {
        article: number;
        comment: number;
        reComment: number;
        commentLike: number;
        reCommentLike: number;
        articleLike: number;
        asked: number;
      };
      userBlock: UserBlock[];
    }
  >(`/admin/users/${userId}`, swrFetcher);

  if (isLoading || !userData) return <Loader />;

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <UserDetail userData={userData} />
      </div>
    </>
  );
};

export default UserDetailPage;
