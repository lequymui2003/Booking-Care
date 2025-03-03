import ListDataSpecialty from "../data/dataSpecialty";
function Specialty() {
  return (
    <>
      {/* Chuyên khoa*/}
      {ListDataSpecialty.map((ListDataSpecialty, index) => (
        <a key={index} href="">
          <div className="tw-my-4">
            <div className="tw-bg-white tw-rounded-xl tw-w-80 tw-h-[272px] tw-border tw-border-gray-300">
              <div className="tw-p-5">
                <img
                  src={ListDataSpecialty.img}
                  alt=""
                  className="tw-rounded-xl tw-w-[277px] tw-h-[174px]"
                />
              </div>
              <div className="tw-text-center tw-text-lg tw-font-medium">
                <p>{ListDataSpecialty.title}</p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}
export default Specialty;
