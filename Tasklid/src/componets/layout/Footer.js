import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'

import styles from './Footer.module.css'
import logo from '../../img/Costs-Logo.png'

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <div className={styles.brand_row}>
                            <img src={logo} alt="" className={styles.logo} />
                            <strong>Tasklid</strong>
                        </div>
                        <p className={styles.tagline}>Margem de cada cliente, em tempo real.</p>
                    </div>

                    <nav aria-label="Rodapé" className={styles.links}>
                        <ul className={styles.nav_list}>
                            <li><Link to="/">Início</Link></li>
                            <li><Link to="/projects">Projetos</Link></li>
                            <li><Link to="/contact">Contato</Link></li>
                        </ul>

                        <ul className={styles.social_list}>
                            <li>
                                <a href="https://www.linkedin.com/in/SEU-USUARIO" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                    <FaLinkedin />
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/SEU-USUARIO" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                    <FaGithub />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/SEU-USUARIO" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <FaInstagram />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <p className={styles.copy_right}>
                    &copy; {new Date().getFullYear()} <span>Tasklid</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer