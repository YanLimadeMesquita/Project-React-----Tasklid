import { Link, useLocation } from "react-router-dom"

import { useState, useEffect } from "react"

import Message from "../layout/Message"
import ProjectRow from "../pages/ProjectRow"
import Loading from "../layout/Loading"

import styles from './Projects.module.css'

function Projects() {

    const [project, setProjects] = useState([])
    const [removeLoading, setremoveLoading] = useState(false)

    const location = useLocation()

    const [message, setMessage] = useState(
        location.state ? location.state.message : ''
    )

    useEffect(() => {
     setTimeout(() => {
         fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .then(data => {
                setProjects(data)
                setremoveLoading(true)
            })
            .catch((err) => console.log(err))
     }, 500)
    }, [])

    function removeProject(id) {

        const confirmDelete = window.confirm('Tem certeza que deseja excluir?')

        if (!confirmDelete) {
            return
        }

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        }).then(resp => resp.json())
        .then(() => {
            setProjects(project.filter((item) => item.id !== id))
            setMessage('Projeto excluído com sucesso!')
        }).catch(err => console.log(err))

    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <div>
                    <h1>Meus projetos</h1>
                    {removeLoading && project.length > 0 && (
                        <p>{project.length} {project.length === 1 ? 'projeto' : 'projetos'}</p>
                    )}
                </div>
                <Link to="/newprojects" className={styles.btn_primary}>
                    Novo projeto
                </Link>
            </div>

            {message && <Message type="success" msg={message} />}

            {project.length > 0 && (
                <div className={styles.table_card}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Projeto</th>
                                <th>Categoria</th>
                                <th>Orçamento</th>
                                <th>Utilizado</th>
                                <th><span className={styles.sr_only}>Ações</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {project.map((item) => (
                                <ProjectRow
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    client={item.client}
                                    budget={item.budget}
                                    cost={item.cost}
                                    category={item.category.name}
                                    handleRemove={removeProject}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!removeLoading && <Loading />}

            {removeLoading && project.length === 0 && (
                <p className={styles.empty}>
                    Nenhum projeto ainda. <Link to="/newprojects">Crie o primeiro</Link>.
                </p>
            )}
        </div>
    )
}

export default Projects