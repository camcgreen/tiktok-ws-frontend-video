import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'

function Home() {
  const [showVideo, setShowVideo] = useState(false)
  const [muted, setMuted] = useState(true)

  const ws = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    ws.current = new WebSocket(process.env.NEXT_PUBLIC_WS_URL)
    ws.current.onopen = () => {
      console.log('Connected to server')
    }
    ws.current.onmessage = (event) => {
      event.data === 'true' ? setShowVideo(true) : setShowVideo(false)
    }

    const handleVideoEnd = () => {
      setShowVideo(false)
    }
    videoRef.current.addEventListener('ended', handleVideoEnd)

    return () => {
      video.removeEventListener('ended', handleVideoEnd)
      ws.current.close()
    }
  }, [])

  useEffect(() => {
    if (showVideo) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [showVideo])

  useEffect(() => {
    videoRef.current.muted = muted
  }, [muted])

  return (
    <>
      <Head>
        <title>TikTokFashion</title>
      </Head>
      <main className='relative w-screen h-screen-sm'>
        <div
          className='absolute left-0 top-0 w-screen h-screen-sm bg-black transition-all duration-300'
          style={{ opacity: showVideo ? 1 : 0 }}
        />
        <video
          ref={videoRef}
          src='/videos/haslar.m4v'
          // controls
          muted
          className='absolute left-0 top-0 w-screen h-screen-sm object-contain transition-all duration-300'
          style={{ opacity: showVideo ? 1 : 0 }}
        />
        <button onClick={() => setMuted(!muted)}>
          <img
            src={muted ? '/images/sound-off.svg' : '/images/sound-on.svg'}
            className='fixed left-4 bottom-4'
          />
        </button>
      </main>
    </>
  )
}

export default Home
