interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}

export default function Section({ id, title, children, bgColor = 'bg-white', textColor = 'text-gray-800' }: SectionProps) {
  return (
    <section id={id} className={`py-20 px-4 ${bgColor} ${textColor}`}>
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center mb-8">{title}</h2>
        {children}
      </div>
    </section>
  )
}
