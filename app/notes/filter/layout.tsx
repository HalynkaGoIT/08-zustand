import css from "./LayoutNotes.module.css";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function NotesLayout({ children, sidebar }: Readonly<Props>) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
