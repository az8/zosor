import { IMusicFeedData } from '@/lib/types/music/IEntityMusic';
import { musicFeedData } from '../../constants/music-constants';

export abstract class MusicService {
  public static async getMusic(): Promise<IMusicFeedData> {
    return musicFeedData;
  }

  // Extracts the video ID from a YouTube URL
  public static getId(url: string): string | null {
    try {
      return new URL(url).searchParams.get("v");
    } catch {
      return null; // Handle invalid URL strings
    }
  }

  // Formats seconds into a M:SS string
  public static formatTime(s: number): string {
    if (!s || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  // Returns a shuffled copy of the provided array
  public static shuffleArray<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}
