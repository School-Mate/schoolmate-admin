"use client";

import Modal from "@/components/Modal";
import fetcher from "@/lib/fetcher";
import {
  ReportWithTarget,
  reportStatusMap,
  reportTypeMap,
} from "@/types/report";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const ReportListTable = ({
  reports,
  updateReport,
}: {
  reports: Array<ReportWithTarget>;
  updateReport: () => void;
}) => {
  return (
    <>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                신고자
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                신고자
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                대상
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                사유
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                대상 유저
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                처리상태
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                상태관리
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.length !== 0 &&
              reports.map((report, key) => (
                <ReportItem
                  key={key}
                  report={report}
                  updateReport={updateReport}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const ReportItem = ({
  report,
  updateReport,
}: {
  report: ReportWithTarget;
  updateReport: () => void;
}) => {
  const [blockModal, setBlockModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [reason, setReason] = useState("");
  const [blockPeriod, setBlockPeriod] = useState(1);

  const handleReportComplete = async () => {
    if (!confirm("신고를 처리하시겠습니까?")) return;

    setLoadingRequest(true);

    try {
      await fetcher.post(`/admin/report/${report.id}`, {
        reason: reason,
      });

      alert("신고가 처리되었습니다.");
      updateReport();
      setLoadingRequest(false);
      setModal(false);
    } catch (e: any | AxiosError) {
      setLoadingRequest(false);

      if (e instanceof AxiosError) {
        alert(e.response?.data.message);
      } else {
        alert(e.message);
      }
    }
  };

  const handleReport = async () => {
    if (!confirm("신고를 처리하시겠습니까?")) return;

    setLoadingRequest(true);

    try {
      await fetcher.post(`/admin/report/${report.id}`, {
        reason: reason,
        blockPeriod: blockPeriod,
      });

      alert("신고가 처리되었습니다.");
      updateReport();
      setBlockModal(false);
      setLoadingRequest(false);
    } catch (e: any | AxiosError) {
      setLoadingRequest(false);

      if (e instanceof AxiosError) {
        alert(e.response?.data.message);
      } else {
        alert(e.message);
      }
    }
  };

  return (
    <>
      <tr>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          {dayjs(report.createdAt).format("YYYY년 MM월 DD일 HH:mm")}
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          {report.reportUser ? (
            <>
              {report.reportUser.name}
              <button
                onClick={() => {
                  window.open(
                    `/user/${report.reportUser.id}`,
                    "popup",
                    "width=600,height=600"
                  );
                }}
              >
                <i className="fas fa-external-link-alt ml-2 text-sm cursor-pointer" />
              </button>
            </>
          ) : (
            "탈퇴한 유저입니다."
          )}
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          {report.target ? (
            <>
              {reportTypeMap[report.targetType]}
              <button
                onClick={() => {
                  window.open(
                    report.targetType === "article"
                      ? `/board/${report.target.boardId}/article/${report.target.id}`
                      : report.targetType === "comment"
                      ? `/board/${report.target.boardId}/article/${report.target.articleId}/comment/${report.target.id}`
                      : report.targetType === "recomment"
                      ? `/board/${report.target.boardId}/article/${report.target.articleId}/comment/${report.target.commentId}/recomment/${report.target.id}`
                      : "",
                    "popup",
                    "width=600,height=600"
                  );
                }}
              >
                <i className="fas fa-external-link-alt ml-2 text-sm cursor-pointer" />
              </button>
            </>
          ) : (
            <>
              삭제된{" "}
              {report.targetType === "article"
                ? "게시글"
                : report.targetType === "comment"
                ? "댓글"
                : report.targetType === "recomment"
                ? "대댓글"
                : ""}
            </>
          )}
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          {report.message}
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          {report.targetUser ? (
            <>
              {report.targetUser.name}
              <button
                onClick={() => {
                  window.open(
                    `/user/${report.targetUser.id}`,
                    "popup",
                    "width=600,height=600"
                  );
                }}
              >
                <i className="fas fa-external-link-alt ml-2 text-sm cursor-pointer" />
              </button>
            </>
          ) : (
            "탈퇴한 유저입니다."
          )}
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <p
            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
              report.process === "pending"
                ? "text-warning bg-warning"
                : "text-success bg-success"
            }`}
          >
            {reportStatusMap[report.process]}
          </p>
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <div className="flex items-center space-x-3.5">
            {report.process === "pending" ? (
              <>
                {loadingRequest ? (
                  <button className="hover:text-primary" disabled>
                    <i className="fas fa-spinner fa-spin" />
                  </button>
                ) : (
                  <>
                    <button
                      className="hover:text-primary"
                      onClick={() => {
                        setModal(true);
                      }}
                    >
                      <i className="text-base text-gray-4 fas fa-times" />
                    </button>
                    <button
                      className="hover:text-primary"
                      onClick={() => {
                        setBlockModal(true);
                      }}
                    >
                      <i className="text-base text-gray-4 fas fa-check" />
                    </button>
                  </>
                )}
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

      {blockModal && (
        <Modal
          callbackClose={() => {
            setBlockModal(false);
          }}
        >
          <div className="w-full p-10">
            <span>
              <h3 className="text-2xl font-bold text-black dark:text-white">
                신고 처리
              </h3>
              <p className="text-sm text-black dark:text-gray-4">
                신고 처리를 진행합니다.
              </p>
            </span>
            <input
              type="text"
              onChange={e => {
                setReason(e.target.value);
              }}
              placeholder="정지 사유를 입력해주세요."
              className="w-full mt-2 rounded-lg border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />

            <span>
              <h3 className="text-2xl font-bold text-black dark:text-white mt-2">
                정지 기간
              </h3>
              <p className="text-sm text-black dark:text-gray-4">
                정지 기간을 설정합니다.
              </p>
            </span>
            <select
              className="w-full mt-2 rounded-lg border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              onChange={e => {
                setBlockPeriod(Number(e.target.value));
              }}
            >
              <option value={1}>1일</option>
              <option value={3}>3일</option>
              <option value={7}>7일</option>
              <option value={30}>30일</option>
            </select>

            <div className="flex flex-row w-full items-end justify-end">
              <button
                onClick={handleReport}
                className="w-24 mt-5 py-2 rounded-lg border border-primary bg-primary hover:bg-primarydark text-white font-bold duration-300 ease-in-out"
                disabled={loadingRequest}
              >
                {loadingRequest ? (
                  <i className="fas fa-spinner fa-spin" />
                ) : (
                  "처리하기"
                )}
              </button>
              <button
                onClick={() => {
                  setBlockModal(false);
                }}
                className="w-24 mt-5 ml-2 py-2 rounded-lg border border-primary bg-white hover:bg-gray-2 text-primary font-bold duration-300 ease-in-out"
              >
                취소하기
              </button>
            </div>
          </div>
        </Modal>
      )}

      {modal && (
        <Modal
          callbackClose={() => {
            setModal(false);
          }}
        >
          <div className="w-full p-10">
            <span>
              <h3 className="text-2xl font-bold text-black dark:text-white">
                신고 처리
              </h3>
              <p className="text-sm text-black dark:text-gray-4">
                신고 처리를 진행합니다.
              </p>
            </span>
            <input
              type="text"
              onChange={e => {
                setReason(e.target.value);
              }}
              placeholder="처리 거절 사유를 입력해주세요."
              className="w-full mt-2 rounded-lg border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />

            <div className="flex flex-row w-full items-end justify-end">
              <button
                onClick={handleReportComplete}
                className="w-24 mt-5 py-2 rounded-lg border border-primary bg-primary hover:bg-primarydark text-white font-bold duration-300 ease-in-out"
                disabled={loadingRequest}
              >
                {loadingRequest ? (
                  <i className="fas fa-spinner fa-spin" />
                ) : (
                  "처리하기"
                )}
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

export default ReportListTable;
