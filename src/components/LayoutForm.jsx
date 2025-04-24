export default function LayoutForm({ children }) {
    return (
      <div
        className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
        style={{ backgroundImage: "url('/img/bienesraices.webp')" }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
          {children}
        </div>
      </div>
    );
  }
  