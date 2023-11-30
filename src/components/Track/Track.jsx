import { IconButton } from '@mui/material';
import cl from './track.module.scss';
import { PlayArrow, Pause } from '@mui/icons-material';
import formatTime from '../../utils/formatTime';
import { useContext } from 'react';
import { AudioContext } from '../../context/AudioContext';
import clsx from 'clsx';

function Track({ track }) {
	const { id, src, preview, title, artists, duration } = track;
	const formatTimeTrack = formatTime(duration);
	const {handleToggleAudio, isPlaying , currentTrack} = useContext(AudioContext)
	const isTrackPlaying = currentTrack.id === id
	return (
		<li className={clsx(cl.track, isTrackPlaying && cl.playing)}>
			<IconButton onClick={() => handleToggleAudio(track)}>
				{isTrackPlaying && isPlaying ? <Pause/> : <PlayArrow/>}
			</IconButton>
			<img alt={title} src={preview} className={cl.preview} />
			<div className={cl.credits}>
				<b>{title}</b>
				<p>{artists}</p>
			</div>
			<p>{formatTimeTrack}</p>
		</li>
	);
}

export default Track;
