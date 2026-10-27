import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Message from '../layout/Message'
import ProjectsForm from '../projects/ProjectsForm'
import checkResponse from '../../utils/checkResponse'
import styles from './NewProjects.module.css'

function NewProjects() {

    const navigate = useNavigate()

    const [message, setMessage] = useState('')
    const [messageId, setMessageId] = useState(0)

    function createPost(project) {

        const newProject = {
            ...project,
            cost: 0,
            services: [],
        }

        fetch("http://localhost:5000/projects", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newProject),

        })
            .then(checkResponse)
            .then(() => {
                navigate('/projects', { state: { message: "Projeto Criado com Sucesso!" } })
            })
            .catch((err) => {
                console.log(err)
                setMessage('Não foi possível criar o projeto. Verifique se o servidor está rodando.')
                setMessageId((current) => current + 1)
            })
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para posteriormente adicionar os serviços</p>

            {message && <Message key={messageId} type="error" msg={message} />}

            <ProjectsForm 
                handleSubmit={createPost}
                btnText="Criar Projeto" 
            />
        </div>
    )
}

export default NewProjects