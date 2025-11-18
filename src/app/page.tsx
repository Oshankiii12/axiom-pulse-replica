import TokenTable from '@/components/TokenTable'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Axiom Token Table</h1>
      <TokenTable />
    </main>
  )
}
