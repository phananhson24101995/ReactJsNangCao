import React, { useEffect, useRef, useState } from 'react'

function WatchTimer() {
  const [time, setTime] = useState<number>(0)
  let timerRef = useRef<any>(null)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1)
      console.log('WatchTimer')
    }, 1000)

    return () => {
      clearInterval(timerRef.current)
    }
  }, [])
  return <div>{time}</div>
}

function Watch() {
  const [isVisiable, setVisiable] = useState<boolean>(true)
  return (
    <>
      <button onClick={() => setVisiable(!isVisiable)}>Click Watch</button>
      {isVisiable && <WatchTimer />}
    </>
  )
}

export default Watch
