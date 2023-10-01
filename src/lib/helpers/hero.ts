import type { AssetFields, EntryFieldTypes } from "contentful";
import { contentfulClient } from "../contentful";

interface HeroFields {
  heading: EntryFieldTypes.Text;
  paragraph: EntryFieldTypes.Text;
  image: AssetFields;
  mobileImage: AssetFields;
  callToAction: EntryFieldTypes.Text;
}

export interface HeroModel {
  contentTypeId: "hero";
  fields: HeroFields;
}

export interface HeroSection {
  heading: string;
  paragraph: string;
  heroDesktopImage: string;
  heroMobileImage: string;
  callToAction: string;
}

export async function getHeroSection(): Promise<HeroSection> {
  try {
    const response = await contentfulClient.getEntry<HeroModel>(import.meta.env.CONTENTFUL_HERO);

    const {
      heading = "",
      paragraph = "",
      image = null,
      mobileImage = null,
      callToAction = "Request Appointment",
    } = response.fields || {};
    //@ts-ignore
    const heroDesktopImage: string = image?.fields?.file?.url || "";
    //@ts-ignore
    const heroMobileImage: string = mobileImage?.fields?.file?.url || "";

    const heroSection: HeroSection = {
      heading,
      paragraph,
      heroDesktopImage,
      heroMobileImage,
      callToAction,
    };

    return heroSection;
  } catch (error) {
    console.error("Error fetching hero section:", error);
    throw error;
  }
}
