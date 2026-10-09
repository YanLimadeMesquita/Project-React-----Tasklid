import { v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css'

import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Message from '../layout/Message'
import ProjectsForm from '../projects/ProjectsForm'
import ServiceForm from '../services/ServiceForm'
import ServiceRow from '../services/ServiceRow'

function formatMoney(value) {
    return Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })
}

function Project() {

    const { id } = useParams()

    const [project, setProject] = useState({})
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const [messageId, setMessageId] = useState(0)
    const [serviceFormKey, setServiceFormKey] = useState(0)

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

    function showMessage(text, kind) {
        setMessage(text)
        setType(kind)
        setMessageId((current) => current + 1)
    }

    function editPost(project) {

        if (project.budget < project.cost) {
            showMessage('O orçamento não pode ser menor do que o custo do projeto!', 'error')
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
                showMessage('Projeto atualizado com sucesso', 'success')
            })
            .catch((err) => console.log(err))
    }

    function createService(project) {

        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            showMessage('Orçamento ultrapassado, verifique o valor do serviço!', 'error')
            return false
        }

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
                setServiceFormKey((current) => current + 1)
                showMessage('Serviço adicionado com sucesso', 'success')
            })
            .catch((err) => console.log(err))
    }

    function removeService(id, cost) {
        const serviceUpdated = project.services.filter(
            (service) => service.id !== id
        )

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
                showMessage('Serviço removido com sucesso', 'success')
            })
            .catch((err) => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    if (!project.name) {
        return <Loading />
    }

    // números do resumo
    const budget = Number(project.budget) || 0
    const cost = Number(project.cost) || 0
    const available = budget - cost
    const percent = budget > 0 ? Math.round((cost / budget) * 100) : 0

    let tone = 'ok'
    if (percent >= 100) {
        tone = 'danger'
    } else if (percent >= 80) {
        tone = 'warn'
    }

    const categoryName = project.category.name

    return (
        <div className={styles.project_page}>
            <Link to="/projects" className={styles.back}>&larr; Voltar para projetos</Link>

            {message && <Message key={messageId} type={type} msg={message} />}

            <div className={styles.layout}>

                {/* ===== Coluna principal ===== */}
                <div className={styles.main_column}>
                    <div className={styles.header}>
                        <div>
                            <h1>{project.name}</h1>
                            <div className={styles.meta}>
                                <span>Cliente: <b>{project.client || 'Não informado'}</b></span>
                                <span className={styles.chip}>
                                    <span className={`${styles.dot} ${styles[categoryName.trim().toLowerCase()] || ''}`}></span>
                                    {categoryName}
                                </span>
                            </div>
                        </div>
                        <button type="button" className={styles.btn_outline} onClick={toggleProjectForm}>
                            {showProjectForm ? 'Fechar edição' : 'Editar projeto'}
                        </button>
                    </div>

                    {showProjectForm && (
                        <div className={`${styles.card} ${styles.pad}`}>
                            <h2 className={styles.card_heading}>Editar projeto</h2>
                            <ProjectsForm
                                handleSubmit={editPost}
                                btnText="Concluir edição"
                                projectData={project}
                            />
                        </div>
                    )}

                    <section className={styles.card}>
                        <h2 className={styles.card_title}>Serviços</h2>
                        {services.length > 0 ? (
                            <ul className={styles.service_list}>
                                {services.map((service) => (
                                    <ServiceRow
                                        key={service.id}
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        handleRemove={removeService}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <p className={styles.empty}>Nenhum serviço cadastrado ainda.</p>
                        )}
                    </section>
                </div>

                {/* ===== Coluna lateral ===== */}
                <aside className={styles.side_column}>
                    <div className={`${styles.card} ${styles.pad}`}>
                        <p className={styles.summary_label}>Disponível</p>
                        <b className={`${styles.available} ${styles[`text_${tone}`]}`}>
                            {formatMoney(available)}
                        </b>
                        <div className={styles.bar}>
                            <div
                                className={`${styles.bar_fill} ${styles[tone]}`}
                                style={{ width: `${Math.min(percent, 100)}%` }}
                            />
                        </div>
                        <div className={styles.summary_row}>
                            <span>Utilizado</span>
                            <b>{formatMoney(cost)}</b>
                        </div>
                        <div className={styles.summary_row}>
                            <span>Orçamento</span>
                            <b>{formatMoney(budget)}</b>
                        </div>
                    </div>

                    <div className={`${styles.card} ${styles.pad}`}>
                        <h2 className={styles.card_heading}>Adicionar serviço</h2>
                        <ServiceForm
                            key={serviceFormKey}
                            handleSubmit={createService}
                            btnText="Adicionar serviço"
                            projectData={project}
                        />
                    </div>
                </aside>

            </div>
        </div>
    )
}

export default Project