import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  MapPin,
  MessageCircle,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { appRoutes, detailCards } from '../config/site'
import { cats } from '../data/cats'

export default function CatDetailPage() {
  const { id } = useParams()
  const cat = cats.find((item) => item.id === id)

  if (!cat) {
    return (
      <section className="page-section page-section--compact">
        <EmptyState
          title="Gato nao encontrado"
          description="O perfil que voce tentou abrir nao existe ou foi removido."
        >
          <Link to={appRoutes.home} className="button button-primary">
            <ArrowLeft className="button-icon" />
            Voltar para a lista
          </Link>
        </EmptyState>
      </section>
    )
  }

  return (
    <section className="page-section page-section--compact">
      <Link to={appRoutes.home} className="back-link">
        <ArrowLeft size={15} />
        Voltar para a lista
      </Link>

      <div className="detail-grid">
        <div className="detail-grid__media">
          <div className="detail-photo">
            <img src={cat.image} alt={`Foto de ${cat.name}`} />
          </div>
          <article className="detail-panel">
            <h2>Sobre {cat.name}</h2>
            <p>{cat.description}</p>
          </article>
        </div>

        <aside className="detail-grid__info">
          <div>
            <h1 className="detail-title">{cat.name}</h1>
            <p className="detail-subtitle">{cat.breed}</p>
          </div>

          <div className="detail-location">
            <MapPin size={14} />
            <span>{cat.city}</span>
          </div>

          <div className="detail-info-grid">
            {detailCards.map(({ key, label, icon: Icon }) => (
              <div key={key} className="detail-info-card">
                <span>
                  <Icon size={12} />
                  {label}
                </span>
                <strong>{cat[key]}</strong>
              </div>
            ))}
          </div>

          <div className="detail-badges">
            {cat.vaccinated ? (
              <span className="status-pill status-pill--green">
                <CheckCircle2 size={12} />
                Vacinado
              </span>
            ) : null}
            {cat.castrated ? (
              <span className="status-pill status-pill--blue">
                <CheckCircle2 size={12} />
                Castrado
              </span>
            ) : null}
          </div>

          <div className="tag-list">
            {cat.personality.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="detail-owner">
            <span>Responsavel pela adocao</span>
            <strong>{cat.ownerName}</strong>
          </div>

          <div className="detail-actions">
            <button type="button" className="button button-primary button-block">
              <MessageCircle className="button-icon" />
              Falar com o responsavel
            </button>
            <button type="button" className="button button-secondary button-block">
              <Heart className="button-icon" />
              Adicionar aos favoritos
            </button>
          </div>
        </aside>
      </div>
    </section>
  )
}
