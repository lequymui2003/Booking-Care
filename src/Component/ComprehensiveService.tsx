import ListComprehensiveService from "../data/dataComprehensiveService";
export class ItemComprehensiveService {
  public img: string;
  public title: string;
  constructor(img: string, title: string) {
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
  return (
    <a key={props.index} href="">
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
    </a>
  );
}

export default ComprehensiveService;
