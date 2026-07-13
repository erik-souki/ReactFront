import { Search } from 'lucide-react'

export default function SearchField({ value, onChange }) {
  return (
    <label className="search-field">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Buscar por nome, raca ou cidade"
        value={value}
        onChange={onChange}
      />
    </label>
  )
}
