import * as S from "./index.styled";
import { Planet } from "@/@types/Planet";
import { Posting } from "@/@types/Posting";
import { User } from "@/@types/User";

interface AdminTableProps<T> {
  data: T[];
  columns: any[];
}

export default function AdminTable<T>({ data, columns }: AdminTableProps<T>) {
  return <S.AdminTable pagination={false} dataSource={data as any} columns={columns} />;
}
