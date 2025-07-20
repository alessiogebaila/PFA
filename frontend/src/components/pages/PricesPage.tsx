import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { Euro, Calculator, FileText, Info } from 'lucide-react';

export const PricesPage: React.FC = () => {
  return (
    <div className="content max-w-6xl mx-auto">
      {/* Main pricing grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Container - Activity Tariffs */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#4a0e4e] flex items-center gap-3">
              <Calculator className="w-6 h-6" />
              Tarife Activitate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-[#4a0e4e] font-bold mr-3 mt-1">•</span>
                <span>Consultanță: 200 lei/oră</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#4a0e4e] font-bold mr-3 mt-1">•</span>
                <span>PFA activitate mică: începând de la 150 lei/lună</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#4a0e4e] font-bold mr-3 mt-1">•</span>
                <span>PFA activitate medie: 300 lei/lună</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#4a0e4e] font-bold mr-3 mt-1">•</span>
                <span>PFA activitate mare: 1000 lei/lună</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Right Container - Variable Tariffs */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#4a0e4e] flex items-center gap-3">
              <FileText className="w-6 h-6" />
              Tarife Variabile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-[#4a0e4e] font-bold mr-3 mt-1">•</span>
                <span>Depunere declarații unică: de la 100 lei</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#4a0e4e] font-bold mr-3 mt-1">•</span>
                <span>Creare cont SPV persoane fizice/juridice</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#4a0e4e] font-bold mr-3 mt-1">•</span>
                <span>Depunere online contracte închiriere</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#4a0e4e] font-bold mr-3 mt-1">•</span>
                <span>Declarare mijloace fixe DITL</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#4a0e4e] font-bold mr-3 mt-1">•</span>
                <span>Tarifele pot varia în funcție de volumul de activitate</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Second row - Other Services */}
      <div className="mb-8">
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#4a0e4e] flex items-center gap-3">
              <Euro className="w-6 h-6" />
              Alte Servicii
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-[#4a0e4e] font-bold mr-3 mt-1">•</span>
                <span>Închiriere sediu social: de la 20 euro/lună</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#4a0e4e] font-bold mr-3 mt-1">•</span>
                <span>Reglare situație ANAF declarații/plăți: 200 lei</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Info Container */}
      <div className="w-full">
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-l-4 border-[#4a0e4e]">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-[#4a0e4e] flex-shrink-0 mt-1" />
              <p className="text-gray-700 leading-relaxed">
                Tarifele variabile se negociaza in functie de marimea activitatii(mica,medie sau mare) 
                si se stabilesc inca de la inceputul colaborarii.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
