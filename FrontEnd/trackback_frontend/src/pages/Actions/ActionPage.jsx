import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import  '../Actions/ActionPage.css'
import { SearchIcon, LightbulbIcon, MoreHorizOutlinedIcon, NotificationsActiveOutlinedIcon, DoubleArrow } from '../../utils/Icons/Icons.js';
import slide1 from '../../Images/slide2.png'
import slide3 from '../../Images/slide3.png'
import slide4 from '../../Images/slide4.png'
import slide5 from '../../Images/slide5.png'
import slide6 from '../../Images/slide6.png'
const ActionPage = () =>{

  const slides = [
    {
      heading: "Reuniting Communities",
      subText: "Your smart companion for recovering lost items and reuniting them with their rightful owners.",
      background: "#fef6e4",
      image:slide1
    },
    {
      heading: "Lost something?",
      subText: "Report it and get notified when someone finds it.",
      image:slide4,
    },
    {
      heading: "Found something?",
      subText: "Post it here and let us find the owner together.",
      image:slide5
    },
    {
      heading: "Easy !",
      subText: "Whether you've misplaced something or found an item that doesn't belong to you, TrackBack makes it easy to report, search, and connect.",
      image:slide3
    },
    {
      heading: "Confidence ?",
      subText: "We believe in the power of community and technology to solve everyday problems. Start tracking back what’s lost.",
      image:slide6
    }
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
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
                    <button className='Actionbutton'>Lost an Item? <br />
                    <SearchIcon className='action-icon'/>
                    </button>
                </div>
                <div id="found-1" className="button-container">
                    <button className='Actionbutton'>Found an Item? <br />
                    <LightbulbIcon className='action-icon'/>
                    </button>
                </div>
                <div id="lost-2" className="button-container">
                    
                    <button className='Actionbutton'>Get Quick Notification <br />
                    <NotificationsActiveOutlinedIcon className='action-icon'/>
                    </button>
                </div>
                <div id="found-2" className="button-container">
                    <button className='Actionbutton'>Check Your Status <br />
                    <MoreHorizOutlinedIcon className='action-icon'/>
                    </button>
                    
                </div>
            </div>
          <div className ="ActionBody" >
          <div className="slide-bar" >
            <div className='slide-left' 
            style={{
              // background: slides[currentSlide].background ,
              backgroundImage: `url(${slides[currentSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
               width: '50%',    
              height: '100%'      
            }}>
    
                {/* <img src={slides[currentSlide].image} alt="Slide visual" className="slide-image" /> */}
              </div>      
              <div className='slide-middle' >
                <button className="arrow-button" onClick={handleNext}>
                <DoubleArrow id ="arrow" className='action-icon'/>
                </button>
              </div>
              <div className='slide-right'>
              <h1>
                <span className="welcome">{slides[currentSlide].heading.split(" ")[0]} </span>
                <span className="highlight">{slides[currentSlide].heading.split(" ").slice(1).join(" ")}</span>
              </h1>

              <h3>
                {slides[currentSlide].subText.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </h3>
              </div>  
              
            </div>
          </div>
        </div>
      );
      
}
export default ActionPage;