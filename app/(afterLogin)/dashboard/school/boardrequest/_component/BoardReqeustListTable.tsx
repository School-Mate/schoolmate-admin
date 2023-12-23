"use client";

import Modal from "@/components/Modal";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import fetcher from "@/lib/fetcher";
import { numberWithCommas } from "@/lib/utils";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import { BoardRequest, Process, School, User } from "schoolmate-types";

const BoardRequestListTable = ({
  boards,
}: {
  boards: Array<BoardRequest & { user: User }>;
}) => {
  const [modal, setModal] = useState(false);
  const [selectRequestId, setSelectRequestId] = useState<string>("");
  const [denyReason, setDenyReason] = useState("");
  const handleBoardDeny = async () => {
    if (!denyReason) return alert("거절 사유를 입력해주세요.");
    if (!selectRequestId) return alert("학교를 선택해주세요.");

    try {
      await fetcher.post(`/admin/boardrequest`, {
        message: denyReason,
        requestId: selectRequestId,
        process: "denied",
      });

      alert("게시판 생성 요청이 거절되었습니다.");

      setModal(false);
      setSelectRequestId("");
      setDenyReason("");
    } catch (e: any | AxiosError) {
      if (e instanceof AxiosError) {
        alert(e.response?.data.message);
      } else {
        alert(e.message);
      }
    }
  };

  const handleBoardAccept = async () => {
    if (!selectRequestId) return alert("요청 ID를 선택해주세요.");

    try {
      await fetcher.post(`/admin/boardrequest`, {
        requestId: selectRequestId,
        process: "success",
      });

      alert("게시판 생성 요청이 승인되었습니다.");

      setModal(false);
      setSelectRequestId("");
    } catch (e: any | AxiosError) {
      if (e instanceof AxiosError) {
        alert(e.response?.data.message);
      } else {
        alert(e.message);
      }
    }
  };

  const handleCloseModal = () => {
    setModal(false);
    setSelectRequestId("");
    setDenyReason("");
  };

  return (
    <>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                게시판명 (학교명)
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                사용 목적
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                상태
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                요청 유저
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                상태관리
              </th>
            </tr>
          </thead>
          <tbody>
            {boards.map((board, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {board.name}
                  </h5>
                  <p className="text-sm">{board.schoolName}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {board.description}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      board.process === "pending"
                        ? "text-warning bg-warning"
                        : board.process === "denied"
                        ? "text-danger bg-danger"
                        : "text-success bg-success"
                    }`}
                  >
                    {board.process === "pending"
                      ? "승인 대기"
                      : board.process === "denied"
                      ? "거절됨"
                      : "승인됨"}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <Link
                    href={`/dashboard/users/${board.user.id}`}
                    className="flex flex-row items-center"
                  >
                    <p className="text-black dark:text-white mr-2">
                      {board.user.name}
                    </p>
                    <i className="text-sm text-gray-4 fas fa-external-link-alt" />
                  </Link>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    {board.process === "pending" ? (
                      <>
                        <button
                          className="hover:text-primary"
                          onClick={() => {
                            setModal(true);
                            setSelectRequestId(board.id);
                          }}
                        >
                          <i className="text-base text-gray-4 fas fa-times" />
                        </button>
                        <button
                          className="hover:text-primary"
                          onClick={() => {
                            setSelectRequestId(board.id);
                            handleBoardAccept();
                          }}
                        >
                          <i className="text-base text-gray-4 fas fa-check" />
                        </button>
                      </>
                    ) : (
                      <>
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium text-success bg-success`}
                        >
                          처리 완료
                        </p>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal callbackClose={handleCloseModal}>
          <div className="w-full p-10">
            <span>
              <h3 className="text-2xl font-bold text-black dark:text-white">
                게시판 생성 요청 거절
              </h3>
              <p className="text-sm text-black dark:text-gray-4">
                게시판 생성 요청을 거절합니다.
              </p>
            </span>
            <input
              type="text"
              onChange={e => {
                setDenyReason(e.target.value);
              }}
              placeholder="거절 사유를 입력해주세요."
              className="w-full mt-2 rounded-lg border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />

            <div className="flex flex-row w-full items-end justify-end">
              <button
                onClick={handleBoardDeny}
                className="w-24 mt-5 py-2 rounded-lg border border-primary bg-primary hover:bg-primarydark text-white font-bold duration-300 ease-in-out"
              >
                거절하기
              </button>
              <button
                onClick={() => {
                  setModal(false);
                }}
                className="w-24 mt-5 ml-2 py-2 rounded-lg border border-primary bg-white hover:bg-gray-2 text-primary font-bold duration-300 ease-in-out"
              >
                취소하기
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default BoardRequestListTable;
