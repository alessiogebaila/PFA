import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="min-h-screen flex flex-col" 
         style={{
           backgroundImage: `url('/assets/website_background.jpg')`,
           backgroundRepeat: 'no-repeat',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundAttachment: 'fixed'
         }}>
      {/* Header */}
      <div className="bg-[#4a0e4e] text-white p-4 flex items-center justify-between relative">
        <img 
          src="/assets/CCF.png" 
          alt="Logo" 
          className="w-[89px] h-[80px] object-contain mr-5"
        />
        <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2 text-center w-full m-0">
          Consultant Fiscal - Gebaila Livia
        </h1>
      </div>

      {/* Navigation */}
      <nav className="bg-[#6d1b7b] py-3 text-center rounded-b-[15px] mb-0">
        <Link 
          to="/" 
          className={`text-white no-underline mx-4 font-bold transition-colors duration-300 hover:text-[#f1c40f] ${isActive('/') ? 'text-[#f1c40f]' : ''}`}
        >
          Acasă
        </Link>
        <Link 
          to="/meet-us" 
          className={`text-white no-underline mx-4 font-bold transition-colors duration-300 hover:text-[#f1c40f] ${isActive('/meet-us') ? 'text-[#f1c40f]' : ''}`}
        >
          Programați o întâlnire
        </Link>
        <Link 
          to="/services" 
          className={`text-white no-underline mx-4 font-bold transition-colors duration-300 hover:text-[#f1c40f] ${isActive('/services') ? 'text-[#f1c40f]' : ''}`}
        >
          Serviciile noastre
        </Link>
        <Link 
          to="/prices" 
          className={`text-white no-underline mx-4 font-bold transition-colors duration-300 hover:text-[#f1c40f] ${isActive('/prices') ? 'text-[#f1c40f]' : ''}`}
        >
          Prețuri
        </Link>
        <Link 
          to="/contact" 
          className={`text-white no-underline mx-4 font-bold transition-colors duration-300 hover:text-[#f1c40f] ${isActive('/contact') ? 'text-[#f1c40f]' : ''}`}
        >
          Contact
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-5">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#4a0e4e] text-white text-center py-3 mt-auto w-full rounded-t-[15px]">
        &copy; {new Date().getFullYear()} Consultant Fiscal Gebaila Livia. Toate drepturile rezervate.
      </footer>
    </div>
  );
};
