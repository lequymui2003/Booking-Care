import { Slide } from "react-slideshow-image";
import { useState, useEffect } from "react";
import { getSpecialties } from "../../service/specialtiesService";
import { ItemSpecialty } from "../../interface/itemSpecialty";
import { useNavigate } from "react-router-dom";

function RemoteExamination() {
  const [remoteExamination, setRemoteExamination] = useState([]);
  const [remoteExaminationList, setRemoteExaminationList] = useState<
    ItemSpecialty[]
  >([]);

  const fetchData = async () => {
    try {
      const res = await getSpecialties();
      setRemoteExamination(res);
    } catch (err) {
      console.error("Lỗi lấy danh sách user:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (remoteExamination && remoteExamination.length > 0) {
      const ListSpecialty1 = remoteExamination.filter(
        (spe: ItemSpecialty) => spe.checkSpecialties === 2
      );
      console.log("Dữ liệu sau khi lọc:", ListSpecialty1);
      setRemoteExaminationList(ListSpecialty1);
    }
  }, [remoteExamination]);

  return (
    <>
      {/* Khám từ xa*/}
      <div className="tw-w-full">
        {remoteExaminationList.length > 0 && (
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
            {remoteExaminationList.map(
              (itemData: ItemSpecialty, index: number) => (
                <div key={index} className="tw-flex tw-justify-around">
                  <ElementRemoteExamination
                    key={index}
                    data={itemData}
                    index={index}
                  />
                </div>
              )
            )}
          </Slide>
        )}
      </div>
    </>
  );
}
export function ElementRemoteExamination(props: {
  index: number;
  data: ItemSpecialty;
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/listDoctor/${props.data.id}`);
  };
  return (
    <a key={props.index} href="" onClick={handleClick}>
      <div className="tw-my-4">
        <div className="tw-bg-white tw-rounded-xl tw-w-80 tw-h-[272px] tw-border tw-border-gray-300">
          <div className="tw-p-5">
            <img
              src={`http://localhost:5000/uploads/${props.data.image}`}
              alt=""
              className="tw-rounded-xl tw-w-[277px] tw-h-[174px]"
            />
          </div>
          <div className="tw-text-center tw-text-lg tw-font-medium">
            <p>{props.data.specialtiesName}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
export default RemoteExamination;
