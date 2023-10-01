import { contentfulClient } from "../contentful";

interface IContactInfo {
  title: string;
  href: string;
  details: string | any;
}

export async function getTopBarLinks(): Promise<IContactInfo[]> {
  try {
    const response = await contentfulClient.getEntry(import.meta.env.CONTENTFUL_CONTACT_INFO);

    if (!response.fields) {
      throw new Error("Contentful response fields are missing.");
    }

    const { address, phoneNumber, email } = response.fields;

    const topBarLinks: IContactInfo[] = [
      {
        title: "Call Us",
        href: `tel:${phoneNumber}`,
        details: phoneNumber,
      },
      {
        title: "Send a message",
        href: `mailto:${email}`,
        details: "Click To Email Us",
      },
      {
        title: "Location",
        //@ts-ignore
        href: `https://www.google.com/maps?q=${address?.lat || 0},${address?.lon || 0} `,
        details: "Find us on Google Maps",
      },
    ];

    return topBarLinks;
  } catch (error) {
    console.error("Error fetching top bar links:", error);
    throw error;
  }
}
