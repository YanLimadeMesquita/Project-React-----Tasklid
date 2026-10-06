import { useLocation } from "react-router-dom"

import { useState, useEffect } from "react"

import Message from "../layout/Message"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../projects/ProjectCard"
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
            setProjects(project.filter((project) => project.id !== id))
            setMessage('Projeto excluído com sucesso!')
        }).catch(err => console.log(err))

    }
    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos </h1>
                <LinkButton to="/newprojects" text="Criar Projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            <Container customClass="start">
                {project.length > 0 &&
                    project.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))
                }
                {!removeLoading && <Loading/> }
                {removeLoading && project.length === 0 && (
                    <p>Não há projetos registrados</p>
                )}
            </Container>
        </div>

    )
}

export default Projects