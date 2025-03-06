export default function SvgButton({ svgLabel }) {
  return (
    <button className="btn" aria-label={svgLabel}>
      <img src={svgLabel} />
    </button>
  );
}
