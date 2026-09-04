import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ClinicalExcellenceSection } from '../components/home/ClinicalExcellenceSection';
import { SpecialtiesPreview } from '../components/home/SpecialtiesPreview';
import { HospitalServicesAndInformation } from '../components/common/HospitalServicesAndInformation';
import { HospitalNetworkSection } from '../components/home/HospitalNetworkSection';
import { PeopleVisionSection } from '../components/home/PeopleVisionSection';
import { PatientStoriesSection } from '../components/home/PatientStoriesSection';
import { LatestUpdatesSection } from '../components/home/LatestUpdatesSection';
import { FloatingQuickAction } from '../components/home/FloatingQuickAction';
import { ScrollProgressBar } from '../components/common/ScrollProgressBar';

interface HomePageProps {
  navigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    <div className="space-y-0 relative">
      <ScrollProgressBar />
      <HeroSection navigate={navigate} />
      <SpecialtiesPreview navigate={navigate} />
      <HospitalNetworkSection navigate={navigate} />
      <ClinicalExcellenceSection navigate={navigate} />
      <HospitalServicesAndInformation />
      <PeopleVisionSection navigate={navigate} />
      <PatientStoriesSection navigate={navigate} />
      <LatestUpdatesSection navigate={navigate} />
      <FloatingQuickAction />
    </div>
  );
};
