import * as S from "./index.styled";
const dataSource = [
  {
    key: "1",
    name: "Mike",
    nickName: 32,
    email: "10 Downing Street",
    reportState: "10 Downing Street",
    remove: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    nickName: 32,
    email: "10 Downing Street",
    reportState: "10 Downing Street",
    remove: "10 Downing Street",
  },
];

const columns = [
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "닉네임",
    dataIndex: "nickName",
    key: "nickName",
  },
  {
    title: "이메일",
    dataIndex: "email",
    key: "email",
  },

  {
    title: "계정 신고 상태",
    dataIndex: "reportState",
    key: "reportState",
  },
  {
    title: "삭제",
    dataIndex: "remove",
    key: "remove",
  },
];

export default function AdminTable() {
  return <S.AdminTable pagination={false} dataSource={dataSource} columns={columns} />;
}
