import React from "react";
import styles from "./index.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerSection}>
        <h3 className={styles.footerTitle}>Shop for people {`>`}`</h3>
      </div>
      <div className={styles.footerSection}>
        <h4 className={styles.footerSubtitle}>Moscow</h4>
        <a
          href="https://vk.com/id290996173"
          target="_blank"
          className={styles.footerLink}
        >
          DaniilBaderin@gmail.vk
        </a>
        <p className={styles.footerText}>+8-950-757-29-84</p>
        <p className={styles.footerText}>
          Unit 306, Metropolitan Wharf, 70 Wapping Wall, London E1W 3SS
        </p>
        <a href="#" className={styles.footerLink}>
          SEE ON MAP →
        </a>
      </div>
      <div className={styles.footerSection}>
        <h4 className={styles.footerSubtitle}>Buenos Aires</h4>
        <a
          href="mailto:buenosaires@weareimpero.com"
          className={styles.footerLink}
        >
          buenosaires@weareimpero.com
        </a>
        <p className={styles.footerText}>+8-950-797-45-76</p>
        <p className={styles.footerText}>
          Cabildo 1458 1st floor, Buenos Aires
        </p>
        <a href="#" className={styles.footerLink}>
          SEE ON MAP →
        </a>
      </div>
      <div className={styles.footerSection}>
        <p className={styles.footerText}>
          WANT TO BE THE SMARTEST IN YOUR OFFICE?
        </p>
        <a href="#" className={styles.footerLink}>
          SIGN UP FOR OUR NEWSLETTER →
        </a>
        <div className={styles.socialIcons}>
          <a href="#" className={styles.socialIcon}>
            Behance
          </a>
          <a href="#" className={styles.socialIcon}>
            Dribbble
          </a>
          <a href="#" className={styles.socialIcon}>
            Instagram
          </a>
          <a href="#" className={styles.socialIcon}>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};
