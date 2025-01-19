import { VideoService } from '@/lib/services/videos/VideoService';
import { IEntityVideo } from '@/lib/types/videos/IEntityVideo';
import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse<IEntityVideo[]>> => {
  const commits = await VideoService.getVideos();
  return NextResponse.json(commits);
};
