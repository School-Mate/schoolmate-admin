"use client";

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

const ReportListTable = ({ reports }: { reports: Array<ReportWithTarget> }) => {
  const [modal, setModal] = useState(false);
  const [selectReportId, setSelectReportId] = useState<string>("");
  const [blockReason, setBlockReason] = useState("");
  const [blockPeriod, setBlockPeriod] = useState(1);

  const handleUserBlock = async (userId: string, targetId: string) => {
    if (!selectReportId) return alert("요청 ID를 선택해주세요.");

    try {
      await fetcher.post(`/admin/block`, {
        userId: userId,
        targetId: targetId,
        reason: blockReason,
        endDate: dayjs().add(blockPeriod, "day").toDate(),
      });

      alert("처리되었습니다.");

      setModal(false);
      setSelectReportId("");
    } catch (e: any | AxiosError) {
      if (e instanceof AxiosError) {
        alert(e.response?.data.message);
      } else {
        alert(e.message);
      }
    }
  };

  const handleReportComplete = async () => {
    if (!selectReportId) return alert("요청 ID를 선택해주세요.");

    try {
      await fetcher.post(`/admin/report`, {
        reportId: selectReportId,
      });

      alert("신고가 처리되었습니다.");

      setModal(false);
      setSelectReportId("");
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
    setSelectReportId("");
    setBlockReason("");
    setBlockPeriod(1);
  };

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
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {dayjs(report.createdAt).format("YYYY년 MM월 DD일 HH:mm")}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {report.reportUser ? (
                      <>
                        {report.reportUser.name}
                        <Link href={`/dashboard/users/${report.reportUser.id}`}>
                          <i className="fas fa-external-link-alt ml-2 text-sm cursor-pointer" />
                        </Link>
                      </>
                    ) : (
                      "탈퇴한 유저입니다."
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {reportTypeMap[report.targetType]}
                    <button
                      onClick={() => {
                        window.open(
                          `/dashboard/${report.targetType}/${report.targetId}`,
                          "popup",
                          "width=600,height=600"
                        );
                      }}
                    >
                      <i className="fas fa-external-link-alt ml-2 text-sm cursor-pointer" />
                    </button>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {report.message}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {report.targetUser ? (
                      <>
                        {report.targetUser.name}
                        <Link href={`/dashboard/users/${report.targetUser.id}`}>
                          <i className="fas fa-external-link-alt ml-2 text-sm cursor-pointer" />
                        </Link>
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReportListTable;
