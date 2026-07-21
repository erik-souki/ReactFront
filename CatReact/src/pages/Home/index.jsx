import { ArrowRight, SearchX, Shield } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../../components/EmptyState'
import { appRoutes, homeSearchFields, homeSteps } from '../../config/site'
import heroImage from '../../assets/hero.png'
import { cats } from '../../data/cats'
import { matchesSearch } from '../../utils/form'
import CatCard from './components/CatCard'
import SearchField from './components/SearchField'
import './style.css'

export default function Home() {
  const [search, setSearch] = useState('')

  const filteredCats = useMemo(() => {
    return cats.filter((cat) => matchesSearch(cat, homeSearchFields, search))
  }, [search])

  const featuredCat = filteredCats[0] ?? cats[0]

  function handleSearchChange(event) {
    setSearch(event.target.value)
  }

  function clearSearch() {
    setSearch('')
  }

  return (
    <section className="home-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Adoção responsável</span>
          <h1>Todo gato merece um lar com amor</h1>
          <p>
            Descubra perfis revisados, entenda a rotina de cada gato e encontre um
            novo companheiro com mais clareza e acolhimento.
          </p>
          <div className="hero-actions">
            <a href="#gatos" className="button button-primary">
              Ver gatos disponíveis
              <ArrowRight className="button-icon" />
            </a>
            <Link to={`/${appRoutes.registerCat}`} className="button button-secondary">
              Colocar para adoção
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <span>Gatos esperando um lar</span>
              <strong>247</strong>
            </div>
            <div className="stat-card soft">
              <span>Perfis revisados</span>
              <strong>100%</strong>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-frame">
            <img src={heroImage} alt="Gato em destaque para adoção" />
          </div>
          <div className="floating-card">
            <Shield className="floating-icon" aria-hidden="true" />
            <div>
              <span>Rede confiável</span>
              <strong>adoção com acolhimento</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="processo" className="info-section">
        <div className="section-heading">
          <span className="section-kicker">Processo simples</span>
          <h2>Como funciona</h2>
        </div>
        <div className="steps-grid">
          {homeSteps.map(({ icon: Icon, title, description }) => (
            <article key={title} className="step-card">
              <div className="step-icon">
                <Icon aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="gatos" className="cats-section">
        <div className="section-heading row">
          <div>
            <span className="section-kicker">Perfis em destaque</span>
            <h2>Gatos disponíveis</h2>
          </div>
          <SearchField
            value={search}
            onChange={handleSearchChange}
            onClear={clearSearch}
            resultsCount={filteredCats.length}
          />
        </div>

        <article className="featured-banner" aria-label="Perfil em evidência">
          <div>
            <span className="section-kicker">Em evidência</span>
            <h3>{featuredCat.name}</h3>
            <p>{featuredCat.description}</p>
          </div>
          <Link to={`/gatos/${featuredCat.id}`} className="button button-secondary">
            Conhecer {featuredCat.name}
            <ArrowRight className="button-icon" />
          </Link>
        </article>

        {filteredCats.length > 0 ? (
          <div className="cats-grid">
            {filteredCats.map((cat) => (
              <CatCard key={cat.id} cat={cat} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nenhum gato encontrado"
            description="Tente outro nome, raça ou cidade. Você também pode limpar a busca para ver todos os perfis."
          >
            <button type="button" className="button button-secondary" onClick={clearSearch}>
              <SearchX className="button-icon" />
              Limpar busca
            </button>
          </EmptyState>
        )}
      </section>

      <section className="cta-section">
        <Shield className="cta-icon" aria-hidden="true" />
        <span className="section-kicker section-kicker-light">Pronto para publicar</span>
        <h2>Ajude outro gato a encontrar um lar seguro</h2>
        <p>
          Cadastre novos perfis com fotos, contexto e personalidade para acelerar o
          encontro entre tutores responsáveis e famílias adotantes.
        </p>
        <Link to={`/${appRoutes.register}`} className="button button-light">
          Criar conta
          <ArrowRight className="button-icon" />
        </Link>
      </section>
    </section>
  )
}
