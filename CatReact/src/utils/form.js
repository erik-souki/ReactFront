export function createFieldSetter(setter) {
  return function setField(field) {
    return function handleFieldChange(event) {
      const { type, checked, value } = event.target
      setter((current) => ({
        ...current,
        [field]: type === 'checkbox' ? checked : value,
      }))
    }
  }
}

export function toggleArrayValue(list, value) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value]
}

export function matchesSearch(item, fields, query) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return true
  }

  return fields.some((field) =>
    String(item[field] ?? '')
      .toLowerCase()
      .includes(normalizedQuery),
  )
}
