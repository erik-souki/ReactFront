import { Heart, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CatCard({ cat }) {
  return (
    <Link to={`/gatos/${cat.id}`} className="cat-card" aria-label={`Ver perfil de ${cat.name}`}>
      <div className="cat-image-wrap">
        <img src={cat.image} alt={`Foto de ${cat.name}`} className="cat-image" />
        <span className="favorite-badge" aria-hidden="true">
          <Heart />
        </span>
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
          <MapPin aria-hidden="true" />
          <span>{cat.city}</span>
        </div>

        <div className="tag-list">
          {cat.personality.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <span className="cat-card-link">Ver detalhes</span>
      </div>
    </Link>
  )
}
