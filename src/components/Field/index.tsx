import React, { ReactNode } from 'react'
import styles from './Field.module.css'

interface Props {
    label?: string;
    tip?: string;
    error?: string;
    width?: string;
    children?: ReactNode

}

const Field = ({label, tip, error, width, children}: Props) => {
  return (
    <div className={styles.field} style={{width: width}}>
      {label && <label className={styles.label}>{label}</label>}
      {children}
      {tip && <div className={styles.tip}>{tip}</div> }
      {error && <div className={styles.error}>{error}</div> }
    </div>
  )
}

export default Field
