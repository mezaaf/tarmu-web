import { SectionContainer } from "@/components/layouts/SectionContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil",
};

const ProfilePage = () => {
  return (
    <SectionContainer padded minFullscreen>
      Profile Page
    </SectionContainer>
  );
};

export default ProfilePage;
