import { Hexagon } from 'lucide-react';

export function TrustedBy() {
    const brands = [
        {
            logo:<Hexagon size={24}/>,
            name: "Brand 1"
        },
         {
            logo:<Hexagon size={24}  />,
            name: "Brand 2"
        },
         {
            logo:<Hexagon size={24}  />,
            name: "Brand 3"
        },
         {
            logo:<Hexagon size={24}  />,
            name: "Brand 4"
        },
         {
            logo:<Hexagon size={24}  />,
            name: "Brand 5"
        },
         {
            logo:<Hexagon size={24} />,
            name: "Brand 6"
        },
         {
            logo:<Hexagon size={24}  />,
            name: "Brand 7"
        },
    ];
  return (
    <section className="w-full my-15   ">
      
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 opacity-70">
        {brands.map((brand, i) => (
            
          <div key={i} className="flex items-center gap-2">
            {brand.logo}
            <span className="text-lg text-gray-600 font-bold ">{brand.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}