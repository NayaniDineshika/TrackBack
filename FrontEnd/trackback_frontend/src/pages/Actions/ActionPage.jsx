import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import  '../Actions/ActionPage.css'
import { SearchIcon, LightbulbIcon, MoreHorizOutlinedIcon, NotificationsActiveOutlinedIcon } from '../../utils/Icons/Icons.js';

const ActionPage = () =>{

    return (
        <div>
          <div className="IntroBody">
            <div>
              <h1><span className="welcome">Welcome To </span><span className="highlight">TrackBack</span></h1>

              <h3>
                Help us reunite items with their owners.<br />
                Choose an option below to report something you lost or found.
              </h3>
            </div>
          </div>
          
          <div className = "ButtonMainContainer">
                <div id ="lost" className="button-container">
                    <button>Lost an Item? <br />
                    <SearchIcon className='action-icon'/>
                    </button>
                </div>
                <div id="found-1" className="button-container">
                    <button>Found an Item? <br />
                    <LightbulbIcon className='action-icon'/>
                    </button>
                </div>
                <div id="lost-2" className="button-container">
                    
                    <button>Get Quick Notification <br />
                    <NotificationsActiveOutlinedIcon className='action-icon'/>
                    </button>
                </div>
                <div id="found-2" className="button-container">
                    <button>Check Your Status <br />
                    <MoreHorizOutlinedIcon className='action-icon'/>
                    </button>
                    
                </div>
            </div>
          <div className ="ActionBody">
           
          </div>
        </div>
      );
      
}
export default ActionPage;