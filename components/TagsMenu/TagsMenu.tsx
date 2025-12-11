"use client";

import { useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";
import { tags } from "@/types/note";

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => {
            const tagUrl =
              tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`;
            return (
              <li className={css.menuItem} key={tag}>
                <Link href={tagUrl} className={css.menuLink} onClick={toggle}>
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
