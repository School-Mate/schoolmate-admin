"use client";

import fetcher from "@/lib/fetcher";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useState } from "react";

const ReportListTable = ({
  reports,
}: {
  reports: Array<Report>;
}) => {
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
  }

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
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">신고자</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">대상 타입</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">사유</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">대상 유저</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">상태관리</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  )
}

export default ReportListTable;