export default function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return(
    <section className="py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">{title}</h2>
      {children}
    </section>
  )
};
