import logo from '../assets/logo.png';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CircleUserRound } from "lucide-react"

const Header = () => {

  return (
    <div className="flex justify-between items-center border-b pb-2 text-gray-600">
      <div className='w-56 gap-2 flex items-center h-100 w-100'>
        <CircleUserRound className="w-10 h-10" />
        {/* <Avatar className="w-14 h-14">
          <AvatarImage src={CircleUserRound} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
        <h3 className="scroll-m-20 text-xl font-semibold">
          Admin1
        </h3>
      </div>
      <h2 className="flex-1 text-primary scroll-m-20 pb-2 text-3xl font-semibold text-foreground">
        Dashboard
      </h2>
      <div className='flex justify-end w-56'>
        <img width={90} height={90} src={logo} alt="happy_playero_logo" />
      </div>
    </div>
  )

}

export default Header;