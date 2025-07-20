import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { FileText, TrendingUp, Building, Users } from 'lucide-react';

interface ServiceContainerProps {
  title: string;
  icon: React.ReactNode;
  services: Array<{
    name: string;
    description: string;
  }>;
}

const ServiceContainer: React.FC<ServiceContainerProps> = ({ title, icon, services }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card 
      className="bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <CardHeader>
        <CardTitle className="text-[#4a0e4e] flex items-center gap-3">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="border-l-4 border-[#4a0e4e] pl-4">
              <h4 className="font-semibold text-gray-800 mb-1">{service.name}</h4>
              <p 
                className={`text-gray-600 text-sm transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const ServicesPage: React.FC = () => {
  const serviceCategories = [
    {
      title: "Consultanță",
      icon: <FileText className="w-6 h-6" />,
      services: [
        {
          name: "Consultanță fiscală",
          description: "Servicii complete de consultanță fiscală."
        },
        {
          name: "Consultanță impozite si taxe",
          description: "Consultanță pentru optimizarea impozitelor și a taxelor pentru persoane fizice și juridice."
        },
        {
          name: "Consultanță in domeniul chiriilor",
          description: "Suport în gestionarea fiscalității legate de proprietăți și chirii."
        }
      ]
    },
    {
      title: "Consultanță în Afaceri",
      icon: <TrendingUp className="w-6 h-6" />,
      services: [
        {
          name: "Achiziții, Imobilizări",
          description: "Servicii dedicate optimizării achizițiilor și administrării imobilizărilor în afaceri."
        },
        {
          name: "Optimizare afaceri",
          description: "Consultanță personalizată pentru optimizarea proceselor de business și creșterea eficienței."
        }
      ]
    },
    {
      title: "Servicii ANAF",
      icon: <Building className="w-6 h-6" />,
      services: [
        {
          name: "Creare cod EORI",
          description: "Asistență în crearea codului EORI necesar pentru activitățile vamale și comerciale internaționale."
        },
        {
          name: "Creare SPV si depunere documente pe platformele ANAF si DITL",
          description: "Suport pentru crearea contului SPV și depunerea documentelor fiscale pe platformele oficiale ANAF și DITL."
        },
        {
          name: "Inlesnire eFactura/ Facturare SPV",
          description: "Utilizarea sistemului eFactura și managementul facturilor prin intermediul SPV."
        }
      ]
    },
    {
      title: "Servicii Reprezentare",
      icon: <Users className="w-6 h-6" />,
      services: [
        {
          name: "Reprezentare în Fața Organelor de Control",
          description: "Sprijin pentru reprezentarea în fața autorităților de control, asigurând respectarea drepturilor tale."
        }
      ]
    }
  ];

  return (
    <div className="content max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {serviceCategories.map((category, index) => (
          <ServiceContainer
            key={index}
            title={category.title}
            icon={category.icon}
            services={category.services}
          />
        ))}
      </div>
      
      {/* Instructions */}
      <div className="mt-8 text-center">
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardContent className="pt-6">
            <p className="text-gray-600 italic">
              Treceți cu mouse-ul peste fiecare secțiune pentru a vedea detaliile serviciilor oferite.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
