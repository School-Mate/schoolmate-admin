import fetcher from "@/lib/fetcher";
import { ssrResponseWrapper } from "@/lib/utils";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { Article, Board, User } from "schoolmate-types";
import dayjs from "dayjs";

const fetchArticle = async (boardId: string, aritcleId: string) => {
  const Authorization = cookies().get("Authorization");
  if (!Authorization?.value)
    return ssrResponseWrapper({
      message: "로그인이 필요합니다.",
      status: 401,
    });

  try {
    const { data: article } = await fetcher(
      `/admin/board/${boardId}/article/${aritcleId}`,
      {
        headers: {
          Authorization: `Bearer ${Authorization.value}`,
        },
      }
    );

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

const ArticleDetailPage = async ({
  params,
}: {
  params: {
    boardId: string;
    articleId: string;
  };
}) => {
  const article = (await fetchArticle(params.boardId, params.articleId)) as {
    data: Article & {
      board: Board;
      user: User;
    };
    message?: string;
    status?: number;
  };

  if (article.status === 401)
    throw new Error(article.message || "로그인이 필요합니다.");
  if (article.status === 404)
    throw new Error(article.message || "게시글을 찾을 수 없습니다.");

  if (article.status !== 200)
    throw new Error("알 수 없는 오류가 발생했습니다.");

  return (
    <>
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-bold">게시글</h1>
        <div className="flex flex-col mt-4">
          <div className="flex flex-row">
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">작성자</span>
              <span className="text-lg font-bold">
                {article.data.user.name}
              </span>
            </div>
            <div className="flex flex-col ml-5">
              <span className="text-sm text-gray-400">작성일</span>
              <span className="text-lg font-bold">
                {dayjs(article.data.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </span>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <span className="text-sm text-gray-400">제목</span>
            <span className="text-lg font-bold">{article.data.title}</span>
          </div>
          <div className="flex flex-col mt-4">
            <span className="text-sm text-gray-400">내용</span>
            <span className="text-lg font-bold">{article.data.content}</span>
          </div>
          {article.data.images.length > 0 && (
            <div className="flex flex-col mt-4">
              <span className="text-sm text-gray-400">이미지</span>
              <div className="flex flex-row">
                {article.data.images.map((image, key) => (
                  //   eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={key}
                    alt="이미지"
                    src={image}
                    className="w-24 h-24 object-cover"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArticleDetailPage;
