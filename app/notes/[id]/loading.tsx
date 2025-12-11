import style from "@/app/loading.module.css";

const Loading = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.spinner}></div>
      <p className={style.text}>Loading, please wait...</p>
    </div>
  );
};

export default Loading;
