import { useState } from 'react';
import { trackList } from '../assets/tracksList';
import Track from '../components/Track/Track';
import cl from './MainPage.module.scss';
import { Input } from '@mui/material';


const searchTrack = query => {
	if (!query) {
		return trackList;
	}
	return trackList.filter(
		(t, i) =>
			t.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
			t.artists.toLocaleLowerCase().includes(query.toLocaleLowerCase())
	);
};

function MainPage() {
	const [tracks, setTracks] = useState(trackList);

	const handleChange = e => {
		const curTracks  = searchTrack(e.target.value);
      setTracks(curTracks)
	};
	return (
		<div className={cl.search}>
			<Input
				onChange={handleChange}
				className={cl.input}
				placeholder='Search track...'
			/>
			<ul className={cl.list}>
				{tracks.length ? tracks.map(t => (
					<Track key={t.id} track={t} />
				)): <div style={{textAlign:'center'}}>No matches</div>}
			</ul>
       
		</div>
	);
}

export default MainPage;
