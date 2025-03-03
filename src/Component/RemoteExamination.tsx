import ListRemoteExamination from "../data/dataRemoteExamination";
function RemoteExamination() {
  return (
    <>
      {/* Khám từ xa*/}
      {ListRemoteExamination.map((ListRemoteExamination, index) => (
        <a key={index} href="">
          <div className="tw-my-4">
            <div className="tw-bg-white tw-rounded-xl tw-w-80 tw-h-[272px] tw-border tw-border-gray-300">
              <div className="tw-p-5">
                <img
                  src={ListRemoteExamination.img}
                  alt=""
                  className="tw-rounded-xl tw-w-[277px] tw-h-[174px]"
                />
              </div>
              <div className="tw-text-center tw-text-lg tw-font-medium">
                <p>{ListRemoteExamination.title}</p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}
export default RemoteExamination;
