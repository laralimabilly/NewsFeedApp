export interface Article {
    id: string;
    webTitle: string;
    webUrl: string;
    webPublicationDate: string;
    type: string;
    pillarName: string;
    sectionName: string;
    sectionId: string;
    source: string;
    fields: {
      headline: string,
      trailText: string,
      thumbnail: string
    };
  }