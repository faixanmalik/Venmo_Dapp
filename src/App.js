import styles from './styles/App.module.css';
import Navbar from '../src/components/Navbar'

import './App.css';

function App() {
  return (
    <div className={styles.wrapper}>
      <Navbar/>
    </div>
  );
}

export default App;
