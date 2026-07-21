import { Search, X } from 'lucide-react'

export default function SearchField({ value, onChange, onClear, resultsCount }) {
  return (
    <div className="search-panel">
      <label className="search-field">
        <span className="sr-only">Buscar gatos por nome, raça ou cidade</span>
        <Search className="search-icon" aria-hidden="true" />
        <input
          type="search"
          placeholder="Buscar por nome, raça ou cidade"
          value={value}
          onChange={onChange}
        />
        {value ? (
          <button
            type="button"
            className="search-clear"
            onClick={onClear}
            aria-label="Limpar busca"
          >
            <X aria-hidden="true" />
          </button>
        ) : null}
      </label>
      <p className="search-summary" aria-live="polite">
        {resultsCount} {resultsCount === 1 ? 'perfil encontrado' : 'perfis encontrados'}
      </p>
    </div>
  )
}
