"use client";

import React from "react";
import { ClientRecord } from "../types";

interface CompanyRecordCardProps {
  record: ClientRecord;
  index: number;
}

const CompanyRecordCard: React.FC<CompanyRecordCardProps> = ({
  record,
  index,
}) => {
  const getCardTheme = (index: number) => {
    if (index % 3 === 0) {
      return {
        cardBg: "border-blue-300 bg-blue-50",
        headerBg: "bg-blue-200",
        noteBg: "bg-blue-100 border-blue-300",
      };
    } else if (index % 3 === 1) {
      return {
        cardBg: "border-green-300 bg-green-50",
        headerBg: "bg-green-200",
        noteBg: "bg-green-100 border-green-300",
      };
    } else {
      return {
        cardBg: "border-purple-300 bg-purple-50",
        headerBg: "bg-purple-200",
        noteBg: "bg-purple-100 border-purple-300",
      };
    }
  };

  const theme = getCardTheme(index);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div
      className={`rounded-lg border-2 shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden ${theme.cardBg}`}
    >
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            {/* Table Header */}
            <thead>
              <tr className={theme.headerBg}>
                <th className="border border-gray-400 px-3 py-2 text-left text-sm font-bold text-gray-800">
                  Company
                </th>
                <th className="border border-gray-400 px-3 py-2 text-left text-sm font-bold text-gray-800">
                  Dis Date
                </th>
                <th className="border border-gray-400 px-3 py-2 text-left text-sm font-bold text-gray-800">
                  Amount
                </th>
                <th className="border border-gray-400 px-3 py-2 text-left text-sm font-bold text-gray-800">
                  Age
                </th>
                <th className="border border-gray-400 px-3 py-2 text-left text-sm font-bold text-gray-800">
                  Ending Date
                </th>
                <th className="border border-gray-400 px-3 py-2 text-left text-sm font-bold text-gray-800">
                  Scheme
                </th>
                <th className="border border-gray-400 px-3 py-2 text-left text-sm font-bold text-gray-800">
                  BOD
                </th>
                <th className="border border-gray-400 px-3 py-2 text-left text-sm font-bold text-gray-800">
                  EOD
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              <tr className="bg-white">
                <td className="border border-gray-400 px-3 py-2 text-sm font-semibold text-gray-900">
                  {record.company}
                </td>
                <td className="border border-gray-400 px-3 py-2 text-sm text-gray-800">
                  {formatDate(record.disDate)}
                </td>
                <td className="border border-gray-400 px-3 py-2 text-sm font-bold text-green-600">
                  {record.amount}
                </td>
                <td className="border border-gray-400 px-3 py-2 text-sm text-gray-800">
                  {record.age}
                </td>
                <td className="border border-gray-400 px-3 py-2 text-sm text-gray-800">
                  {formatDate(record.endingDate)}
                </td>
                <td className="border border-gray-400 px-3 py-2 text-sm text-gray-800">
                  {record.scheme}
                </td>
                <td className="border border-gray-400 px-3 py-2 text-sm text-gray-800">
                  {record.bod}
                </td>
                <td className="border border-gray-400 px-3 py-2 text-sm text-gray-800">
                  {record.eod}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Note Section Below Table */}
        <div className="mt-4">
          <div className={`p-3 rounded-md border ${theme.noteBg}`}>
            <p className="text-sm font-medium text-gray-800">
              <span className="font-bold">Note:</span> {record.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRecordCard;
