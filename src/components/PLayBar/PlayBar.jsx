import { useContext, useEffect, useState } from 'react';
import cl from './playbar.module.scss';
import { AudioContext } from '../../context/AudioContext';
import { IconButton, Slider } from '@mui/material';
import { Pause, PlayArrow } from '@mui/icons-material';
import formatTime from '../../utils/formatTime';

const TimeControls = () => {
	const { audio, currentTrack } = useContext(AudioContext);
   // console.log('Timecontrol')
	const { duration } = currentTrack;
	const [currentTime, setcurrentTime] = useState(0);
	const visualCurrentTime = formatTime(currentTime);
	const sliderCurrentTime = Math.round((currentTime / duration) * 100);

	const handleChangeCurrentTime = (_, value) => {
		const time = Math.round((value / 100) * duration);
		setcurrentTime(time);
		audio.currentTime = time;
	};

	useEffect(() => {
		const timeInterval = setInterval(() => {
			setcurrentTime(audio.currentTime);
		}, 1000);

		return () => clearInterval(timeInterval)
	}, []);
	return (
		<>
			<p>{visualCurrentTime}</p>
			<Slider
				onChange={handleChangeCurrentTime}
				value={sliderCurrentTime}
				step={1}
				min={0}
				max={100}
			/>
		</>
	);
};

function PlayBar() {
   // console.log('PLaybar')
	const { currentTrack, handleToggleAudio, isPlaying } =
		useContext(AudioContext);

	const { artist, title, preview, duration } = currentTrack;

	const formatDuration = formatTime(duration);

	return (
		<div className={cl.playbar}>
			<img className={cl.preview} src={preview} alt='preview track' />
			<IconButton onClick={() => handleToggleAudio(currentTrack)}>
				{isPlaying ? <Pause /> : <PlayArrow />}
			</IconButton>
			<div className={cl.credits}>
				<h4 className={''}>{title}</h4>
				<p>{artist}</p>
			</div>
			<div className={cl.slider}>
				<TimeControls />
				<p>{formatDuration}</p>
			</div>
		</div>
	);
}

export default PlayBar;
