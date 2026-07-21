import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { appRoutes, detailCards } from '../config/site'
import { cats } from '../data/cats'

function getReadinessCopy(cat) {
  if (cat.vaccinated && cat.castrated) {
    return 'Perfil pronto para uma adoção com cuidados básicos em dia.'
  }

  if (cat.vaccinated || cat.castrated) {
    return 'Parte dos cuidados já foi realizada. Vale combinar os próximos passos com o responsável.'
  }

  return 'Converse com o responsável para entender os cuidados de saúde ainda pendentes.'
}

export default function CatDetailPage() {
  const { id } = useParams()
  const cat = cats.find((item) => item.id === id)

  if (!cat) {
    return (
      <section className="page-section page-section--compact">
        <EmptyState
          title="Gato não encontrado"
          description="O perfil que você tentou abrir não existe, foi removido ou ainda não está disponível."
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

          <article className="detail-panel detail-panel--highlight">
            <span className="section-kicker">Sobre {cat.name}</span>
            <h2>Um resumo rápido para quem está conhecendo o perfil</h2>
            <p>{cat.description}</p>
          </article>
        </div>

        <aside className="detail-grid__info">
          <div className="detail-hero-card">
            <div>
              <h1 className="detail-title">{cat.name}</h1>
              <p className="detail-subtitle">{cat.breed}</p>
            </div>

            <div className="detail-location">
              <MapPin size={14} aria-hidden="true" />
              <span>{cat.city}</span>
            </div>

            <div className="detail-badges">
              {cat.vaccinated ? (
                <span className="status-pill status-pill--green">
                  <CheckCircle2 size={12} aria-hidden="true" />
                  Vacinado
                </span>
              ) : null}
              {cat.castrated ? (
                <span className="status-pill status-pill--blue">
                  <CheckCircle2 size={12} aria-hidden="true" />
                  Castrado
                </span>
              ) : null}
            </div>

            <div className="detail-actions">
              <button type="button" className="button button-primary button-block">
                <MessageCircle className="button-icon" />
                Tenho interesse na adoção
              </button>
              <button type="button" className="button button-secondary button-block">
                <Heart className="button-icon" />
                Salvar perfil
              </button>
            </div>
          </div>

          <div className="detail-info-grid">
            {detailCards.map(({ key, label, icon: Icon }) => (
              <div key={key} className="detail-info-card">
                <span>
                  <Icon size={12} aria-hidden="true" />
                  {label}
                </span>
                <strong>{cat[key]}</strong>
              </div>
            ))}
          </div>

          <article className="detail-note">
            <span className="detail-note__label">
              <ShieldCheck size={14} aria-hidden="true" />
              Situação do perfil
            </span>
            <p>{getReadinessCopy(cat)}</p>
          </article>

          <article className="detail-panel">
            <h2>Personalidade</h2>
            <p>Essas características ajudam a imaginar como pode ser a convivência no dia a dia.</p>
            <div className="tag-list">
              {cat.personality.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <div className="detail-owner">
            <span>Responsável pela adoção</span>
            <strong>{cat.ownerName}</strong>
            <p>Use o botão principal para iniciar a conversa e alinhar rotina, adaptação e próximos passos.</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
