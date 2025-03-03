import ListMedicalFacility from "../data/dataMedicalFacility";
function MedicalFacility() {
  return (
    <>
      {/* Cơ sở y tế*/}
      {ListMedicalFacility.map((ListMedicalFacility, index) => (
        <a key={index} href="">
          <div className="tw-my-4">
            <div className="tw-bg-white tw-rounded-xl tw-w-80 tw-h-[272px] tw-border tw-border-gray-300">
              <div className="tw-p-5">
                <img
                  src={ListMedicalFacility.img}
                  alt=""
                  className="tw-rounded-xl tw-w-[266px] tw-h-[126px]"
                />
              </div>
              <div className="tw-text-center tw-text-lg tw-font-medium">
                <p>{ListMedicalFacility.title}</p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}
export default MedicalFacility;
