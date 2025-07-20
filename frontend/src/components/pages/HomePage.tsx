import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';

export const HomePage: React.FC = () => {
  return (
    <div className="content">
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Top row - Description and Services */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Description */}
          <div className="flex-1">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#4a0e4e]">Descriere</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Gebaila Livia este un consultant fiscal cu experiență încă din anul 2007, 
                  oferind servicii complete de consultanță și contabilitate. Cu o experiență 
                  solidă în interpretarea obligațiilor fiscale și în optimizarea costurilor, 
                  ea ajută clienții să respecte toate reglementările în vigoare.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Services */}
          <div className="flex-1">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#4a0e4e]">Servicii</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#4a0e4e] font-bold mr-2">•</span>
                    Consultanță în domeniul impozitelor și taxelor
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4a0e4e] font-bold mr-2">•</span>
                    Asistență în întocmirea declarațiilor fiscale
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4a0e4e] font-bold mr-2">•</span>
                    Planificare fiscală și optimizare
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4a0e4e] font-bold mr-2">•</span>
                    Servicii de contabilitate și raportare financiară
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom row - Mission */}
      <div className="w-full">
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#4a0e4e]">Misiune</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed text-center">
              Să oferim soluții personalizate și eficiente, contribuind la succesul și 
              dezvoltarea afacerilor clienților noștri.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
