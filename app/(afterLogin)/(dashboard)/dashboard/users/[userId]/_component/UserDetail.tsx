import { numberWithCommas } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import { School, User, UserBlock, UserSchool } from "schoolmate-types";

const UserDetail = ({
  userData,
}: {
  userData: User & {
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
}) => {
  return (
    <>
      <div className="flex flex-col items-start pb-5">
        <div className="flex flex-row items-center justify-center gap-3">
          <div className="w-20 h-20 relative">
            <Image
              src={
                userData.profile
                  ? process.env.NEXT_PUBLIC_S3_URL + userData.profile
                  : "/images/logo/logo.svg"
              }
              alt="프로필 이미지"
              className="rounded-full"
              layout="fill"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-2xl font-bold text-black dark:text-white">
              {userData.name}
            </span>
            <span className="text-sm text-black dark:text-white">
              {userData.userSchool ? (
                <>
                  {userData.userSchool.school.defaultName}{" "}
                  {userData.userSchool.school.name && (
                    <>({userData.userSchool.school.name})</>
                  )}{" "}
                  {userData.userSchool.grade}
                  학년 {userData.userSchool.class}반{" "}
                  {userData.userSchool.dept
                    ? `(${userData.userSchool.dept})`
                    : ""}
                </>
              ) : (
                <>학교 미등록 유저</>
              )}
            </span>
            <span className="text-sm text-black dark:text-white">
              {dayjs(userData.createdAt).format("YYYY년 MM월 DD일")}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-5 mt-3 mb-5">
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-black dark:text-white">
              {numberWithCommas(userData._count.article)}
            </span>
            <span className="text-sm text-black dark:text-white">게시글</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-black dark:text-white">
              {numberWithCommas(
                userData._count.comment + userData._count.reComment
              )}
            </span>
            <span className="text-sm text-black dark:text-white">댓글</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-black dark:text-white">
              {numberWithCommas(userData._count.asked)}
            </span>
            <span className="text-sm text-black dark:text-white">질문</span>
          </div>
        </div>
        <div className="w-full">
          <span className="text-xl font-bold text-black dark:text-white">
            유저 기본정보
          </span>
          <div className="flex flex-col items-start">
            <div className="flex flex-row items-center justify-between w-full">
              <span className="font-bold text-black dark:text-white">
                유저 이름
              </span>
              <span className=" text-black dark:text-white">
                {userData.name}
              </span>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <span className="font-bold text-black dark:text-white">
                이메일
              </span>
              <span className=" text-black dark:text-white">
                {userData.email}
              </span>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <span className=" font-bold text-black dark:text-white">
                전화번호
              </span>
              <span className=" text-black dark:text-white">
                {userData.phone}
              </span>
            </div>
          </div>
          <div className="w-full mt-5">
            <span className="text-xl font-bold text-black dark:text-white">
              제재 내역
            </span>
            <div className="flex flex-col">
              {userData.userBlock.length !== 0 ? (
                userData.userBlock.map((block, key) => (
                  <div
                    className="flex flex-row items-center justify-between w-full"
                    key={key}
                  >
                    <span className="font-bold text-black dark:text-white">
                      {block.reason}
                    </span>
                    <span className=" text-black dark:text-white">
                      {dayjs(block.startDate).format("YYYY년 MM월 DD일")} ~{" "}
                      {dayjs(block.endDate).format("YYYY년 MM월 DD일")}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-black dark:text-white">
                  제재 내역이 없습니다.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
