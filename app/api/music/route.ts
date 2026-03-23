import { MusicService } from '@/lib/services/music/MusicService';
import { IEntityMusic } from '@/lib/types/music/IEntityMusic';
import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse<IEntityMusic[]>> => {
  const music = await MusicService.getMusic();
  return NextResponse.json(music);
};
