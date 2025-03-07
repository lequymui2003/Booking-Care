import ListForYou from "../data/dataForYou";
export class ItemForYou {
  public img: string;
  public title: string;

  constructor(img: string, title: string) {
    this.img = img;
    this.title = title;
  }
}
function ForYou() {
  const listForYou = ListForYou as ItemForYou[];
  return (
    <>
      {listForYou.map((itemData: ItemForYou, index: number) => (
        <ElementForYou data={itemData} index={index}></ElementForYou>
      ))}
    </>
  );
}

export function ElementForYou(props: { index: number; data: ItemForYou }) {
  return (
    <a key={props.index} href="">
      <div className="tw-p-4 tw-flex tw-flex-col tw-gap-2">
        <div className="tw-flex tw-justify-center">
          <img
            src={props.data.img}
            alt=""
            className="tw-w-[178px] tw-rounded-full"
          />
        </div>
        <div className="tw-text-center tw-text-lg tw-font-medium">
          <p>{props.data.title}</p>
        </div>
      </div>
    </a>
  );
}
export default ForYou;
