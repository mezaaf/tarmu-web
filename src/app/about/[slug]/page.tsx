import { SectionContainer } from "@/components/layouts/SectionContainer";
import React from "react";
type AboutPageProps = {
  params: { slug: string };
};

const AboutPage = (props: AboutPageProps) => {
  const { params } = props;
  return (
    <SectionContainer padded minFullscreen>
      {params.slug} Page
    </SectionContainer>
  );
};

export default AboutPage;
