import styles from './styles/App.module.css';
import Navbar from '../src/components/Navbar'
import TransactionForm from './components/transaction/TransactionForm'
import ActivityCard from './components/activity/ActivityCard'


import './App.css';

function App() {
  return (
    <div className={styles.wrapper}>
      <Navbar/>
      <main className={styles.mainContainer}>
        <div className={styles.activityContainer}>
          {/* Todo Activity */}
          <ActivityCard />
        </div>
        <div className={styles.sideContainer}>
          <TransactionForm />
        </div>
      </main>
    </div>
    );
  }

  export default App;
