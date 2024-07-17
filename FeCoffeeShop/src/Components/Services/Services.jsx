import React from "react";
import Img2 from "../../assets/coffee2.png";
import Img3 from "../../assets/coffee-white.png";

const ServicesData = [
    {
        id: 1,
        img: Img3,
        name: "Espresso",
        description:
            "Espresso là loại cà phê được pha từ hạt cà phê rang đậm và đặc biệt, thường được phục vụ nhỏ và mạnh.",
        aosDelay: "100",
    },
    {
        id: 2,
        img: Img2,
        name: "Americano",
        description:
            "Americano là loại cà phê được pha từ espresso và nước nóng, mang lại hương vị đậm đà và đầy cảm hứng.",
        aosDelay: "300",
    },
    {
        id: 3,
        img: Img3,
        name: "Cappuccino",
        description:
            "Cappuccino là sự kết hợp hoàn hảo giữa espresso, sữa nóng và sữa sánh, tạo ra một ly cà phê mịn màng và bồng bềnh.",
        aosDelay: "600",
    },
];

const Services = () => {
    return (
        <>
            <span id="services"></span>
            <div className="py-10">
                <div className="container">
                    <div className="text-center mb-20">
                        <h1 className="text-4xl font-bold font-cursive text-gray-800">
                            Cà phê tốt nhất cho bạn.
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center">
                        {ServicesData.map((data, index) => (
                            <div
                                data-aos="fade-up"
                                data-aos-delay={data.aosDelay}
                                key={index}
                                className="rounded-2xl cursor-pointer bg-white hover:bg-primary hover:text-white shadow-xl duration-200 max-w-[300px] group relative"
                            >
                                <div className="h-[122px]">
                                    <img
                                        src={data.img}
                                        alt=""
                                        className="max-w-[200px] block mx-auto transform -translate-y-14 group-hover:scale-110 group-hover:rotate-6 duration-300"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h1 className="text-xl font-bold">
                                        {data.name}
                                    </h1>
                                    <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                                        {data.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Services;
