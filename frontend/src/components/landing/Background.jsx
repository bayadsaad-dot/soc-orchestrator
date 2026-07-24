export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-950">

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Blue Glow */}
      <div className="absolute top-20 left-1/3 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl animate-pulse" />

      {/* Cyan Glow */}
      <div
        className="absolute bottom-10 right-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Small Glow */}
      <div
        className="absolute top-1/2 left-10 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl animate-pulse"
        style={{ animationDelay: "3s" }}
      />
    </div>
  );
}