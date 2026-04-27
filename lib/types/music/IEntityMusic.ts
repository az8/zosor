export interface IEntityMusic {
  id: string;
  url: string;
  title: string;
  rating?: number;
  releaseId?: string;
}

export interface IMusicFeedData {
  allMusic: IEntityMusic[];
  featuredMusic: IEntityMusic[];
}