import { useContext } from 'react';
import { TransactionContext } from '../context/context';
import styles from '../styles/Navbar.module.css'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { shortenAddress } from '../utils/shortenAddress';

const Navbar = () => {

  const {connectWallet, currentAccount} = useContext(TransactionContext);

  return <nav className={styles.NavigationContainer}>
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="../assets/venmo-logo.svg" alt="Venmo Logo" className={styles.logoImage} />
      </div>

      {currentAccount ? (
        <div className={styles.actionsContainer}>
          <p>
            Hello, <span className={styles.accentColor}>
              {shortenAddress(currentAccount)}!👏
            </span>
          </p>
          <ChevronDownIcon className={styles.arrowDownIcon}/>
          <div className={styles.avatarContainer}>
            <img src="https://yeeqiang.me/avatar.jpeg" alt="avatar" className={styles.avatarImage} />
          </div>
        </div>
      ) : (
        <button className={styles.connectBtn} onClick={connectWallet}>Connect Wallet</button>
      ) }
    
    </div>
  </nav>
}

export default Navbar