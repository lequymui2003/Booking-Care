import ListDoctor from "../data/dataDoctor";
import { Slide } from "react-slideshow-image";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useDoctor } from "../store/hooks";
import { ItemDoctor } from "../interface/itemDoctor";
import { getDoctors } from "../service/doctorService";
function Doctor() {
  const [doctor, setDoctor] = useState([]);
  const [doctorList, setDoctorList] = useState<ItemDoctor[]>([]);

  const fetchData = async () => {
    try {
      const res = await getDoctors();
      setDoctor(res);
    } catch (err) {
      console.error("Lỗi lấy danh sách user:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Cập nhật doctorList khi doctor thay đổi
  useEffect(() => {
    if (doctor && doctor.length > 0) {
      setDoctorList(doctor);
    }
  }, [doctor]);

  return (
    <>
      <div className="tw-w-full">
        {doctorList.length > 0 && (
          <Slide
            duration={3000}
            transitionDuration={500}
            // autoplay={true}
            infinite={true}
            arrows={true}
            slidesToScroll={1}
            responsive={[
              {
                breakpoint: 1024,
                settings: { slidesToShow: 4, slidesToScroll: 1 },
              },
              {
                breakpoint: 768,
                settings: { slidesToShow: 3, slidesToScroll: 2 },
              },
              {
                breakpoint: 480,
                settings: { slidesToShow: 2, slidesToScroll: 1 },
              },
            ]}
          >
            {doctorList.map((itemData: ItemDoctor, index: number) => (
              <div key={index} className="tw-flex tw-justify-around">
                <ElementDoctor data={itemData} index={index} />
              </div>
            ))}
          </Slide>
        )}
      </div>
    </>
  );
}
export function ElementDoctor(props: { index: number; data: ItemDoctor }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/doctorPage/${props.data.id}`);
  };
  return (
    <div key={props.index} onClick={handleClick}>
      <div className="tw-cursor-pointer tw-p-4 tw-flex tw-flex-col tw-gap-2 tw-w-[252px]">
        <div className="tw-m-auto">
          <img
            src={`http://localhost:5000/uploads/${props.data.image}`}
            alt=""
            className="tw-w-[178px] tw-rounded-full"
          />
        </div>
        <div className="tw-text-center ">
          <p className="tw-text-lg tw-font-medium">{props.data.fullName}</p>
          <p className="tw-text-base tw-text-gray-400">
            {props.data.expertise}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Doctor;
