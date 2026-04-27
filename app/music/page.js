"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from '../../lib/redux/hooks';
import { getMusicFeedData } from "../../lib/redux/slices/sharedSlice";
import { MusicIcons } from './icons';
import { MUI } from './mui';
import { MusicService } from '@/lib/services/music/MusicService';

export default function Music() {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const shouldPlayRef = useRef(false);
  
  // Refs to handle asynchronous YouTube events without stale state
  const loopModeRef = useRef("off");
  const currentIndexRef = useRef(0);
  const queueRef = useRef([]);
  const playerReadyRef = useRef(false);
  const cueTrackRef = useRef(null);

  const [ytReady, setYtReady] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  const musicFeedData = useSelector((state) => state.shared.musicFeedData);
  const [queue, setQueue] = useState(musicFeedData || []);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [shuffle, setShuffle] = useState(false);
  const [loopMode, setLoopMode] = useState("off"); 
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  
  const [thumbnail, setThumbnail] = useState(`https://img.youtube.com/vi/uFzbO3tb3pk/hqdefault.jpg`);

  const reduxDispatch = useAppDispatch();
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [allPaginationPageCount, setAllPaginationPageCount] = useState(1);
  const [musicFeedPageData, setMusicFeedPageData] = useState([]);

  // Logic for changing tracks
  const cueTrack = (i, autoPlay = false) => {
    const currentQueue = queueRef.current;
    if (!playerReadyRef.current || !currentQueue[i]) return;
    
    const videoId = MusicService.getId(currentQueue[i].url);
    shouldPlayRef.current = autoPlay;

    if (autoPlay) {
      playerRef.current.loadVideoById(videoId);
    } else {
      playerRef.current.cueVideoById(videoId);
    }

    setCurrentIndex(i);
    setProgress(0);
    setDuration(0);
    setIsPlaying(autoPlay);
  };

  // Sync refs and update cueTrackRef whenever dependencies change
  useEffect(() => { loopModeRef.current = loopMode; }, [loopMode]);
  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);
  useEffect(() => { queueRef.current = queue; }, [queue]);
  useEffect(() => { playerReadyRef.current = playerReady; }, [playerReady]);
  useEffect(() => { cueTrackRef.current = cueTrack; }, [playerReady, queue]);

  useEffect(() => {
    setCurrentPaginationPage(1);
    setAllPaginationPageCount(Math.ceil((musicFeedData?.length ?? 0) / 10) || 1);
    setMusicFeedPageData(musicFeedData?.slice(0, 10) ?? []);
    setQueue(musicFeedData || []);
  }, [musicFeedData]);

  useEffect(() => {
    document.title = "Music | Zosor";
    reduxDispatch(getMusicFeedData());
    return () => clearInterval(intervalRef.current);
  }, []);

  const handlePaginationChange = (event, value) => {
    setCurrentPaginationPage(value);
    setMusicFeedPageData(musicFeedData?.slice((value - 1) * 10, value * 10) ?? []);
  };

  useEffect(() => {
    if (!queue[currentIndex]) return;
    const videoId = MusicService.getId(queue[currentIndex].url);
    const hqUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const maxResUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    setThumbnail(hqUrl);
    const img = new Image();
    img.src = maxResUrl;
    img.onload = () => { if (img.naturalWidth > 120) setThumbnail(maxResUrl); };
  }, [currentIndex, queue]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.YT && window.YT.Player) {
      setYtReady(true);
      return;
    }
    window.onYouTubeIframeAPIReady = () => setYtReady(true);
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(s);
  }, []);

  useEffect(() => {
    if (!ytReady || playerRef.current) return;

    playerRef.current = new window.YT.Player("yt-player", {
      height: "0",
      width: "0",
      playerVars: { controls: 0, rel: 0, showinfo: 0, disablekb: 1 },
      events: {
        onReady: (e) => {
          setPlayerReady(true);
          e.target.setVolume(volume);
        },
        onStateChange: (e) => {
          if (e.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            startTracking();
          } else if (e.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
            handleTrackEnd();
          } else if (e.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          }

          if (shouldPlayRef.current && e.data === window.YT.PlayerState.CUED) {
            playerRef.current.playVideo();
            shouldPlayRef.current = false;
          }
        },
      },
    });
  }, [ytReady]);

  useEffect(() => {
    if (!playerReady || !queue.length) return;
    cueTrack(0);
  }, [playerReady]);

  useEffect(() => {
    const newQueue = shuffle ? MusicService.shuffleArray([...musicFeedData]) : [...musicFeedData];
    setQueue(newQueue);
    setCurrentIndex(0);
  }, [shuffle]);

  const playTrack = (i) => cueTrackRef.current(i, true);

  const togglePlay = () => {
    if (!playerRef.current) return;
    isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < queue.length) {
      playTrack(nextIndex);
    } else if (loopMode === "all") {
      playTrack(0);
    }
  };

  const handlePrev = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      playTrack(prevIndex);
    } else if (loopMode === "all") {
      playTrack(queue.length - 1);
    }
  };

  const handleTrackEnd = () => {
    const mode = loopModeRef.current;
    const idx = currentIndexRef.current;
    const q = queueRef.current;

    if (mode === "one") {
      playerRef.current.seekTo(0);
      playerRef.current.playVideo();
    } else if (mode === "all") {
      // Loop All: play next or circle back to 0
      const nextIdx = (idx + 1 < q.length) ? idx + 1 : 0;
      cueTrackRef.current(nextIdx, true);
    } else {
      // Loop OFF: Stop playback at end of song
      setIsPlaying(false);
      if (playerRef.current?.getDuration) setProgress(playerRef.current.getDuration());
    }
  };

  const startTracking = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!playerRef.current || !playerRef.current.getCurrentTime) return;

      const currentTime = playerRef.current.getCurrentTime();
      const totalDuration = playerRef.current.getDuration();
      
      if (totalDuration > 0) {
        setDuration(totalDuration);
        if (totalDuration - currentTime < 0.5) {
          setProgress(totalDuration);
        } else {
          setProgress(Math.min(currentTime, totalDuration));
        }
      }
    }, 250);
  };

  const handleSeek = (_, v) => {
    playerRef.current.seekTo(v, true);
    setProgress(v);
  };

  const handleVolume = (_, v) => {
    playerRef.current.setVolume(v);
    setVolume(v);
    if (v > 0) setMuted(false);
  };

  const toggleMute = () => {
    if (muted) playerRef.current.unMute();
    else playerRef.current.mute();
    setMuted(!muted);
  };

  const currentTrack = queue[currentIndex];
  const nextTrack = currentIndex + 1 < queue.length ? queue[currentIndex + 1] : (loopMode === "all" ? queue[0] : null);

  return (
    <MUI.Box sx={{ pt: 4.5 }} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>
      <MUI.Box sx={{ overflowY: 'auto', flex: 1 }}>
        {allPaginationPageCount > 1 && (
          <MUI.Pagination count={allPaginationPageCount} sx={{ mx: 7, my: 2 }} page={currentPaginationPage} onChange={handlePaginationChange} />
        )}
        <div id="yt-player" style={{ position: 'absolute', top: -1000, visibility: 'hidden' }} />

        <MUI.Grid container sx={{ p: 2 }}>
          {musicFeedPageData.map((t, i) => {
            const absoluteIndex = (currentPaginationPage - 1) * 10 + i;
            const isCurrent = absoluteIndex === currentIndex;
            return (
              <MUI.Grid key={t.id} item sx={{ width: "100%"}}>
                <MUI.Box sx={{
                  p: 1.5,
                  background: isCurrent ? "#f0f2ffdb" : i % 2 === 0 ? "#fcfcfc" : "#fefefe",
                  borderRadius: i === 0 
                  ? "8px 8px 0 0" 
                  : i === musicFeedPageData.length - 1 
                    ? "0 0 8px 8px" 
                    : 0,
                  outline: "1px solid #e0e0e0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                  }}
                >
                  <MUI.Stack>
                    <MUI.Typography style ={{fontSize: isCurrent ? "1.2rem" : "1rem", color: isCurrent ? "#363467" : "#000000" }}>{t.title}</MUI.Typography>
                    <MUI.Stack direction="row" alignItems="center">
                      <MUI.Typography sx={{ mr: 1, fontSize: '0.8rem' }}>{t.rating || 0}</MUI.Typography>
                      <MUI.StyledRating value={t.rating || 0} readOnly size="small" icon={<MusicIcons.FavoriteIcon fontSize="inherit"/>} emptyIcon={<MusicIcons.FavoriteBorderIcon fontSize="inherit" />} $fillColor={isCurrent ? "#a5a0f9" : "#ff878d"} />
                    </MUI.Stack>
                  </MUI.Stack>
                  <MUI.IconButton
                    onClick={() => isCurrent ? togglePlay() : playTrack(absoluteIndex)}
                    sx={{ width: "45px", height: "45px", background: isCurrent ? "#ada8ff" : "#ff7e88", "&:hover": { background: "#181f23" } }}
                  >
                    {isCurrent && isPlaying ? <MusicIcons.PauseIcon sx={{ color: "#FFF" }} /> : <MusicIcons.PlayArrowIcon sx={{ color: "#FFF" }} />}
                  </MUI.IconButton>
                </MUI.Box>
              </MUI.Grid>
            );
          })}
        </MUI.Grid>
      </MUI.Box>

      {/* PLAYER BAR */}
      <MUI.Box sx={{ backdropFilter: "blur(20px)", background: "linear-gradient(to right, rgba(10,10,10,0.95), rgba(25,25,25,0.95))", color: "#fff", px: 2, py: 1.5, position: 'relative' }}>
        <MUI.Box sx={{ position: "absolute", inset: 0, backgroundImage: `url(${thumbnail})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(60px)", opacity: 0.3, zIndex: -1 }} />
        
        <MUI.Box display="flex" alignItems="center" gap={1.5}>
          <MUI.Typography sx={{ minWidth: 35 }} fontSize="11px">{MusicService.formatTime(Math.floor(progress))}</MUI.Typography>
          <MUI.Slider 
            size="small" 
            min={0} 
            max={duration || 100} 
            value={progress} 
            onChange={handleSeek} 
            sx={{ flex: 1, color: "#1db954", '& .MuiSlider-thumb': { width: 12, height: 12 } }} 
          />
          <MUI.Typography sx={{ minWidth: 35 }} fontSize="11px">{MusicService.formatTime(Math.floor(duration))}</MUI.Typography>
        </MUI.Box>

        <MUI.Box display="flex" alignItems="center" gap={1} mt={0.5} justifyContent="center">
          <MUI.Box sx={{ width: 40, height: 40, borderRadius: 1, overflow: "hidden", flexShrink: 0 }}>
            <img src={thumbnail} alt="thumb" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </MUI.Box>
          <MUI.Typography fontSize="13px" noWrap sx={{ width: 140, fontWeight: 500 }}>{currentTrack?.title}</MUI.Typography>

          <MUI.IconButton size="small" onClick={() => setShuffle(!shuffle)}><MusicIcons.ShuffleIcon sx={{ color: shuffle ? "#1db954" : "#fff", fontSize: 20 }} /></MUI.IconButton>
          <MUI.IconButton size="small" onClick={handlePrev}><MusicIcons.SkipPreviousIcon sx={{ color: "#fff" }} /></MUI.IconButton>
          
          <MUI.IconButton onClick={togglePlay} sx={{ background: "#1db954", color: "#000", width: 40, height: 40, "&:hover": { background: "#1ed760" } }}>
            {isPlaying ? <MusicIcons.PauseIcon /> : <MusicIcons.PlayArrowIcon />}
          </MUI.IconButton>
          
          <MUI.IconButton size="small" onClick={handleNext}><MusicIcons.SkipNextIcon sx={{ color: "#fff" }} /></MUI.IconButton>
          
          <MUI.IconButton size="small" onClick={() => setLoopMode(l => l === "off" ? "all" : l === "all" ? "one" : "off")}>
            {loopMode === "one" ? <MusicIcons.RepeatOneIcon sx={{ color: "#1db954", fontSize: 20 }} /> : <MusicIcons.RepeatIcon sx={{ color: loopMode === "all" ? "#1db954" : "#fff", fontSize: 20 }} />}
          </MUI.IconButton>

          <MUI.Box sx={{ display: 'flex', alignItems: 'center', ml: 1, gap: 1 }}>
            <MUI.IconButton size="small" onClick={toggleMute}>{muted || volume === 0 ? <MusicIcons.VolumeOffIcon sx={{ color: "#fff", fontSize: 20 }} /> : <MusicIcons.VolumeUpIcon sx={{ color: "#fff", fontSize: 20 }} />}</MUI.IconButton>
            <MUI.Slider size="small" min={0} max={100} value={muted ? 0 : volume} onChange={handleVolume} sx={{ width: 70, color: "#fff" }} />
          </MUI.Box>

          {nextTrack && (
            <MUI.Typography fontSize="10px" sx={{ opacity: 0.7, maxWidth: 100 }} noWrap>
              Next: {nextTrack.title}
            </MUI.Typography>
          )}
        </MUI.Box>
      </MUI.Box>
    </MUI.Box>
  );
}