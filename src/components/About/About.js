import React from "react";
import styles from "./About.module.css";
function About() {
  return (
    <div className={styles.about_container}>
      <div className={styles.about_left}>
        <div className={styles.about_heading}>About</div>
        <div className={styles.about_content}>
          Donec sed erat ut magna suscipit mattis. Aliquam erat volutpat. Morbi
          in orci risus. Donec pretium fringilla blandit. Etiam ut accumsan leo.
          Aliquam id mi quam. Vivamus dictum ut erat nec congue. Etiam facilisis
          lacus ut arcu vulputate, non pellentesque sem convallis. Proin tempus
          sapien nisl, nec varius risus tristique a. Etiam ligula lacus,
          ultricies at cursus id, fringilla nec nulla. Fusce pretium laoreet
          diam a mollis. In finibus purus sed tortor fringilla, eu luctus lorem
          sodales.Ut dignissim ante ac augue vulputate tristique. Mauris
          venenatis tincidunt nibh, sit amet fringilla augue malesuada a. Mauris
          a nunc congue, viverra lectus sed, imperdiet quam. Aenean tempor sem
          sed lorem ultricies lacinia. Sed sit amet tortor nibh. Donec
          condimentum posuere nunc, et hendrerit sapien dictum ut. Aliquam
          congue non purus eu suscipit. Integer eu dui tortor. Donec ut dolor
          vitae ipsum ultrices semper. Morbi imperdiet dictum urna nec blandit.
          Curabitur interdum diam ut porta vulputate. Fusce ultrices efficitur
          lectus et ornare. Morbi vulputate condimentum metus eu viverra.
        </div>
      </div>
      <div className={styles.about_image_wrapper}>
      </div>
    </div>
  );
}

export default About;
