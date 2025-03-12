import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './app.scss';



import Profile from './pages/profile/Profile';
import Header from './elements/header/Header';
// import NewPost from './elements/newPost/NewPost';
// import Posts from './elements/posts/Posts';
import Enter from './pages/enter/Enter'
import UserProfile from './pages/userProfile/UserProfile';
import ProfileEditor from './pages/profileEditor/ProfileEditor';







const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Header/>
				<Routes>
					<Route path='/'  element={<Enter />} />
					<Route path='/profile' element={<Profile />} />
					<Route path="/user/:username" element={<UserProfile />} />
					<Route path='/settings' index element={<ProfileEditor />} />
					{/* <Route path='/feed' element={<Feed />} /> */}
					{/* <Route path='/search' element={<Search />} /> */}
					
				</Routes>
			</BrowserRouter>
			{/* <ProfileUser/> */}
		</div>
	);
};

export default App;