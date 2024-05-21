"use client"

import Link from 'next/link'
import styles from './menuLink.module.css'
import { usePathname } from 'next/navigation'
import { v4 as uuidv4 } from "uuid";

const MenuLink = ({staff,item}) => {
  const pathname = usePathname()

  return (
    
    <>
      { !staff.isAdmin && 
      (  !staff.isAdmin && item.title === "Facility" ||  !staff.isAdmin && item.title === "Add Facility" ? ''
         :
          <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`} key={uuidv4()}>
            {item.icon}
            {item.title}
          </Link>)
      }
  
      { staff.isAdmin && 
      (  staff.isAdmin && item.title === "Clients" || staff.isAdmin && item.title === "Add Clients" ? ''
         :
          <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}  key={uuidv4()}>
            {item.icon}
            {item.title}
          </Link>)
      }
    </>
  )
}

export default MenuLink