import React, { useState } from 'react';
import './customPanel.scss';
import AboutMe from '../aboutMe/AboutMe';
import Posts from '../posts/Posts';
import NewPost from '../newPost/NewPost';


const CustomPanel = () => {
  const [value, setValue] = useState('one');

  return (
    <div className="custom-panel">
      <div className="tabs">
        <button 
          className={`tab visible ${value === 'one' ? 'active' : ''}`} 
          onClick={() => setValue('one')}
        >
          About me
        </button>
        <button 
          className={`tab visible ${value === 'two' ? 'active' : ''}`} 
          onClick={() => setValue('two')}
        >
          Posts
        </button>
        <button 
          className={`tab visible ${value === 'three' ? 'active' : ''}`} 
          onClick={() => setValue('three')}
        >
          New Post
        </button>
      </div>

      <div className="content">
        {value === 'one' && <AboutMe/>}
        {value === 'two' && <Posts />}
        {value === 'three' && <NewPost />}
      </div>
    </div>
  );
};

export default CustomPanel;
