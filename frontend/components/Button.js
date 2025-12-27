export default function Button({ title, onClick, full, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        vintage-button
        ${full ? 'w-full' : ''}
        text-sm
      `}
      style={{
        fontFamily: "'Playfair Display', serif"
      }}
    >
      {title}
    </button>
  )
}