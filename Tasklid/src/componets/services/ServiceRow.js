import styles from './ServiceRow.module.css'

function formatMoney(value) {
    return Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })
}

function ServiceRow({ id, name, cost, description, handleRemove }) {
    return (
        <li className={styles.row}>
            <div className={styles.info}>
                <h4 className={styles.name}>{name}</h4>
                {description && <p className={styles.description}>{description}</p>}
            </div>

            <b className={styles.cost}>{formatMoney(cost)}</b>

            <button type="button" className={styles.remove} onClick={() => handleRemove(id, cost)}>
                Remover
            </button>
        </li>
    )
}

export default ServiceRow