import { parse, v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'


import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectsForm from '../projects/ProjectsForm'
import ServiceForm from '../services/ServiceForm'
import ServiceCard from '../services/ServiceCard'

function Project() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then(resp => resp.json())
                .then(data => {
                    setProject(data)
                    setServices(data.services)

                })
                .catch((err) => console.log(err))
        }, 550)
    }, [id])

    function editPost(project) {

        setMessage('')

    if (project.budget < project.cost) {
        setMessage('O orçamento não pode ser menor do que o custo do projeto!')
        setType('error')
        return false
    
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(project),
    })
        .then(resp => resp.json())
        .then(data => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto Atualizado')
            setType('success')
        })
        .catch((err) => console.log(err))
}

    function createService(project) {

        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
            setType('error')
            project.services.pop()
            return false
        }

        // cria uma cópia nova em vez de mutar o estado direto
        const projectUpdated = {
            ...project,
            cost: newCost,
        }

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        })
            .then(resp => resp.json())
            .then(data => {
                setProject(data)
                setServices(data.services)
                setShowServiceForm(false)
                setMessage('Serviço adicionado com sucesso')
                setType('success')
            })
            .catch((err) => console.log(err))
    }

    function removeService(id, cost) {
        const serviceUpdated = project.services.filter(
            (service) => service.id !== id
        )

        // cria uma cópia nova em vez de mutar o estado direto
        const projectUpdated = {
            ...project,
            services: serviceUpdated,
            cost: parseFloat(project.cost) - parseFloat(cost),
        }

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        })
            .then(resp => resp.json())
            .then(data => {
                setProject(data)
                setServices(data.services)
                setMessage('Serviço Removido com Sucesso')
                setType('success')
            })
            .catch((err) => console.log(err))
    }
    
    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)

    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)

    }

    return <> {project.name ?
        <div className={styles.project_details}>
            <Container customClass="column">
                {message && <Message type={type} msg={message} />}
                <div className={styles.details_container}>
                    <h1>Projeto: {project.name}</h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>
                        {!showProjectForm ? 'Editar projeto' : 'Fechar Projeto'}
                    </button>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Categorias: </span> {project.category.name}
                            </p>
                            <p>
                                <span>Total de Orçamento: </span> R$ {project.budget}
                            </p>
                            <p>
                                <span>Total Utilizado: </span> R$ {project.cost}
                            </p>
                        </div>
                    ) : (
                        <div className={styles.project_info}>
                            <ProjectsForm
                                handleSubmit={editPost}
                                btnText="Concluir edição"
                                projectData={project}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.service_form_container}>
                    <h2>Adicione um Serviço</h2>
                    <button className={styles.btn} onClick={toggleServiceForm}>
                        {!showServiceForm ? 'Adicionar Serviço' : 'Fechar Projeto'}
                    </button>
                    <div className={styles.project_info}>
                        {showServiceForm && ( 
                            <ServiceForm
                                handleSubmit={createService}
                                btnText="Adicionar Serviço"
                                projectData={project}
                            />
                         )}
                    </div>
                </div>
                <h2>Serviços: </h2>
                    <Container customClass="start">
                         {services.length > 0 &&
                            services.map((services) => (
                                <ServiceCard 
                                    id={services.id}
                                    name={services.name}
                                    cost={services.cost}
                                    description={services.description}
                                    key={services.id}
                                    handleRemove={removeService}
                                />
                            ))
                            
                            }
                            {services.length === 0 && <p>Não Há Serviços Cadastrados.</p>}
                    </Container>
            </Container>
        </div>
        : (
            <Loading />
        )}
    </>


}

export default Project