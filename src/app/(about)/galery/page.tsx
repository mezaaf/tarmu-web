import { SectionContainer } from "@/components/layouts/SectionContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri",
};

const GaleryPage = () => {
  return (
    <SectionContainer padded minFullscreen>
      Galery Page
    </SectionContainer>
  );
};

export default GaleryPage;
