interface FaqItem {
  question: string;
  answer: string;
}

type ResponseObject = Record<string, string>;

export function transformResponseToObjectArray(response: ResponseObject): FaqItem[] {
  return Object.keys(response)
    .filter(key => key.startsWith("question"))
    .map(questionKey => {
      const questionNumber = questionKey.replace("question", "");
      const answerKey = `answer${questionNumber}`;

      return {
        question: response[questionKey],
        answer: response[answerKey],
      };
    });
}
