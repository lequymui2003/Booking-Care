import ListDoctor from "../data/dataDoctor";
import { Slide } from "react-slideshow-image";
import { useNavigate } from "react-router-dom";
export class ItemDoctor {
  public img: string;
  public title: string;
  public content: string;

  constructor(img: string, title: string, content: string) {
    this.img = img;
    this.title = title;
    this.content = content;
  }
}
function Doctor() {
 
  const listDoctor = ListDoctor as ItemDoctor[];
  return (
    <>
      {/* bác sĩ nổi bật*/}
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
          {listDoctor.map((itemData: ItemDoctor, index: number) => (
            <div key={index} className="tw-flex tw-justify-around">
              <ElementDoctor data={itemData} index={index} />
            </div>
          ))}
        </Slide>
      </div>
    </>
  );
}
export function ElementDoctor(props: { index: number; data: ItemDoctor }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/doctorPage");
  };
  return (
    <div key={props.index} onClick={handleClick}>
      <div className="tw-cursor-pointer tw-p-4 tw-flex tw-flex-col tw-gap-2 tw-w-[252px]">
        <div className="tw-m-auto">
          <img
            src={props.data.img}
            alt=""
            className="tw-w-[178px] tw-rounded-full"
          />
        </div>
        <div className="tw-text-center ">
          <p className="tw-text-lg tw-font-medium">{props.data.title}</p>
          <p className="tw-text-base tw-text-gray-400">{props.data.content}</p>
        </div>
      </div>
    </div>
  );
}
export default Doctor;
