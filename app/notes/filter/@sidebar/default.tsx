import Link from "next/link";
import css from "./SidebarNotes.module.css";
export default async function NotesSidebar() {
  return (
    <div className={css.sidebar}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/Todo`} className={css.menuLink}>
            Todo
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/Work`} className={css.menuLink}>
            Work
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/Personal`} className={css.menuLink}>
            Personal
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/Meeting`} className={css.menuLink}>
            Meeting
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/Shopping`} className={css.menuLink}>
            Shopping
          </Link>
        </li>
      </ul>
    </div>
  );
}
