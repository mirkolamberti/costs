import styles from './Project.module.css'

import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {parse, v4 as uuidv4} from 'uuid'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {

    // id que vem pelo URL
    const {id} = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch(err => console.log)
        }, 1000);
    }, [id])

    function editPost(project) {
        setMessage('')
        // quando edito o form, já estou mudando os valores nas variáveis
        // preciso enviar o formulário para salvar as alterações

        // budget validation - para não enviar um valor maior do orçado
        if(project.budget < project.cost) {
            // mensagem de erro
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then((data) => {
                // altero o projeto com os dados que vieram alterados
                setProject(data)
                setShowProjectForm(false)
                // mensagem de salvatagem
                setMessage('Projeto atualizado!')
                setType('success')
            })
            .catch(err => console.log(err))
    }

    function createService(project) {
        setMessage('')
        // validação do último valor inserido serviço
        const lastService = project.services[project.services.length -1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        // add service cost to project total cost
        project.cost = newCost

        // update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(
                // vou ter os dados sendo retornados
                (resp) => resp.json()
            )
            .then((data) => {
                    // exibir os serviços
                    //console.log(data)
                    setShowServiceForm(false)
                }
            )
            .catch(err => console.log(err))
    }

    function removeService() {
        // deleto o serviço
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return(
        <>
        {project.nomePrj ? (
            <div className={styles.project_details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.nomePrj}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> R$ {project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span> R$ {project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm 
                                    handleSubmit={editPost} 
                                    btnText="Concluir edição" 
                                    projectData={project}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                        <h2>Adicione um serviço:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
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
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        {services.length > 0 && 
                            services.map((service) => (
                                <ServiceCard 
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.key}
                                    handleRemove={removeService}
                                />
                            ))
                        }
                        {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                    </Container>
                </Container>
            </div>
        ): (
            <Loading />
        )}
        </>
    )
}

export default Project