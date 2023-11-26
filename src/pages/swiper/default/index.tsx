import dynamic from "next/dynamic";

const SwiperNoSSR = dynamic(() => import("@/components/Swiper/SwiperDefault"), {
	ssr: false
})

export default SwiperNoSSR;
