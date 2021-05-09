export interface Quiz {
    id: string;
    name: string;
    questions: {
      answer: string;
      id: string;
      options: string;
      text: string;
    }
  }

 