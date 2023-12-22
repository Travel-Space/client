import * as S from "./index.styled";
import { Pagination } from "antd";

interface AdminTableProps<T> {
  data: T[];
  columns: any[];
  currentPage: number;
  itemsPerPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function AdminTable<T>({
  data,
  columns,
  currentPage,
  itemsPerPage,
  total,
  onPageChange,
}: AdminTableProps<T>) {
  return (
    <S.AdminTableContainer>
      <S.AdminTable pagination={false} dataSource={data as any} columns={columns} />
      <S.PaginationWrapper>
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={total}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      </S.PaginationWrapper>
    </S.AdminTableContainer>
  );
}
