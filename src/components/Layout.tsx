import '../config/yupConfig'

import Cookies from './Cookies'
import Header from './Header'

interface Props {
  children?: string | React.ReactElement
  displayedPage?: string
  otherColorClass?: string
}

export default function Layout({ children, displayedPage, otherColorClass }: Props) {
  return (
    <div>
      <Header displayedPage={displayedPage} otherColorClass={otherColorClass} />
      <div className="md:pt-30">{children}</div>
      <Cookies />
    </div>
  )
}
