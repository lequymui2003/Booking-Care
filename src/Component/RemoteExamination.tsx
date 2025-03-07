import ListRemoteExamination from "../data/dataRemoteExamination";
import { Slide } from "react-slideshow-image";
export class ItemRemoteExamination {
  public img: string;
  public title: string;

  constructor(img: string, title: string) {
    this.img = img;
    this.title = title;
  }
}
function RemoteExamination() {
  const listRemoteExamination =
    ListRemoteExamination as ItemRemoteExamination[];
  return (
    <>
      {/* Khám từ xa*/}
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
          {listRemoteExamination.map(
            (itemData: ItemRemoteExamination, index: number) => (
              <div key={index} className="tw-flex tw-justify-around">
                <ElementRemoteExamination
                  key={index}
                  data={itemData}
                  index={index}
                />
              </div>
            )
          )}
        </Slide>
      </div>
    </>
  );
}
export function ElementRemoteExamination(props: {
  index: number;
  data: ItemRemoteExamination;
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
export default RemoteExamination;
