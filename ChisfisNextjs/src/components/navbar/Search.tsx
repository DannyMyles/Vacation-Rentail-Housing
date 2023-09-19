
// import { RiArrowDropDownLine } from 'react-icons/Ri';
import Link from 'next/link';
import styles from "../Styles/Search.module.css"
const Search = () => {
  return (
    <div
    className="w-full py-2 rounded-full cursor-pointer md:w-auto"
  >
    <div 
      className="flex flex-row items-center justify-between "
    >
      <div 
        className="hidden px-6 text-sm font-semibold sm:block"
      >
        <Link href="/roomstays"   className={styles.button}>
        Room Stays
        </Link>
        
       
      </div>
      <div 
        className="flex-1 hidden px-6 text-sm font-semibold text-center sm:block"
      >
        <Link href="/looking-for-partner"  className={styles.button}>
        Looking for Partner
        </Link>
        
      </div>
      <Link href="/listing"  className={styles.button}>
      <div 
        className="flex flex-row items-center gap-1 pl-6 pr-2 text-sm font-semibold"
      >
        
      
        <div className="hidden sm:block">Listing</div>
       {/* <div className="hidden ml-auto sm:block"> <RiArrowDropDownLine/> </div> */}
        
        
      </div></Link >
      
      <div 
        className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm font-semibold"
      >
        <Link href="/help"  className={styles.button}>
        <div className="hidden sm:block">Help</div>
        </Link>
       
      </div>
    </div>
  </div>
  )
}
export default Search
