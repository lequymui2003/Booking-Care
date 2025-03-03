import ListComprehensiveService from "../data/dataComprehensiveService";
function ComprehensiveService() {
  return (
    <>
      {/* Dịch vụ toàn diện */}
      <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-gap-5 tw-mt-5">
        {ListComprehensiveService.map((item, index) => (
          <div
            key={index}
            className="tw-flex tw-items-center tw-gap-5 tw-p-4 tw-rounded-2xl tw-border-2 tw-bg-cover tw-bg-center tw-bg-no-repeat"
            style={{ backgroundImage: "url('./png/ic_background.png')" }}
          >
            <div className="tw-w-14 tw-h-14">
              <img src={item.img} alt="" className="tw-w-full tw-h-full" />
            </div>
            <div className="tw-text-xl">
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default ComprehensiveService;
