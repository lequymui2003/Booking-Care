import ListHandbook from "../data/dataHandbook";
function Handbook() {
  return (
    <>
      {/* cẩm nang */}
      {ListHandbook.map((ListHandbook, index) => (
        <div key={index}>
          <a href="" className="tw-flex tw-flex-col tw-gap-3">
            <div>
              <img src={ListHandbook.img} alt="" className="tw-w-56" />
            </div>
            <div className="tw-w-56 tw-text-base tw-font-medium">
              <p>{ListHandbook.title}</p>
            </div>
          </a>
        </div>
      ))}
    </>
  );
}
export default Handbook;
