import { createContext, useState } from 'react';
import { trackList } from '../assets/tracksList';

const defaultTrack = trackList[0];

const audio = new Audio(defaultTrack.src);

export const AudioContext = createContext({});

export const AudioProvider = ({ children }) => {
	const [currentTrack, setCurrentTrack] = useState(trackList[0]);
	const [isPlaying, setIsPlaying] = useState(false);

	const handleToggleAudio = track => {
		if (currentTrack.id !== track.id) {
			setCurrentTrack(track);
			setIsPlaying(true);
			audio.src = track.src;
			audio.currentTime = 0;
			audio.play();
			return;
		}

		if (isPlaying) {
			audio.pause();
			setIsPlaying(false);
		} else {
			audio.play();
			setIsPlaying(true);
		}
	};
	return (
		<AudioContext.Provider
			value={{ audio, currentTrack, handleToggleAudio, isPlaying }}
		>
			{children}
		</AudioContext.Provider>
	);
};
