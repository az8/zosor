import { MusicService } from '@/lib/services/music/MusicService';
import { IMusicFeedData } from '@/lib/types/music/IEntityMusic';
import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse<IMusicFeedData>> => {
  const music = await MusicService.getMusic();
  return NextResponse.json(music);
};
