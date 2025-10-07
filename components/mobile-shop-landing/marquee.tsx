import { brands } from './data';

const Marquee = () => {
  const marqueeBrands = [...brands, ...brands];

  return (
    <div className="bg-slate-800 py-4 overflow-hidden">
      <div className="animate-marquee flex space-x-12">
        {marqueeBrands.map((brand, index) => (
          <span key={index} className="text-white/80 text-2xl font-bold whitespace-nowrap">
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
