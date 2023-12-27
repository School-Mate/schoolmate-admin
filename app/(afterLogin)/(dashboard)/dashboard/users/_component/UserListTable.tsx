import dayjs from "dayjs";
import Link from "next/link";
import { School, User, UserSchool } from "schoolmate-types";

const UserListTable = ({
  users,
}: {
  users: Array<
    User & {
      userSchool: UserSchool & {
        school: School;
      };
      _count: {
        article: number;
        comment: number;
        reComment: number;
      };
    }
  >;
}) => {
  return (
    <>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                유저이름 (학교명)
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                가입 일자
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                학년
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                전화번호
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                이메일
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                상세정보
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length !== 0 &&
              users.map((user, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {user.name}
                    </h5>
                    <p className="text-sm">
                      {user.userSchool ? (
                        <>
                          {user.userSchool.school.defaultName}{" "}
                          {user.userSchool.school.name &&
                            `(${user.userSchool.school.name})`}
                        </>
                      ) : (
                        "학교 없음"
                      )}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {dayjs(user.createdAt).format("YYYY년 MM월 DD일 HH:mm")}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {user.userSchool
                      ? `${user.userSchool.grade}학년 ${
                          user.userSchool.class
                        }반 ${user.userSchool.dept ? user.userSchool.dept : ""}`
                      : "학교 없음"}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {user.phone
                      ?.replace(/[^0-9]/g, "")
                      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
                      .replace(/(-{1,2})$/g, "")}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {user.email}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <Link
                      href={`/dashboard/users/${user.id}`}
                      className="flex flex-row items-center"
                    >
                      <i className="text-sm text-gray-4 fas fa-external-link-alt" />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserListTable;
