export default function EmptyState({ title, description, children }) {
  return (
    <div className="empty-state">
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  )
}
