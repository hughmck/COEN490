import UserNavBar from './user-navbar'
import HomeNavBar from './home-navbar'
import HCPNavBar from './HCP-navbar'

export default function WhichNav(){

  switch(localStorage.getItem('status')) {
    case 'user':
      return <UserNavBar />
      break;
    case 'HCP':
      return <HCPNavBar />
      break;
    case 'none':
      break;
    default:
      break;
}
}
