export const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slideToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
        {
            breakpoint: 10000,
            settings: {
                slidesToShow: 3,
                slideToScroll: 1,
                infinite: true,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slideToScroll: 1,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                slideToScroll: 1,
                initialSlide: 1,
            },
        },
    ],
};
