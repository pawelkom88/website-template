import type { EntryFieldTypes } from "contentful";
import { contentfulClient } from "../contentful";

interface IntroModel {
  contentTypeId: "introSidebyside";
  fields: {
    title: EntryFieldTypes.Text;
    numberOfYears: EntryFieldTypes.Number;
    mainImage: ImageData;
    backgroundImage: ImageData | null;
    heading: EntryFieldTypes.Text;
    paragraph: EntryFieldTypes.Text;
  };
}

interface Intro {
  title: string;
  numberOfYears: number;
  mainImageData: string;
  backgroundImageData: string;
  heading: string;
  paragraph: string;
}

export async function getSideBySideIntro(): Promise<Intro> {
  try {
    const introResponse = await contentfulClient.getEntry<IntroModel>(
      import.meta.env.CONTENTFUL_INTRO
    );

    const {
      title = "",
      numberOfYears = 0,
      mainImage = null,
      backgroundImage = null,
      heading = "",
      paragraph = "",
    } = introResponse.fields || {};

    //@ts-ignore
    const mainImageData: string = mainImage?.fields?.file?.url || "";
    //@ts-ignore
    const backgroundImageData: string = backgroundImage?.fields?.file?.url || "";

    const introModel: Intro = {
      title,
      numberOfYears,
      mainImageData,
      backgroundImageData,
      heading,
      paragraph,
    };

    return introModel;
  } catch (error) {
    console.error("Error fetching intro section:", error);
    throw error;
  }
}
