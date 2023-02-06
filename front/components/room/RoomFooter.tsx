import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/room/RoomFooter.module.scss';

import RoomController from './RoomController';
import RoomFriend from './RoomFriend';
import RoomChat from './RoomChat';
import RoomReserv from './RoomReserv';

function RoomFooter({ session }: any) {
  const [controllerModalOpen, setControllerModalOpen] = useState(false);
  const [friendModalOpen, setFriendModalOpen] = useState(false);
  const [reservModalOpen, setReservModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [chatList, setChatList] = useState([
    {
      message: '채팅 입력창이에요',
      name: '싸리질러',
    },
  ]);

  // 채팅 듣기 on
  const chatOn = () => {
    session.on('signal:chat', (event: any) => {
      const newChat = {
        message: event.data,
        name: '이수민',
      };
      const newChatList = [...chatList, newChat];
      setChatList(newChatList);
    });
  };

  // 채팅 보내기
  const sendChat = (sendMassage: string) => {
    session
      .signal({
        data: sendMassage, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: 'chat', // The type of message (optional)
      })
      .then(() => {
        console.log(`"${sendMassage}"라고 채팅 보내기 성공`);
      })
      .catch((error: any) => {
        console.error('채팅 보내기 에러', error);
      });
  };

  // 렌더링시 실행
  useEffect(() => {
    chatOn();
  }, []);

  return (
    <div className={styles.container}>
      {chatModalOpen && (
        <RoomChat
          setModalOpen={setChatModalOpen}
          session={session}
          sendChat={sendChat}
          chatList={chatList}
        />
      )}
      {friendModalOpen && <RoomFriend setModalOpen={setFriendModalOpen} />}
      {controllerModalOpen && (
        <RoomController setModalOpen={setControllerModalOpen} />
      )}
      {reservModalOpen && <RoomReserv setModalOpen={setReservModalOpen} />}
      <div className={styles.section}>
        <div className={styles.btnList}>
          {/* 노래 중에는 버튼 바꾸기 !!! */}
          <button
            type="button"
            className={styles.friend}
            onClick={() => {
              setFriendModalOpen(!friendModalOpen);
            }}
          >
            친구초대
          </button>
          <button
            type="button"
            className={styles.reserv}
            onClick={() => {
              setReservModalOpen(!reservModalOpen);
            }}
          >
            예약하기
          </button>
        </div>
        <div className={styles.sound}>
          <Image
            src="img/ssari/ssari_clap_image.svg"
            width={40}
            height={39}
            alt="clap"
            className={styles.clap}
            onClick={() => {
              const audio = new Audio('sounds/Clap.wav');
              audio.play();
            }}
          />
          <Image
            src="img/ssari/ssari_tambourine_image.svg"
            width={40}
            height={37}
            alt="tambourine"
            className={styles.tambourine}
            onClick={() => {
              const audio = new Audio('sounds/Tambourine.mp3');
              audio.play();
            }}
          />
        </div>
        <Image
          src="img/ssari/ssari_controller_image.svg"
          width={45}
          height={40}
          alt="controller"
          className={styles.controller}
          onClick={() => {
            setControllerModalOpen(!controllerModalOpen);
          }}
        />
      </div>
      <Image
        src="img/ssari/ssari_chat_image.svg"
        width={42}
        height={39}
        alt="chat"
        className={styles.chat}
        onClick={() => {
          setChatModalOpen(!chatModalOpen);
        }}
      />
    </div>
  );
}

export default RoomFooter;
