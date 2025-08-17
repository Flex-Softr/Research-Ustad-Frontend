"use client";
import TableSkeleton from "@/components/Skeleton/Hompage/DashboardTableSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {
  TableHeader as TableHeaderComponent,
  CellRenderer,
  TableActions,
  TablePagination,
} from "./components";
import { useTableData, useTableActions } from "./hooks";
import { formatDate, getItemTitle } from "./utils/tableUtils";

interface Column {
  label: string;
  value: string;
}

interface DataItem {
  _id: string;
  [key: string]: any;
}

interface ManageTableProps {
  data: DataItem[];
  loading: boolean;
  columns: Column[];
  isvalue: string;
  onDelete?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onRoleChange?: (id: string, currentRole: string) => void;
  customRenderCell?: (column: Column, item: DataItem) => React.ReactNode | null;
  customActions?: (item: DataItem) => React.ReactNode;
}

const ManageTable: React.FC<ManageTableProps> = ({
  data,
  loading,
  columns,
  onDelete,
  onApprove,
  onReject,
  onRoleChange,
  isvalue,
  customRenderCell,
  customActions,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<DataItem | null>(null);

  // Use custom hooks for data management and actions
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    selectedCategory,
    setSelectedCategory,
    filteredData,
    paginatedData,
    totalPages,
  } = useTableData({ data, columns, isvalue });

  const { handleApprove, handleReject, handleRoleChange } = useTableActions({
    onApprove,
    onReject,
    onRoleChange,
  });

  if (loading) {
    return <TableSkeleton />;
  }

  const renderCellContent = (column: Column, item: DataItem) => {
    // Check for custom rendering first
    if (customRenderCell) {
      const customContent = customRenderCell(column, item);
      if (customContent !== null) {
        return customContent;
      }
    }

    // Use the CellRenderer component for default rendering
    return <CellRenderer column={column} item={item} formatDate={formatDate} />;
  };

  return (
    <div className="bg-white border rounded-md p-4">
      {/* Search and Filter Section */}
      <TableHeaderComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isvalue={isvalue}
        filteredDataLength={filteredData?.length || 0}
      />

      {filteredData?.length > 0 ? (
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              {columns?.map((column, idx) => (
                <TableHead key={idx} className="text-black">
                  {column.label}
                </TableHead>
              ))}
              {isvalue !== "userOrder" && (
                <TableHead className="text-black">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-500">
            {paginatedData?.map((item, index) => (
              <TableRow key={index}>
                {columns?.map((column, idx) => (
                  <TableCell key={idx}>
                    {renderCellContent(column, item)}
                  </TableCell>
                ))}
                <TableCell>
                  <TableActions
                    item={item}
                    isvalue={isvalue}
                    onDelete={onDelete}
                    onApprove={onApprove}
                    onReject={onReject}
                    onRoleChange={onRoleChange}
                    customActions={customActions}
                    deleteDialogOpen={deleteDialogOpen}
                    setDeleteDialogOpen={setDeleteDialogOpen}
                    itemToDelete={itemToDelete}
                    setItemToDelete={setItemToDelete}
                    getItemTitle={getItemTitle}
                    handleApprove={handleApprove}
                    handleReject={handleReject}
                    handleRoleChange={handleRoleChange}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center p-4">No Data Available</p>
      )}

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ManageTable;
