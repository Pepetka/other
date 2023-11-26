import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from "./Swiper.module.css";
import Image from "next/image";
import {useEffect, useMemo, useRef} from "react";
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, } from 'swiper/modules';
import {SwiperOptions} from "swiper/types";

const SwiperDefault = () => {
	const ref = useRef<HTMLDivElement>(null);
	const swiperOpts: SwiperOptions = useMemo(() => ({
		loop: true,
		lazyPreloadPrevNext: 2,
		modules: [ Navigation, Pagination, Scrollbar ],
		spaceBetween: 50,
		slidesPerView: 1,
		keyboard: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: `.swiper-pagination`,
			clickable: true,
			renderBullet: (index, className) => {
				return `<div class="${className} ${styles.customPaginationItem}"><img width="20px" height="20px" src="https://cybersport.metaratings.ru/upload/iblock/9b2/9b2505136a4fe0dfce52140881c24954.jpg" alt="img" style="padding-inline: 10px" /></div>`
			}
		},
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
	}), []);

	useEffect(() => {
		if (ref.current) {
			new Swiper(ref.current, swiperOpts);
		}
	}, [swiperOpts])

	return (
		<div className={styles.swiperContainer} style={{
			background: "cyan"
		}}>
			<div ref={ref} className={`swiper ${styles.swiper}`}>
				<div className="swiper-wrapper">
					<div className="swiper-slide">
						<Image height="500" width="500" src="https://cybersport.metaratings.ru/upload/iblock/9b2/9b2505136a4fe0dfce52140881c24954.jpg" alt="img" />
					</div>
					<div className="swiper-slide">
						<Image height="500" width="500" src="https://cybersport.metaratings.ru/upload/iblock/9b2/9b2505136a4fe0dfce52140881c24954.jpg" alt="img" />
					</div>
					<div className="swiper-slide">
						<Image height="500" width="500" src="https://cybersport.metaratings.ru/upload/iblock/9b2/9b2505136a4fe0dfce52140881c24954.jpg" alt="img" />
					</div>
					<div className="swiper-slide">
						<Image height="500" width="500" src="https://cybersport.metaratings.ru/upload/iblock/9b2/9b2505136a4fe0dfce52140881c24954.jpg" alt="img" />
					</div>
				</div>
				<div className="swiper-pagination"></div>

				<div className="swiper-button-prev"></div>
				<div className="swiper-button-next"></div>

				<div className="swiper-scrollbar"></div>
			</div>
		</div>
	)
}

export default SwiperDefault;
