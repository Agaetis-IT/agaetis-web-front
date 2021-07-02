import '../config/yupConfig'

import Cookies from './Cookies'
import Header from './Header'

interface Props {
  children?: string | React.ReactElement
  displayedPage?: string
}

export default function Layout({ children, displayedPage }: Props) {
  return (
    <div>
      <Header displayedPage={displayedPage}/>
      <div className="md:pt-30">
        {children}
      </div>
      <Cookies />
    </div>
  )
}
