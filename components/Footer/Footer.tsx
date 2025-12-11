import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Halyna Obykhvost</p>
          <p>
            Contact us:{" "}
            <a href="mailto:dev.mindvision@gmail.com" className={css.email}>
              dev.mindvision@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
