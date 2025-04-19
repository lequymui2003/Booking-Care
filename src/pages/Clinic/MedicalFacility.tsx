import { Slide } from "react-slideshow-image";
import { ItemClinic } from "../../interface/listClinic";
import { getClinics } from "../../service/clinicService";
import { useEffect, useState } from "react";

function MedicalFacility() {
  const [clinic, setClinic] = useState([]);
  const [clinicList, setClinicList] = useState<ItemClinic[]>([]);

  const fetchData = async () => {
    try {
      const res = await getClinics();
      setClinic(res);
    } catch (err) {
      console.error("Lỗi lấy danh sách user:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (clinic && clinic.length > 0) {
      setClinicList(clinic);
    }
  }, [clinic]);

  return (
    <>
      <div className="tw-w-full">
        {clinicList.length > 0 && (
          <Slide
            duration={3000}
            transitionDuration={500}
            // autoplay={true}
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
            {clinicList.map((itemData: ItemClinic, index: number) => (
              <div key={index} className="tw-flex tw-justify-around">
                <ElementMedicalFacility data={itemData} index={index} />
              </div>
            ))}
          </Slide>
        )}
      </div>
    </>
  );
}

export function ElementMedicalFacility(props: {
  index: number;
  data: ItemClinic;
}) {
  return (
    <a key={props.index} href="">
      <div className="tw-my-4">
        <div className=" tw-bg-white tw-rounded-xl tw-w-80 tw-h-[272px] tw-border tw-border-gray-300">
          <div className="tw-flex tw-flex-col tw-justify-between tw-h-full tw-pb-3">
            <div className="tw-p-5">
              <img
                src={`http://localhost:5000/uploads/${props.data.image}`}
                alt=""
                className="tw-rounded-xl tw-w-[266px] tw-h-auto"
              />
            </div>
            <div className="tw-text-center tw-text-lg tw-font-medium">
              <p>{props.data.clinicName}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default MedicalFacility;
