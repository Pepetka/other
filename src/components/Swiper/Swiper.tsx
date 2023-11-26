import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from "./Swiper.module.css";
import Image from "next/image";
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const SwiperComponent = () => {
	return (
		<div className={styles.swiperContainer}>
			<Swiper
				className={styles.swiper}
				lazyPreloadPrevNext={2}
				modules={[ Navigation, Pagination, Scrollbar ]}
				spaceBetween={50}
				slidesPerView={1}
				keyboard
				navigation
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
				<SwiperSlide>
					<Image  height="500" width="500" src="https://cybersport.metaratings.ru/upload/iblock/9b2/9b2505136a4fe0dfce52140881c24954.jpg" alt="img" />
				</SwiperSlide>
				<SwiperSlide>
					<Image height="500" width="500" src="https://cybersport.metaratings.ru/upload/iblock/9b2/9b2505136a4fe0dfce52140881c24954.jpg" alt="img" />
				</SwiperSlide>
				<SwiperSlide>
					<Image height="500" width="500" src="https://cybersport.metaratings.ru/upload/iblock/9b2/9b2505136a4fe0dfce52140881c24954.jpg" alt="img" />
				</SwiperSlide>
				<SwiperSlide>
					<Image height="500" width="500" src="https://cybersport.metaratings.ru/upload/iblock/9b2/9b2505136a4fe0dfce52140881c24954.jpg" alt="img" />
				</SwiperSlide>
			</Swiper>
		</div>
	)
}

export default SwiperComponent;
