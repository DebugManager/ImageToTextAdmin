import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { SideBar } from '../SideBar';
import styles from './Layout.module.css';

const Layout = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.rowWrapper}>
                <SideBar />
                <Outlet />
            </div>

            <div className={styles.footer}>
                <Footer />
            </div>

        </div>
    )
}

export default Layout;