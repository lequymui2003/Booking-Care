import ListMentalHealth from "../data/dataMentalHealth";
function MentalHealth() {
  return (
    <>
      {/* Sức khỏe tinh thần */}
      {ListMentalHealth.map((ListMentalHealth, index) => (
        <a key={index} href="">
          <div className="tw-bg-white tw-rounded-xl tw-w-80 tw-min-h-[200px] tw-border tw-border-gray-300">
            <div className="tw-p-5">
              <img
                src={ListMentalHealth.img}
                alt=""
                className="tw-rounded-xl tw-w-full tw-h-48 tw-object-cover"
              />
            </div>
            <div className="tw-text-center tw-text-lg tw-font-medium">
              <p>{ListMentalHealth.title}</p>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}
export default MentalHealth;
