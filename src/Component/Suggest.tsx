function Suggest() {
  return (
    <>
      {/* Gợi ý của BookingCare*/}
      <div className="tw-max-w-6xl tw-h-80 tw-mx-auto sm: tw-px-3">
        <div className="tw-text-2xl tw-font-medium">
          <p>Gợi ý của BookingCare</p>
        </div>
        <div className="tw-flex tw-gap-10">
          <a href="">
            <div className="tw-p-4 tw-flex tw-flex-col tw-gap-2">
              <div>
                <img
                  src="./png/GợiÝCủaBookingCare1.png"
                  alt=""
                  className="tw-w-[178px] tw-rounded-full"
                />
              </div>
              <div className="tw-text-center tw-text-lg tw-font-medium">
                <p>Được quan tâm</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
export default Suggest;
