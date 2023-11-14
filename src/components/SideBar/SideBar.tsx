import { Link } from 'react-router-dom';
import routes from '../../routes';

import styles from './SideBar.module.css';

import building from '../../assets/sidebar/building-store.svg';
import charts from '../../assets/sidebar/chart-bar.svg';
import orders from '../../assets/sidebar/shopping-bag.svg';
import user from '../../assets/sidebar/user.svg';
import ticket from '../../assets/sidebar/ticket.svg';


const SideBar = () => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>MENU</p>
            <div className={styles.itemWrapper}>
                <div className={styles.iconWrapper}>
                    <img alt='charts' src={charts} className={styles.iconStyle} />
                </div>

                <p className={styles.itemTitle}>Dashboard</p>
            </div>

            <Link className={styles.itemWrapper} to={routes.users}>
                
                <div className={styles.iconWrapper}>
                    <img alt='charts' src={user} className={styles.iconStyle} />
                </div>

                <p className={styles.itemTitle}>Users</p>
                
            </Link>

            <Link className={styles.itemWrapper} to={routes.orders}>
                <div className={styles.iconWrapper}>
                    <img alt='charts' src={orders} className={styles.iconStyle} />
                </div>

                <p className={styles.itemTitle}>Orders</p>
            </Link>

            <Link to={routes.affiliates} className={styles.itemWrapper}>
                <div className={styles.iconWrapper}>
                    <img alt='charts' src={building} className={styles.iconStyle} />
                </div>

                <p className={styles.itemTitle}>Affiliates</p>
            </Link>

            <Link className={styles.itemWrapper} to={routes.tickets}>
                
                <div className={styles.iconWrapper}>
                    <img alt='charts' src={ticket} className={styles.iconStyle} />
                </div>

                <p className={styles.itemTitle}>Tickets</p>
                
            </Link>
        </div>
    )
}

export default SideBar;
