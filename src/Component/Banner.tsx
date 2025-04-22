function Banner() {
  return (
    <>
      {/*Banner*/}
      <div className="tw-w-full tw-aspect-w-16 tw-aspect-h-9">
        {" "}
        {/* Tỉ lệ 16:9 */}
        <img
          src="./png/banner.png"
          alt="Banner"
          className="tw-w-full tw-h-full tw-object-cover"
        />
      </div>
    </>
  );
}
export default Banner;
