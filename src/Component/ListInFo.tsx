import Header from "./Header";
import Footer from "./Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ItemClinic } from "../interface/listClinic";
import { getClinics } from "../service/clinicService";
import { getDoctors } from "../service/doctorService";
import { getSpecialties } from "../service/specialtiesService";

// Import các interface cho từng loại dữ liệu
import { ItemDoctor } from "../interface/itemDoctor";
import { ItemSpecialty } from "../interface/itemSpecialty";

function ListInfo() {
  const { id } = useParams();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  let name = "";
  let type = "";

  if (id === "1") {
    name = "Cơ sở y tế";
    type = "clinic";
  } else if (id === "2") {
    name = "Bác sĩ";
    type = "doctor";
  } else if (id === "3") {
    name = "Chuyên khoa";
    type = "specialty";
  } else if (id === "4") {
    name = "Bài viết";
    type = "article";
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let result = [];

      if (type === "clinic") {
        result = await getClinics();
      } else if (type === "doctor") {
        result = await getDoctors();
      } else if (type === "specialty") {
        result = await getSpecialties();
      }

      setData(result);
      setError(null);
    } catch (err) {
      console.error(`Lỗi lấy danh sách ${name}:`, err);
      setError(`Không thể tải dữ liệu ${name}. Vui lòng thử lại sau.`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); // Gọi lại khi id thay đổi

  return (
    <>
      <Header />
      <div className="tw-max-w-6xl tw-mx-auto tw-h-full tw-mb-5">
        <div className="tw-flex tw-flex-col tw-gap-6 tw-px-4 tw-my-2">
          <div className="tw-flex tw-gap-1 tw-text-sm">
            <div className="tw-flex tw-gap-1 tw-text-sm tw-text-sky-600">
              <div>
                <i className="fas fa-home"></i>
              </div>
              <div>
                <p>/</p>
              </div>
              <div>
                <p>{name}</p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <p>{name} dành cho bạn</p>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="tw-max-w-6xl tw-mx-auto tw-text-center tw-py-8">
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : error ? (
        <div className="tw-max-w-6xl tw-mx-auto tw-text-center tw-py-8 tw-text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        data.map((item, index) => (
          <div
            key={index}
            className="tw-max-w-6xl tw-mx-auto tw-h-full tw-mb-5"
          >
            <Element data={item} type={type} index={index} />
          </div>
        ))
      )}

      <Footer />
    </>
  );
}

export function Element(props: { index: number; data: any; type: string }) {
  const navigate = useNavigate();
  const { data, type, index } = props;

  const handleClick = () => {
    if (type === "clinic") {
      navigate(`/clinicDetail/${data.id}`);
    } else if (type === "doctor") {
      navigate(`/doctorPage/${data.id}`);
    } else if (type === "specialty") {
      navigate(`/specialtyDetail/${data.id}`);
    }
  };

  // Xác định tiêu đề hiển thị dựa vào loại dữ liệu
  const getTitle = () => {
    if (type === "clinic") {
      return data.clinicName;
    } else if (type === "doctor") {
      return data.fullName;
    } else if (type === "specialty") {
      return data.specialtiesName;
    }
    return "";
  };

  return (
    <div key={index} onClick={handleClick} className="tw-cursor-pointer">
      <div className="tw-flex tw-flex-col tw-gap-6 tw-p-4 tw-my-2">
        <div className="tw-flex">
          <div className="tw-w-[20%]">
            <div className="tw-w-[85%]">
              <img
                src={`http://localhost:5000/uploads/${data.image}`}
                alt=""
                className="tw-w-[100%] tw-h-auto tw-max-h-[150px] tw-object-contain"
              />
            </div>
          </div>
          <div className="tw-flex tw-flex-col tw-justify-center">
            <p className="tw-text-lg tw-font-medium">{getTitle()}</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default ListInfo;
