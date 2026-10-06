import { Link } from "react-router-dom"

import Container from "./Container"

import styles from "./NavBar.module.css"
import logo from '../../img/Costs-Logo.png'

function NavBar() {
    return (
        <nav className={styles.navbar}>
            <Container >
                <Link to="/">
                    <img src={logo} alt="Tasklid" className={styles.logo} />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/projects">Projects</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )

}

export default NavBar