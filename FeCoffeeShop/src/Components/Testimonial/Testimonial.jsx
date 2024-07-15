import React from "react";
import Slider from "react-slick";

const TestimonialData = [
    {
        id: 1,
        name: "Stan Smith",
        text: "Tôi rất hài lòng với dịch vụ của họ. Họ luôn cung cấp những sản phẩm chất lượng và dịch vụ chuyên nghiệp!",
        img: "https://picsum.photos/101/101",
    },
    {
        id: 2,
        name: "Sabir Ali",
        text: "Dịch vụ tuyệt vời! Tôi đã được trải nghiệm những hương vị tuyệt vời và nhân viên rất thân thiện.",
        img: "https://picsum.photos/102/102",
    },
    {
        id: 3,
        name: "Dilshed",
        text: "Sản phẩm chất lượng, giá cả hợp lý và dịch vụ chăm sóc khách hàng tuyệt vời. Tôi sẽ quay lại lần nữa!",
        img: "https://picsum.photos/104/104",
    },
    {
        id: 4,
        name: "Olivia Ali",
        text: "Đây là nơi tuyệt vời để thưởng thức cà phê và trà. Tôi rất thích không gian ở đây!",
        img: "https://picsum.photos/102/102",
    },
    {
        id: 5,
        name: "Peters Patel",
        text: "Tôi đã có một trải nghiệm tuyệt vời ở đây. Nhân viên rất nhiệt tình và đồ uống rất ngon!",
        img: "https://picsum.photos/101/101",
    },
    {
        id: 6,
        name: "Olivia Ali",
        text: "Dịch vụ chuyên nghiệp và nhân viên rất thân thiện. Chắc chắn tôi sẽ giới thiệu cho bạn bè của tôi!",
        img: "https://picsum.photos/102/102",
    },
];

const Testimonial = () => {
    const settings = {
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
    return (
        <div className="py-14 mb-10">
            <div className="container">
                <div data-aos="fade-up" className="text-center mb-10">
                    <h1 className="text-4xl font-bold font-cursive text-gray-800">
                        Đánh giá
                    </h1>
                </div>
                <div data-aos="zoom-in">
                    <Slider {...settings}>
                        {TestimonialData.map((data, index) => {
                            return (
                                <div className="my-6" key={data.id}>
                                    <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl bg-primary/10 relative">
                                        <div className="mb-4">
                                            <img
                                                src={data.img}
                                                alt=""
                                                className="rounded-full w-20 h-20"
                                            />
                                        </div>
                                        <div className="flex flex-col item-center gap-4">
                                            <div className="space-y-3">
                                                <p className="text-xs text-gray-500">
                                                    {data.text}
                                                </p>
                                                <h1 className="text-xl font-bold text-black/70 font-cursive">
                                                    {data.name}
                                                </h1>
                                            </div>
                                        </div>
                                        <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                                            ,,
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
