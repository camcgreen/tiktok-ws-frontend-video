import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'

function Input() {
  const [message, setMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const ws = useRef(null)

  useEffect(() => {
    // ws.current = new WebSocket('ws://localhost:3000')
    ws.current = new WebSocket(process.env.NEXT_PUBLIC_WS_URL)
    return () => {
      ws.current.close()
    }
  }, [])

  const sendMessage = (event, message) => {
    event.preventDefault()
    console.log('sending message', message)
    ws.current.send(message)
    setShowToast(true)
    setMessage('')
    setTimeout(() => {
      setShowToast(false)
    }, 1500)
  }

  return (
    <>
      <Head>
        <title>TikTokFashion</title>
      </Head>
      <main className='w-screen h-screen-sm flex flex-col justify-center items-center'>
        <section className=''>
          <button
            className='border border-black rounded-full px-8 py-4 mr-4 transition-all hover:bg-black hover:text-white hover:border-black'
            onClick={(e) => sendMessage(e, true)}
          >
            Show video
          </button>
          <button
            className='border border-black rounded-full px-8 py-4 mr-4 transition-all hover:bg-black hover:text-white hover:border-black'
            onClick={(e) => sendMessage(e, false)}
          >
            Hide video
          </button>
        </section>
        <div
          className='fixed right-1/2 top-4 translate-x-1/2 px-8 py-4 bg-white rounded-full transition-all'
          style={{
            transform: showToast
              ? 'translate(50%, 0)'
              : 'translate(50%, -100px)',
          }}
        >
          {'✅ - Done'}
        </div>
      </main>
    </>
  )
}

export default Input
