import { useState } from 'react'
import { Link, NavLink, useLocation } from "react-router-dom"

import styles from "./NavBar.module.css"
import logo from '../../img/Costs-Logo.png'

function NavBar() {

    const [menuOpen, setMenuOpen] = useState(false)
    const { pathname } = useLocation()
    const projectsActive = pathname.startsWith('/projects') || pathname.startsWith('/project/')
    const closeMenu = () => setMenuOpen(false)

    const linkClass = (isActive) =>
        `${styles.link} ${isActive ? styles.active : ''}`

    return (
        <header className={styles.navbar}>
            <div className={styles.inner}>
                <Link to="/" className={styles.brand} onClick={closeMenu}>
                    <img src={logo} alt="Logo Tasklid" className={styles.logo} />
                    <span className={styles.brand_name}>Tasklid</span>
                </Link>

                <button
                    type="button"
                    className={styles.menu_button}
                    aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                    aria-expanded={menuOpen}
                    aria-controls="main-menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        {menuOpen
                            ? <path d="M6 6l12 12M18 6L6 18" />
                            : <path d="M4 7h16M4 12h16M4 17h16" />}
                    </svg>
                </button>

                <nav
                    id="main-menu"
                    aria-label="Principal"
                    className={`${styles.menu} ${menuOpen ? styles.menu_open : ''}`}
                >
                    <ul className={styles.list}>
                        <li>
                            <NavLink to="/" end className={({ isActive }) => linkClass(isActive)} onClick={closeMenu}>
                                Início
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/projects" className={() => linkClass(projectsActive)} onClick={closeMenu}>
                                Projetos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive }) => linkClass(isActive)} onClick={closeMenu}>
                                Contato
                            </NavLink>
                        </li>
                    </ul>

                    <Link to="/newprojects" className={styles.cta} onClick={closeMenu}>
                        Novo projeto
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default NavBar