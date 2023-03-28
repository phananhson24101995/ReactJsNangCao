import { useRef } from 'react'
import MyInput from './MyInput'

function Form() {
  let inputRef = useRef<HTMLInputElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    inputRef.current?.focus()
  }
  return (
    <div>
      <form>
        <MyInput ref={inputRef} lable='Enter your name:' />
        <button onClick={handleClick}>Edit</button>
      </form>
    </div>
  )
}

export default Form
