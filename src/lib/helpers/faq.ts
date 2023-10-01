import { contentfulClient } from "../contentful";

interface FaqModel {
  contentTypeId: "faq";
  fields: Record<string, string>;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface CardData {
  iconSrc: string;
  stat: string;
  description: string;
}

interface FaqCardsModel {
  contentTypeId: "faqCards";
  fields: Record<string, string>;
}
export async function getFaq(): Promise<{ faqItems: FaqItem[]; cardData: CardData[] }> {
  try {
    const faqData = await contentfulClient.getEntries<FaqModel>({
      content_type: "faq",
    });

    const faqCardsData = await contentfulClient.getEntries<FaqCardsModel>({
      content_type: "faqCards",
    });

    const faqItems: FaqItem[] = faqData.items.map(faqItem => ({
      question: faqItem.fields.question || "",
      answer: faqItem.fields.answer || "",
    }));

    const cardData: CardData[] = faqCardsData.items.map(faqCard => ({
      //@ts-ignore
      iconSrc: faqCard.fields.faqCardIcon?.fields.file?.url || "",
      stat: faqCard.fields.faqCardStat || "",
      description: faqCard.fields.faqCardDescription || "",
    }));

    return { faqItems, cardData };
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
    throw error;
  }
}
