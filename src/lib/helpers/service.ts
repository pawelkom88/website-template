import { contentfulClient } from "../contentful";

interface ServiceFields {
  heading: string;
  paragraph: string;
  [key: string]: string;
}

interface ServiceModel {
  contentTypeId: "service";
  fields: ServiceFields;
}

interface ServiceCardModel {
  contentTypeId: "serviceCard";
  fields: Record<string, string>;
}

interface Services {
  serviceTypography: {
    heading: string;
    paragraph: string;
  };
  serviceItems: ServiceItems[];
}

interface ServiceItems {
  iconSrc: string;
  title: string;
  description: string;
}

export async function getServices(): Promise<Services> {
  try {
    const service = await contentfulClient.getEntry<ServiceModel>(
      import.meta.env.CONTENTFUL_SERVICE
    );

    const serviceData = await contentfulClient.getEntries<ServiceCardModel>({
      content_type: "serviceCard",
    });

    const { heading = "", paragraph = "" } = service.fields || {};

    const serviceItems: ServiceItems[] = serviceData.items.map(service => ({
      //@ts-ignore
      iconSrc: service.fields.cardIcon.fields.file.url,
      title: service.fields.cardTitle,
      description: service.fields.cardText,
    }));

    const serviceTypography = {
      heading,
      paragraph,
    };

    return { serviceTypography, serviceItems };
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}
