import { ArrowLeft, Upload } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { personalityOptions } from '../data/cats'

const initialForm = {
  name: '',
  age: '',
  breed: '',
  gender: '',
  color: '',
  city: '',
  vaccinated: false,
  castrated: false,
  description: '',
}

export default function RegisterCatPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [imageName, setImageName] = useState(null)
  const [form, setForm] = useState(initialForm)
  const [personality, setPersonality] = useState([])

  function setField(field) {
    return (event) => {
      const value =
        event.target.type === 'checkbox' ? event.target.checked : event.target.value
      setForm((current) => ({ ...current, [field]: value }))
    }
  }

  function togglePersonality(tag) {
    setPersonality((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    )
  }

  function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)

    window.setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 900)
  }

  return (
    <section className="page-section page-section--form">
      <Link to="/" className="back-link">
        <ArrowLeft size={15} />
        Voltar
      </Link>

      <div className="page-heading">
        <span className="section-kicker">Novo perfil</span>
        <h1>Cadastrar gato para adocao</h1>
        <p>Preencha os dados do bichinho e publique um perfil bonito como no projeto de referencia.</p>
      </div>

      <div className="form-card">
        <form className="stack-form" onSubmit={handleSubmit}>
          <div>
            <label className="field-label">Foto do gato</label>
            <label className="upload-card">
              <Upload size={22} />
              <span>{imageName || 'Clique para enviar uma foto'}</span>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(event) =>
                  setImageName(event.target.files?.[0]?.name || null)
                }
              />
            </label>
          </div>

          <div className="form-grid form-grid--2">
            <label className="field">
              <span className="field-label">Nome</span>
              <input value={form.name} onChange={setField('name')} placeholder="Bigode" required />
            </label>
            <label className="field">
              <span className="field-label">Raca</span>
              <input value={form.breed} onChange={setField('breed')} placeholder="SRD, Persa..." required />
            </label>
          </div>

          <div className="form-grid form-grid--2">
            <label className="field">
              <span className="field-label">Idade</span>
              <input value={form.age} onChange={setField('age')} placeholder="2 anos" required />
            </label>
            <label className="field">
              <span className="field-label">Sexo</span>
              <select value={form.gender} onChange={setField('gender')} required>
                <option value="">Selecionar...</option>
                <option value="Macho">Macho</option>
                <option value="Femea">Femea</option>
              </select>
            </label>
          </div>

          <div className="form-grid form-grid--2">
            <label className="field">
              <span className="field-label">Cor</span>
              <input value={form.color} onChange={setField('color')} placeholder="Preto, Rajado..." required />
            </label>
            <label className="field">
              <span className="field-label">Cidade</span>
              <input value={form.city} onChange={setField('city')} placeholder="Sao Paulo, SP" required />
            </label>
          </div>

          <div className="checkbox-row">
            <label className="checkbox-pill">
              <input
                type="checkbox"
                checked={form.vaccinated}
                onChange={setField('vaccinated')}
              />
              <span>Vacinado</span>
            </label>
            <label className="checkbox-pill">
              <input
                type="checkbox"
                checked={form.castrated}
                onChange={setField('castrated')}
              />
              <span>Castrado</span>
            </label>
          </div>

          <div>
            <span className="field-label">Personalidade</span>
            <div className="chip-wrap">
              {personalityOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`chip${personality.includes(tag) ? ' chip--active' : ''}`}
                  onClick={() => togglePersonality(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <label className="field">
            <span className="field-label">Descricao</span>
            <textarea
              rows="5"
              value={form.description}
              onChange={setField('description')}
              placeholder="Conte a historia, rotina e personalidade do gato..."
              required
            />
          </label>

          <button type="submit" className="button button-primary button-block" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar gato'}
          </button>
        </form>
      </div>
    </section>
  )
}
