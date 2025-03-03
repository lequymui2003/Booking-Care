import ListForYou from "../data/dataForYou";
function ForYou() {
  return (
    <>
      {ListForYou.map((ListForYou, index) => (
        <a key={index} href="">
          <div className="tw-p-4 tw-flex tw-flex-col tw-gap-2">
            <div>
              <img
                src={ListForYou.img}
                alt=""
                className="tw-w-[178px] tw-rounded-full"
              />
            </div>
            <div className="tw-text-center tw-text-lg tw-font-medium">
              <p>{ListForYou.title}</p>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}
export default ForYou;
