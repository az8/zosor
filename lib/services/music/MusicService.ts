import { IEntityMusic } from '@/lib/types/music/IEntityMusic';
import { musicFeedData } from '../../constants/music-constants';

export abstract class MusicService {
  public static async getMusic(): Promise<IEntityMusic[]> {
    return musicFeedData;
  }

}
