export default function Loading() {
  return (
    <div className="min-h-screen bg-bathhouse-cream flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-bathhouse-slate mb-4"></div>
        <p className="text-bathhouse-slate font-medium">Loading...</p>
      </div>
    </div>
  )
}
