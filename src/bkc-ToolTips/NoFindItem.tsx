export const NoFindItem = ({ title }: { title: string }) => {
  return (
    <div className="tw-w-[200px] tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-text-primary tw-self-stretch">
      <img
        src={"/png/Search-rafiki.png"}
        className={`max-w-[250px] tw-h-auto tw-mb-[20px]`}
      />
      <h6>{title}</h6>
    </div>
  );
};
