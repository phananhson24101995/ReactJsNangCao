import { ForwardedRef, forwardRef } from 'react'

interface MyInputProps {
  lable: string
  otherProps?: any
}

function MyInput(props: any, ref: ForwardedRef<HTMLInputElement>) {
  const { lable, otherProps } = props
  return (
    <div>
      <label>
        {lable}
        <input ref={ref} {...otherProps} />
      </label>
    </div>
  )
}

export default forwardRef(MyInput)
