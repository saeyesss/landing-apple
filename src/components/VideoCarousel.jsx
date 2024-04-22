import { useState, useRef } from 'react';

import { hightlightsSlides } from '../constants';
import { useEffect } from 'react';
import gsap from 'gsap';

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [loadedData, setLoadedData] = useState([]);
  const [video, setVideo] = useState({
    videoId: 0,
    startPlay: false,
    isPlaying: false,
    isEnd: false,
    isLastVideo: false,
  });

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.current;
    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {},
        onComplete: () => {},
      });
    }
  }, [videoId, startPlay]);

  return (
    <>
      <div className='flex items-center'>
        {hightlightsSlides.map((list) => (
          <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
            <div className='video-carousel_container'>
              {' '}
              <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                <video id='video' playsInline preload='auto' muted
                ref={(elt)=>(videoRef.current[i] = elt)} onPlay={()=>{setVideo((prevVideo)=>({...prevVideo, isPlaying:true}))}}>
                  <source src={list.video} />
                </video>
              </div>
              <div className='absolute top-12 left-[5%] z-10'>
                {' '}
                {list.textLists.map((text, i) => (
                  <p key={i} className='md:text-2xl text-xl font-medium'>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoCarousel;
