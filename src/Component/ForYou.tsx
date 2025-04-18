import { useNavigate } from "react-router-dom";
import ListForYou from "../data/dataForYou";
export class ItemForYou {
  public id: number;
  public img: string;
  public title: string;

  constructor(img: string, title: string, id: number) {
    this.id =id
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
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/listInfo/${props.data.id}`);
  };
  return (
    <div key={props.index} onClick={handleClick}>
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
    </div>
  );
}
export default ForYou;
