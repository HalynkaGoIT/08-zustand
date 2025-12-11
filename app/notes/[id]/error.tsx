"use client";
import css from "@/app/notes/filter/[...slug]/error.module.css";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorNotes = ({ error, reset }: Props) => {
  console.log("error", error);

  return (
    <div className={css.wrapper}>
      <div className={css.icon}>⚠️</div>
      <p className={css.message}>
        Could not fetch note details. {error.message}
      </p>
      <button className={css.button} onClick={() => reset()}>
        Reset
      </button>
    </div>
  );
};

export default ErrorNotes;
