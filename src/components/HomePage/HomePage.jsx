import React from 'react';

import styles from './HomePage.scss';
import reactLogo from 'images/react-logo.png';

const HomePage = (props) => (
  <div>
    <div className={`jumbo ${styles.HomePage__Jumbo}`}>
      <h1 className="page-title">Home Page</h1>
    </div>
    <div className="article">
      <h2 className="article-title">Lorem Ipsum</h2>
      <p className="paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim nostrum veritatis sed porro assumenda ab veniam ducimus doloribus excepturi expedita dolores deserunt quae recusandae laboriosam earum placeat, est, tempora laborum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur voluptate voluptas modi tempore nobis quas repellat voluptatibus quibusdam assumenda, dicta suscipit. Sit ea accusamus eum fugit, dignissimos molestias quaerat praesentium.</p>
      <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eos magni adipisusci suscipit saepe eaque dicta non a impedit quisquam distinctio officia, quas dignissimos ut eum ab modi nemo voluptates. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum esse minus asperiores quasi hic repudiandae sunt maiores! Voluptatum vel ab assumenda cupiditate dolorum dolore architecto doloribus maxime iste, itaque sapiente.</p>
      <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sequi minus sunt, nulla quisquam tenetur quam eius incidunt nesciunt obcaecati earum, nobis aliquam dolore. Consectetur, veniam similique? Ipsam, laboriosam laborum?</p>
      <img src={reactLogo} className={styles.HomePage__Image} alt=""/>
      <p className={styles.HomePage__Caption}>Image required in component by <strong>import ... from ...</strong><br />Jumbotron background required in scss stylesheet by <strong>background-image: url(...)</strong></p>
    </div>
  </div>
);


export default HomePage;
