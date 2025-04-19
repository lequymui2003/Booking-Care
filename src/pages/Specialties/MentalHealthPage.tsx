import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSpecialties } from "../../service/specialtiesService";
import { ItemSpecialty } from "../../interface/itemSpecialty";

function MentalHealthPage() {
  const [data, setData] = useState<ItemSpecialty[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getSpecialties();
      const filtered = res.filter(
        (item: ItemSpecialty) => item.checkSpecialties === 3
      );
      setData(filtered);
      setError(null);
    } catch (err) {
      console.error("Lỗi khi tải chuyên khoa:", err);
      setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="tw-max-w-6xl tw-mx-auto tw-h-full tw-mb-5">
        <div className="tw-flex tw-flex-col tw-gap-6 tw-px-4 tw-my-2">
          <div className="tw-flex tw-gap-1 tw-text-sm">
            <div className="tw-flex tw-gap-1 tw-text-sm tw-text-sky-600">
              <i className="fas fa-home"></i>
              <p>/</p>
              <p>Sức khỏe tinh thần</p>
            </div>
          </div>
          <div>
            <p>Sức khỏe tinh thần dành cho bạn</p>
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
            <SpecialtyElement data={item} index={index} />
          </div>
        ))
      )}

      <Footer />
    </>
  );
}

function SpecialtyElement(props: { index: number; data: ItemSpecialty }) {
  const navigate = useNavigate();
  const { data, index } = props;

  const handleClick = () => {
    navigate(`/specialtyDetail/${data.id}`);
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
            <p className="tw-text-lg tw-font-medium">{data.specialtiesName}</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default MentalHealthPage;
