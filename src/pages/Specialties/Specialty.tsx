import { Slide } from "react-slideshow-image";
import { useState, useEffect } from "react";
import { getSpecialties } from "../../service/specialtiesService";
import { ItemSpecialty } from "../../interface/itemSpecialty";

function Specialty() {
  const [specialty, setSpecialty] = useState([]);
  const [specialtyList, setSpecialtyList] = useState<ItemSpecialty[]>([]);

  const fetchData = async () => {
    try {
      const res = await getSpecialties();
      setSpecialty(res);
    } catch (err) {
      console.error("Lỗi lấy danh sách user:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (specialty && specialty.length > 0) {
      const ListSpecialty1 = specialty.filter(
        (spe: ItemSpecialty) => spe.checkSpecialties === 1
      );
      console.log("Dữ liệu sau khi lọc:", ListSpecialty1);
      setSpecialtyList(ListSpecialty1);
    }
  }, [specialty]);


  return (
    <>
      {/* Chuyên khoa*/}
      <div className="tw-w-full">
        {specialtyList.length > 0 && (
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
            {specialtyList.map((itemData: ItemSpecialty, index: number) => (
              <div key={index} className="tw-flex tw-justify-around">
                <ElementSpecialty data={itemData} index={index} />
              </div>
            ))}
          </Slide>
        )}
      </div>
    </>
  );
}
export function ElementSpecialty(props: {
  index: number;
  data: ItemSpecialty;
}) {
  return (
    <a key={props.index} href="">
      <div className="tw-my-4">
        <div className="tw-bg-white tw-rounded-xl tw-w-80 tw-h-[272px] tw-border tw-border-gray-300">
          <div className="tw-p-5">
            <img
              src={`http://localhost:5000/uploads/${props.data.image}`}
              alt=""
              className="tw-rounded-xl tw-w-[277px] tw-h-[174px]"
            />
          </div>
          <div className="tw-text-center tw-text-lg tw-font-medium">
            <p>{props.data.specialtiesName}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
export default Specialty;
