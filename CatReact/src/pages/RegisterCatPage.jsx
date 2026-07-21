import { ArrowLeft, ImagePlus, Upload } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { appRoutes } from '../config/site'
import { personalityOptions } from '../data/cats'
import { createFieldSetter, toggleArrayValue } from '../utils/form'

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

function getCatErrors(form, personality, imageName) {
  const errors = {}

  if (!imageName) {
    errors.image = 'Adicione uma foto para destacar o perfil.'
  }

  if (!form.name.trim()) {
    errors.name = 'Informe o nome do gato.'
  }

  if (!form.breed.trim()) {
    errors.breed = 'Informe a raça ou sinalize que é SRD.'
  }

  if (!form.age.trim()) {
    errors.age = 'Informe a idade aproximada.'
  }

  if (!form.gender) {
    errors.gender = 'Selecione o sexo do gato.'
  }

  if (!form.color.trim()) {
    errors.color = 'Descreva a cor predominante.'
  }

  if (!form.city.trim()) {
    errors.city = 'Informe a cidade onde o gato está.'
  }

  if (personality.length === 0) {
    errors.personality = 'Selecione pelo menos uma característica.'
  }

  if (!form.description.trim()) {
    errors.description = 'Conte um pouco sobre a rotina e o temperamento.'
  } else if (form.description.trim().length < 30) {
    errors.description = 'Escreva pelo menos 30 caracteres para dar contexto a quem vai adotar.'
  }

  return errors
}

export default function RegisterCatPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [imageName, setImageName] = useState('')
  const [form, setForm] = useState(initialForm)
  const [personality, setPersonality] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const setField = createFieldSetter(setForm)

  const errors = useMemo(
    () => getCatErrors(form, personality, imageName),
    [form, personality, imageName],
  )

  function togglePersonality(tag) {
    setPersonality((current) => toggleArrayValue(current, tag))
  }

  function handleImageChange(event) {
    setImageName(event.target.files?.[0]?.name || '')
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)

    if (Object.keys(errors).length > 0) {
      return
    }

    setLoading(true)

    window.setTimeout(() => {
      setLoading(false)
      navigate(appRoutes.home)
    }, 900)
  }

  const visibleErrors = submitted ? errors : {}
  const descriptionLength = form.description.trim().length

  return (
    <section className="page-section page-section--form">
      <Link to={appRoutes.home} className="back-link">
        <ArrowLeft size={15} />
        Voltar
      </Link>

      <div className="page-heading">
        <span className="section-kicker">Novo perfil</span>
        <h1>Cadastrar gato para adoção</h1>
        <p>
          Preencha os dados principais do bichinho, destaque a personalidade e publique
          um perfil mais completo para facilitar o match com uma nova família.
        </p>
      </div>

      <div className="form-card">
        <form className="stack-form" onSubmit={handleSubmit} noValidate>
          <section className="form-section">
            <div className="form-section__header">
              <h2>Apresentação</h2>
              <p>Uma boa foto e uma descrição objetiva ajudam o perfil a chamar atenção.</p>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="cat-image">
                Foto do gato
              </label>
              <label className={`upload-card${imageName ? ' upload-card--filled' : ''}`} htmlFor="cat-image">
                <span className="upload-card__icon">
                  {imageName ? <ImagePlus size={22} aria-hidden="true" /> : <Upload size={22} aria-hidden="true" />}
                </span>
                <strong>{imageName || 'Clique para enviar uma foto'}</strong>
                <span>Formatos aceitos: JPG, PNG ou WEBP.</span>
              </label>
              <input
                id="cat-image"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleImageChange}
              />
              {visibleErrors.image ? (
                <p className="field-error" role="alert">
                  {visibleErrors.image}
                </p>
              ) : null}
            </div>

            <div className="form-grid form-grid--2">
              <div className="field">
                <label className="field-label" htmlFor="cat-name">
                  Nome
                </label>
                <input
                  id="cat-name"
                  value={form.name}
                  onChange={setField('name')}
                  placeholder="Bigode"
                  aria-invalid={visibleErrors.name ? 'true' : 'false'}
                  required
                />
                {visibleErrors.name ? (
                  <p className="field-error" role="alert">
                    {visibleErrors.name}
                  </p>
                ) : null}
              </div>
              <div className="field">
                <label className="field-label" htmlFor="cat-breed">
                  Raça
                </label>
                <input
                  id="cat-breed"
                  value={form.breed}
                  onChange={setField('breed')}
                  placeholder="SRD, Persa, Siamês..."
                  aria-invalid={visibleErrors.breed ? 'true' : 'false'}
                  required
                />
                {visibleErrors.breed ? (
                  <p className="field-error" role="alert">
                    {visibleErrors.breed}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="cat-description">
                Descrição
              </label>
              <textarea
                id="cat-description"
                rows="5"
                value={form.description}
                onChange={setField('description')}
                placeholder="Conte a história, a rotina e a personalidade do gato..."
                aria-invalid={visibleErrors.description ? 'true' : 'false'}
                required
              />
              <div className="field-inline">
                <p className="field-hint">Descreva convivência, energia, adaptação e cuidados principais.</p>
                <span className="field-counter">{descriptionLength} / 30 mínimo</span>
              </div>
              {visibleErrors.description ? (
                <p className="field-error" role="alert">
                  {visibleErrors.description}
                </p>
              ) : null}
            </div>
          </section>

          <section className="form-section">
            <div className="form-section__header">
              <h2>Informações básicas</h2>
              <p>Esses dados ajudam a filtrar os perfis na busca e a orientar os adotantes.</p>
            </div>

            <div className="form-grid form-grid--2">
              <div className="field">
                <label className="field-label" htmlFor="cat-age">
                  Idade
                </label>
                <input
                  id="cat-age"
                  value={form.age}
                  onChange={setField('age')}
                  placeholder="2 anos"
                  aria-invalid={visibleErrors.age ? 'true' : 'false'}
                  required
                />
                {visibleErrors.age ? (
                  <p className="field-error" role="alert">
                    {visibleErrors.age}
                  </p>
                ) : null}
              </div>
              <div className="field">
                <label className="field-label" htmlFor="cat-gender">
                  Sexo
                </label>
                <select
                  id="cat-gender"
                  value={form.gender}
                  onChange={setField('gender')}
                  aria-invalid={visibleErrors.gender ? 'true' : 'false'}
                  required
                >
                  <option value="">Selecionar...</option>
                  <option value="Macho">Macho</option>
                  <option value="Fêmea">Fêmea</option>
                </select>
                {visibleErrors.gender ? (
                  <p className="field-error" role="alert">
                    {visibleErrors.gender}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="form-grid form-grid--2">
              <div className="field">
                <label className="field-label" htmlFor="cat-color">
                  Cor
                </label>
                <input
                  id="cat-color"
                  value={form.color}
                  onChange={setField('color')}
                  placeholder="Preto, rajado, creme..."
                  aria-invalid={visibleErrors.color ? 'true' : 'false'}
                  required
                />
                {visibleErrors.color ? (
                  <p className="field-error" role="alert">
                    {visibleErrors.color}
                  </p>
                ) : null}
              </div>
              <div className="field">
                <label className="field-label" htmlFor="cat-city">
                  Cidade
                </label>
                <input
                  id="cat-city"
                  value={form.city}
                  onChange={setField('city')}
                  placeholder="São Paulo, SP"
                  aria-invalid={visibleErrors.city ? 'true' : 'false'}
                  required
                />
                {visibleErrors.city ? (
                  <p className="field-error" role="alert">
                    {visibleErrors.city}
                  </p>
                ) : null}
              </div>
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
          </section>

          <section className="form-section">
            <div className="form-section__header">
              <h2>Personalidade</h2>
              <p>Selecione os traços que mais ajudam alguém a imaginar a convivência com esse gato.</p>
            </div>

            <div className="field">
              <div className="chip-wrap">
                {personalityOptions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`chip${personality.includes(tag) ? ' chip--active' : ''}`}
                    onClick={() => togglePersonality(tag)}
                    aria-pressed={personality.includes(tag) ? 'true' : 'false'}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="field-inline">
                <p className="field-hint">Escolha pelo menos uma característica de comportamento.</p>
                <span className="field-counter">{personality.length} selecionadas</span>
              </div>
              {visibleErrors.personality ? (
                <p className="field-error" role="alert">
                  {visibleErrors.personality}
                </p>
              ) : null}
            </div>
          </section>

          <button
            type="submit"
            className="button button-primary button-block"
            disabled={loading}
            aria-busy={loading ? 'true' : 'false'}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar gato'}
          </button>
        </form>
      </div>
    </section>
  )
}
