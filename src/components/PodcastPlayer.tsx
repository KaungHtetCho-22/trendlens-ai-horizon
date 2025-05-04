
import { useState, useRef, useEffect } from "react";
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X, Minimize, Maximize 
} from "lucide-react";
import type { Podcast } from "./PodcastCard";

interface PodcastPlayerProps {
  podcast: Podcast | null;
  onClose: () => void;
}

export default function PodcastPlayer({ podcast, onClose }: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    if (podcast && audioRef.current) {
      setIsPlaying(true);
      audioRef.current.play().catch(() => {
        // Handle autoplay restriction
        setIsPlaying(false);
      });
    }
  }, [podcast]);
  
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Handle play restriction
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  
  if (!podcast) return null;
  
  return (
    <div 
      className={`fixed ${
        isExpanded ? "inset-0 z-50" : "left-0 right-0 bottom-0 z-40"
      } glass p-4 transition-all duration-300`}
    >
      <audio 
        ref={audioRef}
        src={podcast.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={handleTimeUpdate}
      />
      
      <div className={`container mx-auto ${isExpanded ? "h-full flex flex-col" : ""}`}>
        <div className="flex justify-between items-center mb-4">
          <button 
            className="btn-neumorph w-8 h-8 flex items-center justify-center"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Minimize player" : "Expand player"}
          >
            {isExpanded ? <Minimize size={14} /> : <Maximize size={14} />}
          </button>
          
          <div className="text-center">
            <h3 className="font-bold truncate max-w-[200px] sm:max-w-[400px] md:max-w-none">
              {podcast.title}
            </h3>
            <p className="text-xs text-muted-foreground">by {podcast.host}</p>
          </div>
          
          <button 
            className="btn-neumorph w-8 h-8 flex items-center justify-center"
            onClick={onClose}
            aria-label="Close player"
          >
            <X size={14} />
          </button>
        </div>
        
        {isExpanded && (
          <div className="flex flex-col md:flex-row gap-6 flex-grow">
            <div className="md:w-1/3">
              <div className="neumorph p-3 aspect-square">
                <img 
                  src={podcast.image} 
                  alt={podcast.title} 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            
            <div className="md:w-2/3 flex flex-col">
              <div className="mb-4">
                <h2 className="text-2xl font-bold">{podcast.title}</h2>
                <p>by {podcast.host}</p>
              </div>
              
              <p className="text-muted-foreground flex-grow overflow-y-auto max-h-[200px] mb-8">
                {podcast.description}
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-grow h-2 neumorph-inset appearance-none rounded-full"
            />
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <button
                onClick={toggleMute}
                className="btn-neumorph w-8 h-8 flex items-center justify-center"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-2 neumorph-inset appearance-none rounded-full"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                className="btn-neumorph w-10 h-10 flex items-center justify-center"
                aria-label="Previous"
              >
                <SkipBack size={16} />
              </button>
              
              <button
                className="btn-neumorph w-14 h-14 flex items-center justify-center bg-primary text-primary-foreground"
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
              </button>
              
              <button
                className="btn-neumorph w-10 h-10 flex items-center justify-center"
                aria-label="Next"
              >
                <SkipForward size={16} />
              </button>
            </div>
            
            <div className="w-[88px]"></div> {/* Balance spacing */}
          </div>
        </div>
      </div>
    </div>
  );
}
