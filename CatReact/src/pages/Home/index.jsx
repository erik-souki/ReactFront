import { ArrowRight, Heart, MapPin, Search, Shield } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../../components/EmptyState'
import { appRoutes, homeSearchFields, homeSteps } from '../../config/site'
import heroImage from '../../assets/hero.png'
import { cats } from '../../data/cats'
import { matchesSearch } from '../../utils/form'
import './style.css'

export default function Home() {
  const [search, setSearch] = useState('')

  const filteredCats = useMemo(() => {
    return cats.filter((cat) => matchesSearch(cat, homeSearchFields, search))
  }, [search])

  return (
    <section className="home-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Adocao responsavel</span>
          <h1>Todo gato merece um lar com amor</h1>
          <p>
            A mesma linguagem visual do projeto de referencia, agora trazida para
            JavaScript com uma base leve, organizada e pronta para evoluir.
          </p>
          <div className="hero-actions">
            <a href="#gatos" className="button button-primary">
              Ver gatos disponiveis
              <ArrowRight className="button-icon" />
            </a>
            <Link to={`/${appRoutes.registerCat}`} className="button button-secondary">
              Colocar para adocao
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
            <img src={heroImage} alt="Gato em destaque para adocao" />
          </div>
          <div className="floating-card">
            <Shield className="floating-icon" />
            <div>
              <span>Rede confiavel</span>
              <strong>adocao com acolhimento</strong>
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
                <Icon />
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
            <h2>Gatos disponiveis</h2>
          </div>
          <label className="search-field">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nome, raca ou cidade"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        {filteredCats.length ? (
          <div className="cats-grid">
            {filteredCats.map((cat) => (
              <Link key={cat.id} to={`/gatos/${cat.id}`} className="cat-card">
                <div className="cat-image-wrap">
                  <img src={cat.image} alt={`Foto de ${cat.name}`} className="cat-image" />
                  <button className="favorite-badge" type="button" aria-label={`Favoritar ${cat.name}`}>
                    <Heart />
                  </button>
                </div>
                <div className="cat-card-body">
                  <div className="cat-card-header">
                    <div>
                      <h3>{cat.name}</h3>
                      <p>
                        {cat.breed} • {cat.age}
                      </p>
                    </div>
                  </div>
                  <div className="cat-location">
                    <MapPin />
                    <span>{cat.city}</span>
                  </div>
                  <div className="tag-list">
                    {cat.personality.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nenhum gato encontrado"
            description="Tente buscar por outro nome, cidade ou raca."
          />
        )}
      </section>

      <section className="cta-section">
        <Shield className="cta-icon" />
        <span className="section-kicker section-kicker-light">Pronto para publicar</span>
        <h2>Seu projeto atual ja consegue receber a mesma identidade visual</h2>
        <p>
          A ponte entre TypeScript e JavaScript aqui e so de sintaxe. Os estilos,
          tokens visuais, imagens e componentes podem ser reaproveitados sem problema.
        </p>
        <Link to={`/${appRoutes.register}`} className="button button-light">
          Criar conta
          <ArrowRight className="button-icon" />
        </Link>
      </section>
    </section>
  )
}
