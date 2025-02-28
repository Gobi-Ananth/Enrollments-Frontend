export default function NavButton({ svgTitle }) {
  return (
    <button className="btn" aria-label="Minimize">
      <object type="image/svg+xml" data={svgTitle}></object>
    </button>
  );
}
