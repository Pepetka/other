import dynamic from "next/dynamic";

const ChartNoSSR = dynamic(() => import("@/components/Chart"), {
	ssr: false
})

export default ChartNoSSR;
