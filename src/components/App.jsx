import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Enter from './pages/enter/Enter'

import './app.scss';
import Profile from './pages/profile/Profile';
import Header from './elements/header/Header';
// import NewPost from './elements/newPost/NewPost';
// import Posts from './elements/posts/Posts';







const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Header/>
				<Routes>
					<Route path='/'  element={<Enter />} />
					<Route path='/profile' element={<Profile />} />
					{/* <Route path='/profile' index element={<ProfileTetris />} /> */}
					{/* <Route path='/feed' element={<Feed />} />
					<Route path='/search' element={<Search />} /> */}
					
				</Routes>
			</BrowserRouter>
			{/* <Profile/> */}
		</div>
	);
};

export default App;