export default function Background() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Hero image with slow Ken-Burns drift */}
      <img
        src="/hero-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover ken-burns"
      />

      {/* Atmospheric colour tint – stays mostly transparent */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Depth gradient – darker at very top and bottom edges only */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/45" />

      {/* Subtle left-to-right atmospheric haze that pulses with the wind */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-pink-900/10 animate-haze" />
    </div>
  )
}
