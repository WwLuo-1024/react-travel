import React from 'react';
import styles from './App.module.css';
import { Header, Footer} from "./components"



function App() {
  return (
    <div className={styles.App}>
      <Header />
      {/*页面内容 content*/}
      <div className={styles['page-content']}>

      </div>
      <Footer />
    </div>
  );
}

export default App;

