import { memo } from 'react'
import styles from './title.module.scss'

interface TitleProps {
  address: {
    street: string
  }
  handleClickTitle: (value: any) => void
}

function Title(props: TitleProps) {
  console.log(props.address)

  return (
    <div>
      <h1 className={styles.title}>To do list typescript</h1>
    </div>
  )
}

const equal = (prevProp: TitleProps, nextProp: TitleProps) => {
  return prevProp.address.street === nextProp.address.street
}

export default memo(Title)
