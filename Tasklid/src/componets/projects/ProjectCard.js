import styles from './ProjectCard.module.css'
import { Link } from 'react-router-dom'

function ProjectCard({id, name, budget, category, handleRemove}) {

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>

            <p className={styles.category_text}>
                <span>Orçamento:</span> R${budget}
            </p>

            <p className={styles.category}>
                <span className={`${styles[category.toLowerCase()]}`}></span>
                {category}
            </p>

            <div className={styles.project_actions}>
                <Link to={`/project/${id}`}>
                    <p className={styles.edit_btn}>Editar</p>
                </Link>
                <p className={styles.remove_btn} onClick={() => handleRemove(id)}>Remover</p>
            </div>
        </div>
    )
}

export default ProjectCard