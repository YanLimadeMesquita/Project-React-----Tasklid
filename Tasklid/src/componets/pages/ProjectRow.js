import { Link } from 'react-router-dom'

import styles from './ProjectRow.module.css'

function formatMoney(value) {
    return Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })
}

function ProjectRow({ id, name, client, budget, cost, category, handleRemove }) {

    const budgetNumber = Number(budget) || 0
    const costNumber = Number(cost) || 0

    const percent = budgetNumber > 0 ? Math.round((costNumber / budgetNumber) * 100) : 0

    // cor da barra: verde (ok), amarelo (perto do limite) ou vermelho (estourou)
    let tone = 'ok'
    if (percent >= 100) {
        tone = 'danger'
    } else if (percent >= 80) {
        tone = 'warn'
    }

    return (
        <tr className={styles.row}>
            <td className={styles.cell}>
                <h4 className={styles.name}>{name}</h4>
                <p className={styles.client}>{client || 'Sem cliente'}</p>
            </td>

            <td className={styles.cell}>
                <span className={styles.chip}>
                    <span className={`${styles.dot} ${styles[category.trim().toLowerCase()] || ''}`}></span>
                    {category}
                </span>
            </td>

            <td className={`${styles.cell} ${styles.value}`}>
                {formatMoney(budget)}
            </td>

            <td className={`${styles.cell} ${styles.progress}`}>
                <div className={styles.bar}>
                    <div
                        className={`${styles.bar_fill} ${styles[tone]}`}
                        style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                </div>
                <p className={`${styles.usage} ${tone === 'danger' ? styles.usage_danger : ''}`}>
                    {formatMoney(cost)} · {percent}%
                </p>
            </td>

            <td className={styles.cell}>
                <div className={styles.actions}>
                    <Link to={`/project/${id}`} className={styles.edit}>Editar</Link>
                    <button type="button" className={styles.remove} onClick={() => handleRemove(id)}>
                        Remover
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default ProjectRow