import ListMentalHealth from "../data/dataMentalHealth";
import { Slide } from "react-slideshow-image";

export class ItemMentalHealth {
  public img: string;
  public title: string;

  constructor(img: string, title: string) {
    this.img = img;
    this.title = title;
  }
}
function MentalHealth() {
  const listMentalHealth = ListMentalHealth as ItemMentalHealth[];
  return (
    <>
      {/* Sức khỏe tinh thần */}

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
          {listMentalHealth.map((itemData: ItemMentalHealth, index: number) => (
            <div key={index} className="tw-flex tw-justify-around">
              <ElementMentalHealth data={itemData} index={index} />
            </div>
          ))}
        </Slide>
      </div>
    </>
  );
}
export function ElementMentalHealth(props: {
  index: number;
  data: ItemMentalHealth;
}) {
  return (
    <a key={props.index} href="">
      <div className="tw-bg-white tw-rounded-xl tw-w-80 tw-min-h-[200px] tw-border tw-border-gray-300">
        <div className="tw-p-5">
          <img
            src={props.data.img}
            alt=""
            className="tw-rounded-xl tw-w-full tw-h-48 tw-object-cover"
          />
        </div>
        <div className="tw-text-center tw-text-lg tw-font-medium">
          <p>{props.data.title}</p>
        </div>
      </div>
    </a>
  );
}
export default MentalHealth;
