import { Link } from 'react-router-dom'

import styles from './Home.module.css'

function Home() {
    return (
        <>
            {/* HERO */}
            <section className={styles.hero_section}>
                <div className={styles.hero_content}>
                    <div className={styles.hero_text}>
                        <span className={styles.badge}>Feito para agências pequenas</span>
                        <h1>Veja a margem de cada cliente antes do orçamento estourar</h1>
                        <p className={styles.subtitle}>
                            O Tasklid mostra o que foi vendido, o que já foi gasto e o que sobra —
                            por projeto, por cliente, sem precisar abrir uma planilha.
                        </p>
                        <div className={styles.cta_group}>
                            <Link to="/newprojects" className={styles.btn_primary}>
                                Criar meu primeiro projeto
                            </Link>
                            <a href="#como-funciona" className={styles.btn_secondary}>
                                Ver como funciona
                            </a>
                        </div>
                        <p className={styles.microcopy}>Sem planilha. Sem surpresa no fim do mês.</p>
                    </div>

                    <div className={styles.hero_visual}>
                        <p className={styles.preview_title}>Projetos ativos</p>

                        <PreviewRow
                            name="Novo site — Loja Marin"
                            percent={62}
                            tone="ok"
                            detail="R$ 1.860 usados de R$ 3.000"
                        />
                        <PreviewRow
                            name="Rebranding — Café Nômade"
                            percent={88}
                            tone="warn"
                            detail="R$ 2.640 usados de R$ 3.000 — perto do limite"
                        />
                        <PreviewRow
                            name="Tráfego pago — Dentalis"
                            percent={100}
                            tone="danger"
                            detail="Orçamento estourado em R$ 120"
                        />
                    </div>
                </div>
            </section>

            {/* PROBLEMA */}
            <section className={styles.problem_section}>
                <div className={styles.section_intro}>
                    <h2>A planilha aguenta até certo ponto</h2>
                    <p>Pra quem cuida de vários clientes ao mesmo tempo, o controle manual vira o próprio risco.</p>
                </div>
                <div className={styles.problem_grid}>
                    <ProblemCard
                        icon={<WarningIcon />}
                        title="A planilha não avisa"
                        text="Você só descobre o estouro de orçamento quando já é tarde pra reagir."
                    />
                    <ProblemCard
                        icon={<TrendIcon />}
                        title="Margem invisível"
                        text="Fica difícil saber de cabeça quanto cada cliente realmente está dando de lucro."
                    />
                    <ProblemCard
                        icon={<StackIcon />}
                        title="Dado espalhado"
                        text="Orçamento numa aba, gasto em outra — nada conversa entre si."
                    />
                </div>
            </section>

            {/* RECURSOS */}
            <section id="recursos" className={styles.features_section}>
                <div className={styles.section_intro}>
                    <h2>Feito pra quem gerencia vários clientes</h2>
                    <p>Três recursos pensados pra dor real de agência pequena, não mais um gerenciador de tarefas genérico.</p>
                </div>
                <div className={styles.features_grid}>
                    <FeatureCard
                        tone="neutral"
                        icon={<TrendIcon />}
                        title="Margem em tempo real"
                        text="Compare o que você vendeu com o custo real do projeto, cliente por cliente, sempre atualizado."
                    />
                    <FeatureCard
                        tone="danger"
                        icon={<WarningIcon />}
                        title="Alerta de estouro"
                        text="Aviso automático quando um projeto passa de 80% do orçamento — antes de virar prejuízo."
                    />
                    <FeatureCard
                        tone="ok"
                        icon={<BarsIcon />}
                        title="Visão consolidada"
                        text="Veja de uma vez quanto está entrando em todos os projetos ativos da agência."
                    />
                </div>
            </section>

            {/* COMO FUNCIONA */}
            <section id="como-funciona" className={styles.how_section}>
                <div className={styles.section_intro}>
                    <h2>Como funciona</h2>
                    <p>Três passos, sem curva de aprendizado.</p>
                </div>
                <div className={styles.how_grid}>
                    <HowStep number="01" title="Cadastre o projeto" text="Nome, cliente e orçamento vendido — leva menos de um minuto." />
                    <HowStep number="02" title="Lance os gastos" text="Registre cada serviço ou custo conforme eles acontecem." />
                    <HowStep number="03" title="Acompanhe a margem" text="Veja o que sobra de cada cliente sem abrir planilha nenhuma." />
                </div>
            </section>

            {/* CTA FINAL */}
            <section className={styles.cta_band}>
                <div className={styles.cta_band_inner}>
                    <h2>Pare de descobrir o estouro de orçamento depois que já aconteceu</h2>
                    <Link to="/newprojects" className={styles.btn_primary}>
                        Começar agora 
                    </Link>
                </div>
            </section>
        </>
    )
}

function PreviewRow({ name, percent, tone, detail }) {
    return (
        <div className={styles.preview_row}>
            <div className={styles.preview_row_top}>
                <span>{name}</span>
                <span className={`${styles.preview_percent} ${styles[tone]}`}>{percent}%</span>
            </div>
            <div className={styles.preview_bar}>
                <div
                    className={`${styles.preview_bar_fill} ${styles[tone]}`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                />
            </div>
            <p className={`${styles.preview_detail} ${tone === 'danger' ? styles.danger_text : ''}`}>{detail}</p>
        </div>
    )
}

function ProblemCard({ icon, title, text }) {
    return (
        <div className={styles.problem_card}>
            {icon}
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
}

function FeatureCard({ tone, icon, title, text }) {
    return (
        <div className={styles.feature_card}>
            <div className={`${styles.feature_icon} ${styles[tone]}`}>{icon}</div>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
}

function HowStep({ number, title, text }) {
    return (
        <div className={styles.how_step}>
            <span className={styles.how_number}>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
}

function WarningIcon() {
    return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B6472B" strokeWidth="2">
            <path d="M12 9v4M12 17h.01M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        </svg>
    )
}

function TrendIcon() {
    return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2F6B3A" strokeWidth="2">
            <path d="M3 12h4l3 8 4-16 3 8h4" />
        </svg>
    )
}

function StackIcon() {
    return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B6472B" strokeWidth="2">
            <rect x="3" y="4" width="8" height="7" rx="1.5" />
            <rect x="13" y="4" width="8" height="16" rx="1.5" />
            <rect x="3" y="14" width="8" height="6" rx="1.5" />
        </svg>
    )
}

function BarsIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2F6B3A" strokeWidth="2">
            <rect x="3" y="11" width="4" height="9" rx="1" />
            <rect x="10" y="6" width="4" height="14" rx="1" />
            <rect x="17" y="3" width="4" height="17" rx="1" />
        </svg>
    )
}

export default Home