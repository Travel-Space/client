import Ship from "./Ship";
import * as S from "./index.styled";
// Import Swiper React components
import { SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function ShipList() {
  return (
    <S.List
      slidesPerView={5}
      slidesPerGroup={5}
      spaceBetween={24}
      grabCursor={false}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(ship => (
        <SwiperSlide key={ship}>
          <Ship test={ship} />
        </SwiperSlide>
      ))}
    </S.List>
  );
}
