import { Slide } from "react-slideshow-image";
import { useState, useEffect } from "react";
import { getSpecialties } from "../../service/specialtiesService";
import { ItemSpecialty } from "../../interface/itemSpecialty";

function MentalHealth() {
  const [mentalHealth, setMentalHealth] = useState([]);
  const [mentalHealthList, setMentalHealthList] = useState<ItemSpecialty[]>([]);

  const fetchData = async () => {
    try {
      const res = await getSpecialties();
      setMentalHealth(res);
    } catch (err) {
      console.error("Lỗi lấy danh sách user:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (mentalHealth && mentalHealth.length > 0) {
      const ListMentalHealth = mentalHealth.filter(
        (spe: ItemSpecialty) => spe.checkSpecialties === 3
      );
      console.log("Dữ liệu sau khi lọc:", ListMentalHealth);
      setMentalHealthList(ListMentalHealth);
    }
  }, [mentalHealth]);

  return (
    <>
      {/* Sức khỏe tinh thần */}

      <div className="tw-w-full">
        {mentalHealthList.length > 0 && (
          <Slide
            duration={3000}
            transitionDuration={500}
            // autoplay={true}
            infinite={true}
            arrows={true}
            slidesToScroll={1} // Cuộn 1 phần tử mỗi lần nhấn nút
            responsive={[
              {
                breakpoint: 1024,
                settings: { slidesToShow: 3, slidesToScroll: 1 },
              }, // PC: Hiển thị 3 phần tử
              {
                breakpoint: 768,
                settings: { slidesToShow: 2, slidesToScroll: 2 },
              }, // Tablet: Hiển thị 2 phần tử
              {
                breakpoint: 480,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
              }, // Mobile: Hiển thị 1 phần tử
            ]}
          >
            {mentalHealthList.map((itemData: ItemSpecialty, index: number) => (
              <div key={index} className="tw-flex tw-justify-around">
                <ElementMentalHealth data={itemData} index={index} />
              </div>
            ))}
          </Slide>
        )}
      </div>
    </>
  );
}
export function ElementMentalHealth(props: {
  index: number;
  data: ItemSpecialty;
}) {
  return (
    <a key={props.index} href="">
      <div className="tw-bg-white tw-rounded-xl tw-w-80 tw-min-h-[200px] tw-border tw-border-gray-300">
        <div className="tw-p-5">
          <img
            src={`http://localhost:5000/uploads/${props.data.image}`}
            alt=""
            className="tw-rounded-xl tw-w-full tw-h-48 tw-object-cover"
          />
        </div>
        <div className="tw-text-center tw-text-lg tw-font-medium">
          <p>{props.data.specialtiesName}</p>
        </div>
      </div>
    </a>
  );
}
export default MentalHealth;
