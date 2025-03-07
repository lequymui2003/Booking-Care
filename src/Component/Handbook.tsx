import ListHandbook from "../data/dataHandbook";
import { Slide } from "react-slideshow-image";

export class ItemHandbook {
  public img: string;
  public title: string;

  constructor(img: string, title: string) {
    this.img = img;
    this.title = title;
  }
}
function Handbook() {
  const listHandbook = ListHandbook as ItemHandbook[];
  return (
    <>
      {/* cẩm nang */}
      <div className="tw-w-full">
        <Slide
          duration={3000}
          transitionDuration={500}
          autoplay={true}
          infinite={true}
          arrows={true}
          slidesToScroll={1} // Cuộn 1 phần tử mỗi lần nhấn nút
          responsive={[
            {
              breakpoint: 1024,
              settings: { slidesToShow: 4, slidesToScroll: 1 },
            }, // PC: Hiển thị 3 phần tử
            {
              breakpoint: 768,
              settings: { slidesToShow: 3, slidesToScroll: 2 },
            }, // Tablet: Hiển thị 2 phần tử
            {
              breakpoint: 480,
              settings: { slidesToShow: 2, slidesToScroll: 1 },
            }, // Mobile: Hiển thị 1 phần tử
          ]}
        >
          {listHandbook.map((itemData: ItemHandbook, index: number) => (
            <div key={index} className="tw-flex tw-justify-around">
              <ElementHandbook data={itemData} index={index} />
            </div>
          ))}
        </Slide>
      </div>
    </>
  );
}
export function ElementHandbook(props: { index: number; data: ItemHandbook }) {
  return (
    <div key={props.index}>
      <a href="" className="tw-flex tw-flex-col tw-gap-3">
        <div>
          <img src={props.data.img} alt="" className="tw-w-56" />
        </div>
        <div className="tw-w-56 tw-text-base tw-font-medium">
          <p>{props.data.title}</p>
        </div>
      </a>
    </div>
  );
}
export default Handbook;
