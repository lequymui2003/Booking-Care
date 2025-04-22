import { useNavigate } from "react-router-dom";
import ListComprehensiveService from "../data/dataComprehensiveService";
export class ItemComprehensiveService {
  public id: number;
  public img: string;
  public title: string;
  constructor(id: number, img: string, title: string) {
    this.id = id;
    this.img = img;
    this.title = title;
  }
}

function ComprehensiveService() {
  const listComprehensiveService =
    ListComprehensiveService as ItemComprehensiveService[];
  return (
    <>
      {/* Dịch vụ toàn diện */}
      <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-gap-5 tw-mt-5">
        {listComprehensiveService.map(
          (itemData: ItemComprehensiveService, index: number) => (
            <ElementComprehensiveService data={itemData} index={index} />
          )
        )}
      </div>
    </>
  );
}
export function ElementComprehensiveService(props: {
  index: number;
  data: ItemComprehensiveService;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.data.id === 1) {
      navigate("/specialtyPage");
    } else if (props.data.id === 2) {
      navigate("/remoteExamination");
    } else if (props.data.id === 3) {
      alert("chưa có trang này");
    } else {
      navigate("/mentalHealthPage");
    }
  };

  return (
    <div key={props.index} onClick={handleClick} className="tw-cursor-pointer">
      <div
        className="tw-flex tw-items-center tw-gap-5 tw-p-4 tw-rounded-2xl tw-border-2 tw-bg-cover tw-bg-center tw-bg-no-repeat"
        style={{ backgroundImage: "url('./png/ic_background.png')" }}
      >
        <div className="tw-w-14 tw-h-14">
          <img src={props.data.img} alt="" className="tw-w-full tw-h-full" />
        </div>
        <div className="tw-text-xl">
          <p>{props.data.title}</p>
        </div>
      </div>
    </div>
  );
}

export default ComprehensiveService;
