"use client";

import Modal from "@/components/Modal";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import fetcher from "@/lib/fetcher";
import { numberWithCommas } from "@/lib/utils";
import { AxiosError } from "axios";
import { useState } from "react";
import { School } from "schoolmate-types";

const SchoolListTable = ({
  schools,
}: {
  schools: Array<School & { userCount: number }>;
}) => {
  const ref = useOutsideClick(() => {
    setModal(false);
    setEditSchoolId("");
  });
  const [modal, setModal] = useState(false);
  const [editSchoolId, setEditSchoolId] = useState<string>("");
  const [name, setName] = useState("");
  const handleChangeSchoolName = async () => {
    if (!name) return alert("학교명을 입력해주세요.");
    if (!editSchoolId) return alert("학교를 선택해주세요.");

    try {
      await fetcher.post(`/admin/school/${editSchoolId}/name`, {
        name: name,
      });

      alert("학교명이 수정되었습니다.");

      setModal(false);
      setEditSchoolId("");
    } catch (e: any | AxiosError) {
      if (e instanceof AxiosError) {
        alert(e.response?.data.message);
      } else {
        alert(e.message);
      }
    }
  };

  return (
    <>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                학교명
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                종류
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                가입자 수
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                수정
              </th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {school.defaultName} {school.name && <>({school.name})</>}
                  </h5>
                  <p className="text-sm">{school.schoolId}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{school.type}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {numberWithCommas(school.userCount)}명
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="hover:text-primary"
                      onClick={() => {
                        setModal(true);
                        setEditSchoolId(school.schoolId);
                      }}
                    >
                      <i className="fas fa-edit" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal
          callbackClose={() => {
            setModal(false);
            setEditSchoolId("");
          }}
        >
          <div className="w-full p-10">
            <span>
              <h3 className="text-2xl font-bold text-black dark:text-white">
                학교명 수정
              </h3>
              <p className="text-sm text-black dark:text-gray-4">
                학교명을 수정할 수 있습니다.
              </p>
            </span>
            <input
              type="text"
              onChange={e => {
                setName(e.target.value);
              }}
              placeholder="변경할 학교명을 입력해주세요."
              className="w-full mt-2 rounded-lg border border-stroke bg-transparent py-2 pl-3 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />

            <div className="flex flex-row w-full items-end justify-end">
              <button
                onClick={handleChangeSchoolName}
                className="w-24 mt-5 py-2 rounded-lg border border-primary bg-primary hover:bg-primarydark text-white font-bold duration-300 ease-in-out"
              >
                수정하기
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

export default SchoolListTable;
