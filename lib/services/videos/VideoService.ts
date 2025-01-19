import { IEntityVideo } from '@/lib/types/videos/IEntityVideo';
import { videoFeedData } from '../../constants/video-constants';

export abstract class VideoService {
  public static async getVideos(): Promise<IEntityVideo[]> {
    return videoFeedData;
  }

}
