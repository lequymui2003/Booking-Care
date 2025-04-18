import { Slide } from "react-slideshow-image";
import ListDataSpecialty from "../data/dataSpecialty";
import { useState, useEffect } from "react";
import { useSpecialties } from "../store/hooks";
export class ItemSpecialty {
  public img: string;
  public title: string;

  constructor(img: string, title: string) {
    this.img = img;
    this.title = title;
  }
}

function Specialty() {
  const listSpecialty = ListDataSpecialty as ItemSpecialty[];
  const [specialty, getSpecialty] = useSpecialties();
  const [specialtyList, setSpecialtyList] = useState<any[]>([]); // State để lưu giá trị của specialty
  useEffect(() => {
    getSpecialty();
  }, []);
  useEffect(() =>{
    setSpecialtyList(specialty); // Gán giá trị của specialty vào state specialtyList
  },[specialtyList])
  useEffect(() => {
    // console.log("specialtyList", specialtyList);
  }, []);


  return (
    <>
      {/* Chuyên khoa*/}
      <div className="tw-w-full">
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
          {listSpecialty.map((itemData: ItemSpecialty, index: number) => (
            <div key={index} className="tw-flex tw-justify-around">
              <ElementSpecialty data={itemData} index={index} />
            </div>
          ))}
        </Slide>
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
              src={props.data.img}
              alt=""
              className="tw-rounded-xl tw-w-[277px] tw-h-[174px]"
            />
          </div>
          <div className="tw-text-center tw-text-lg tw-font-medium">
            <p>{props.data.title}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
export default Specialty;
