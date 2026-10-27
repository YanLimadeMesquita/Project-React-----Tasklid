import { useState } from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

import styles from '../projects/ProjectForm.module.css'

function ServiceForm({ handleSubmit, btnText, projectData }) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        handleSubmit({
            ...projectData,
            services: [...projectData.services, service],
        })
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type='text'
                text='Nome do Serviço'
                name='name'
                placeholder='Insira o nome do serviço'
                handleOnChange={handleChange}
                required
                pattern=".*[A-Za-zÀ-ÿ].*"
                title="Use pelo menos uma letra"
            />
            <Input
                type='number'
                text='Custo do serviço'
                name='cost'
                placeholder='Insira o valor total'
                handleOnChange={handleChange}
                required
                min='5'
                step='5'
            />
            <Input
                type='text'
                text='Descrição do serviço'
                name='description'
                placeholder='Descreva o serviço'
                handleOnChange={handleChange}
                pattern=".*[A-Za-zÀ-ÿ].*"
                title="Use pelo menos uma letra"
            />

            <SubmitButton text={btnText} />
        </form>
    )
}

export default ServiceForm