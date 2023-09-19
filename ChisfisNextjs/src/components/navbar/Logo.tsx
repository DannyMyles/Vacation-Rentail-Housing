import Image from "next/image";
import Link from "next/link";


const Logo = () => {

  return ( 
  <Link href={"/"}>  <Image
   
      className="cursor-pointer md:block" 
      src="/Images/totel.png" 
      height="100" 
      width="100" 
      alt="Logo" 
    />
  </Link>
   );
}
 
export default Logo;
