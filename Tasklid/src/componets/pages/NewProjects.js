import { useNavigate } from 'react-router-dom'

import ProjectsForm from '../projects/ProjectsForm'
import styles from './NewProjects.module.css'

function NewProjects() {

    const navigate = useNavigate()

    function createPost(project) {

        // initialize cost and services
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),

        }).then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                // redirect
                navigate('/projects', { state: { message: "Projeto Criado com Sucesso!" } })
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para posteriormente adicionar os serviços</p>
            <ProjectsForm 
                handleSubmit={createPost}
                btnText="Criar Projeto" 
            />
        </div>
    )
}

export default NewProjects