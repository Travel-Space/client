// import { useEffect, useState } from "react";
// import { useRecoilValue } from "recoil";
// import Modal from "./Modal";
// import Messages from "./Messages";
// import { Chat, Message } from "@/@types/Chat";
// import { userAtom } from "@/recoil/atoms/user.atom";
// import useSocket from "@/hooks/useSocket";
// import axios from "axios";
// import * as S from "./index.styled";
// import Line from "@/components/common/Line";
// import Input from "@/components/common/Input";
// import Button from "@/components/common/Button";

// export default function Content() {
//   const user = useRecoilValue(userAtom);
//   const [showModal, setShowModal] = useState(false);
//   const [sendMessage, setSendMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const socket = useSocket("CHAT", user?.id);

//   // useEffect(() => {
//   //   socket.emit("joinRoom", { roomId: "1", type: "planet" });

//   //   socket.on("message", message => {
//   //     socket.emit("sendMessage", message);
//   //     setChat(prevChat => [...prevChat, message]);
//   //   });
//   // }, [socket]);

//   // useEffect(() => {
//   //   // 'roomHistory' 이벤트를 수신하고, 데이터를 처리합니다.
//   //   socket.on("roomHistory", messages => {
//   //     // 여기서 messages를 상태에 저장하거나 화면에 표시할 수 있습니다.
//   //     console.log(messages); // 콘솔에 메시지 내역을 출력
//   //     // 예: 상태에 메시지 저장
//   //     setChat(messages);
//   //   });

//   //   // 컴포넌트가 언마운트될 때 리스너를 정리합니다.
//   //   return () => {
//   //     socket.off("roomHistory");
//   //   };
//   // }, [socket]);

//   const handleShowModal = () => {
//     setShowModal(prev => !prev);
//   };

//   const submitSendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       if (sendMessage) {
//         const message = {
//           chatRoomId: 1,
//           senderId: user?.id,
//           content: sendMessage,
//         };

//         socket.emit("sendMessage", message);
//         setChat(prev => [...prev, message]);
//         // await axios.post("http://localhost:8080/chats/1/messages", message);
//         setSendMessage(""); // Clear the input after sending the message
//       }
//     }
//   };

//   return (
//     <S.ContentBox>
//       <S.Wrapper>
//         <S.Top>
//           <div />
//           <S.Title>
//             제목이 들어간다 제목이 들어간다 <strong>6/100</strong>
//           </S.Title>
//           <S.ModalBox>
//             <S.PplImage onClick={handleShowModal} src="/assets/img/icons/person.svg" />
//             {showModal && <Modal />}
//           </S.ModalBox>
//         </S.Top>
//         <Line size="horizontal" color="gray" />
//       </S.Wrapper>

//       {/* <Messages messages={chat} /> */}

//       <div>안녕안녕안녕하세요</div>
//       {chat.map(el => (
//         <div>{el.content}</div>
//       ))}

//       <S.Wrapper>
//         <Line size="horizontal" color="gray" />
//         <S.Bottom>
//           <S.GalleryImage src="/assets/img/icons/gallery.svg" />
//           <Input
//             value={sendMessage}
//             onKeyDown={submitSendMessage}
//             onChange={e => setSendMessage(e.target.value)}
//             rounded
//             thin
//           />
//           <Button
//             variant="confirm"
//             shape="extraLarge"
//             size="smallWithXsFont"
//             fontWeight="bold"
//             onClick={submitSendMessage}
//           >
//             보내기
//           </Button>
//         </S.Bottom>
//       </S.Wrapper>
//     </S.ContentBox>
//   );
// }
