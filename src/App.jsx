import MainPage from './pages/MainPage';
import cl from './global.module.scss';
import PlayBar from './components/PLayBar/PlayBar';

function App() {
	return (
		<div className={cl.wrapper}>
			<MainPage />
			<PlayBar />
		</div>
	);
}

export default App;
