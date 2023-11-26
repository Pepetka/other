import dynamic from "next/dynamic";

const SwiperNoSSR = dynamic(() => import("@/components/Swiper/Swiper"), {
	ssr: false
})

export default SwiperNoSSR;
