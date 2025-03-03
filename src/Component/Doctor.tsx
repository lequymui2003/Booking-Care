import ListDoctor from "../data/dataDoctor";
function Doctor() {
  return (
    <>
      {/* bác sĩ nổi bật*/}
      {ListDoctor.map((ListDoctor, index) => (
        <a key={index} href="">
          <div className="tw-p-4 tw-flex tw-flex-col tw-gap-2 tw-w-[252px]">
            <div className="tw-m-auto">
              <img
                src={ListDoctor.img}
                alt=""
                className="tw-w-[178px] tw-rounded-full"
              />
            </div>
            <div className="tw-text-center ">
              <p className="tw-text-lg tw-font-medium">{ListDoctor.title}</p>
              <p className="tw-text-base tw-text-gray-400">
                {ListDoctor.content}
              </p>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}
export default Doctor;
