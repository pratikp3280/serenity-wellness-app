export default function BrandMark({
  className = "h-8 w-8",
}) {
  return (
    <img
      src="/serenity-lotus-master.svg"
      alt=""
      aria-hidden="true"
      draggable="false"
      className={`object-contain shrink-0 ${className}`}
    />
  );
}