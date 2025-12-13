import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface ServiceContextType {
  selectedPillarTitle: string | null;
  selectedServiceName: string | null;
  openServiceModal: (pillarTitle: string, serviceName?: string) => void;
  closeServiceModal: () => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPillarTitle, setSelectedPillarTitle] = useState<string | null>(null);
  const [selectedServiceName, setSelectedServiceName] = useState<string | null>(null);

  const openServiceModal = (pillarTitle: string, serviceName?: string) => {
    setSelectedPillarTitle(pillarTitle);
    if (serviceName) {
      setSelectedServiceName(serviceName);
    } else {
      setSelectedServiceName(null);
    }
  };

  const closeServiceModal = () => {
    setSelectedPillarTitle(null);
    setSelectedServiceName(null);
  };

  return (
    <ServiceContext.Provider value={{ selectedPillarTitle, selectedServiceName, openServiceModal, closeServiceModal }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServiceContext must be used within a ServiceProvider');
  }
  return context;
};