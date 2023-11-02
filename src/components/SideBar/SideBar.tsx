import { Link } from 'react-router-dom';
import routes from '../../routes';

import styles from './SideBar.module.css';

import arrows from '../../assets/sidebar/arrows.svg';
import charts from '../../assets/sidebar/chart-bar.svg';
import office from '../../assets/sidebar/office-building.svg';
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

            <Link className={styles.itemWrapper} to={routes.companies}>
                <div className={styles.iconWrapper}>
                    <img alt='charts' src={office} className={styles.iconStyle} />
                </div>

                <p className={styles.itemTitle}>Companies</p>
            </Link>

            <div className={styles.itemWrapper}>
                <div className={styles.iconWrapper}>
                    <img alt='charts' src={arrows} className={styles.iconStyle} />
                </div>

                <p className={styles.itemTitle}>Conversions</p>
            </div>

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
