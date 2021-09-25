document.addEventListener("scroll", handleScroll);
// get a reference to the button
const scrollToTopBtn = document.getElementById("scroll-to-top");

function handleScroll() {
	let scrollableHeight =
		document.documentElement.scrollHeight -
		document.documentElement.clientHeight;

	const GOLDEN_RATIO = 0.5;

	if (document.documentElement.scrollTop / scrollableHeight > GOLDEN_RATIO) {
		//show button
		scrollToTopBtn.style.opacity = 1;
		scrollToTopBtn.style.height = "50px";
		scrollToTopBtn.style.width = "50px";
	} else {
		//hide button
		scrollToTopBtn.style.opacity = 0;
		scrollToTopBtn.style.height = 0;
		scrollToTopBtn.style.width = 0;
	}
}

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}

scrollToTopBtn.addEventListener("click", scrollToTop);
