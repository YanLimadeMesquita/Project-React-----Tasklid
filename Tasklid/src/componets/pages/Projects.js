import { Link, useLocation } from "react-router-dom"

import { useState, useEffect } from "react"

import Message from "../layout/Message"
import ProjectRow from "../pages/ProjectRow"
import Loading from "../layout/Loading"
import checkResponse from "../../utils/checkResponse"

import styles from './Projects.module.css'

function Projects() {

    const [project, setProjects] = useState([])
    const [removeLoading, setremoveLoading] = useState(false)
    const [loadError, setLoadError] = useState(false)

    const location = useLocation()

    const [message, setMessage] = useState(
        location.state ? location.state.message : ''
    )
    const [type, setType] = useState('success')
    const [messageId, setMessageId] = useState(0)

    useEffect(() => {
     setTimeout(() => {
         fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(checkResponse)
            .then(data => {
                setProjects(data)
                setremoveLoading(true)
            })
            .catch((err) => {
                console.log(err)
                setLoadError(true)
                setremoveLoading(true)
            })
     }, 500)
    }, [])

    function showMessage(text, kind) {
        setMessage(text)
        setType(kind)
        setMessageId((current) => current + 1)
    }

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
        })
            .then(checkResponse)
            .then(() => {
                setProjects(project.filter((item) => item.id !== id))
                showMessage('Projeto excluído com sucesso!', 'success')
            })
            .catch((err) => {
                console.log(err)
                showMessage('Não foi possível excluir o projeto. Verifique se o servidor está rodando.', 'error')
            })

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

            {message && <Message key={messageId} type={type} msg={message} />}

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
                                    category={item.category?.name || 'Sem categoria'}
                                    handleRemove={removeProject}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!removeLoading && <Loading />}

            {loadError && (
                <p className={styles.empty}>
                    Não foi possível carregar os projetos. Verifique se o servidor está rodando e recarregue a página.
                </p>
            )}

            {removeLoading && !loadError && project.length === 0 && (
                <p className={styles.empty}>
                    Nenhum projeto ainda. <Link to="/newprojects">Crie o primeiro</Link>.
                </p>
            )}
        </div>
    )
}

export default Projects