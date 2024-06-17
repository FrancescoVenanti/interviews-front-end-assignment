import { useState, useEffect } from "react";

function IsMobile() {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);

		// Cleanup the event listener when the component unmounts
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return isMobile;
}

export default IsMobile;
