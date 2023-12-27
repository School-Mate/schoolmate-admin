import { School, User, UserBlock, UserSchool } from "schoolmate-types";
import UserDetail from "../../(dashboard)/dashboard/users/[userId]/_component/UserDetail";
import { cookies } from "next/headers";
import { ssrResponseWrapper } from "@/lib/utils";
import fetcher from "@/lib/fetcher";
import { AxiosError } from "axios";

const fetchUser = async (userId: string) => {
  const Authorization = cookies().get("Authorization");
  if (!Authorization?.value)
    return ssrResponseWrapper({
      message: "로그인이 필요합니다.",
      status: 401,
    });

  try {
    const { data: article } = await fetcher(`/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${Authorization.value}`,
      },
    });

    return ssrResponseWrapper({}, article.data);
  } catch (e: any | AxiosError) {
    if (e instanceof AxiosError) {
      return ssrResponseWrapper({
        message: e.response?.data.message,
        status: e.response?.status,
      });
    } else {
      return ssrResponseWrapper({ message: e.message, status: 500 });
    }
  }
};

const UserDetailPage = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  const userData = (await fetchUser(params.userId)) as {
    data: User & {
      userSchool: UserSchool & { school: School };
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
    };
    message?: string;
    status?: number;
  };

  if (userData.status === 401)
    throw new Error(userData.message || "로그인이 필요합니다.");
  if (userData.status === 404)
    throw new Error(userData.message || "유저를 찾을 수 없습니다.");

  if (userData.status !== 200)
    throw new Error("알 수 없는 오류가 발생했습니다.");

  return (
    <>
      <div className="p-5">
        <UserDetail userData={userData.data} />
      </div>
    </>
  );
};

export default UserDetailPage;
