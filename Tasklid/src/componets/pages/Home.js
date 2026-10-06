import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton'


function Home() {
    return(
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Tasklid</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newprojects" text="Criar Projeto"/>
            <img src={savings} alt='Tasklid'/>
        </section>
    )
}

export default Home