import Link from "next/link";
import styles from "./header.module.css"
import logo from "../img/FOURTEEN.Logo.POSITIEF_Green_RGB_v1.png"

const Header: React.FC = () => {
    return (
        <div className={styles.container}>

        
        <div className={styles.content__container}>
            <div className={styles.logo}>
                <Link className={styles.linkTitle}href={"/"}>
                    {/* <p className={styles.title}>Fourteen</p> */}
                    <h1 className={styles.title}>Fourteen</h1>
                    {/* <img src="/FOURTEEN.Logo.POSITIEF_Green_RGB_v1.png" alt="Logo" style={{ width: '200px', height: 'auto' }} /> */}
                </Link>
            </div>
            <div className={styles.authButtons}>
                <Link className={styles.btn__login} href={'/login'}>Login</Link>
                <Link className={styles.btn__auth} href={'/register'}>Register</Link>
            </div>
        </div>
        </div>
    )

}

export default Header;