import '../config/yupConfig'

import Cookies from './Cookies'
import Header from './Header'

interface Props {
  invertColors: boolean
  children?: string | React.ReactElement
  displayedPage?: string
}

export default function Layout({ invertColors, children, displayedPage }: Props) {
  return (
    <div className="md:p-0 md:mb-0">
      <Header invertColors={invertColors} displayedPage={displayedPage}/>
      <div className="mt-1 md:mt-0 md:pt-30">
        {children}
      </div>
      <Cookies />
    </div>
  )
}
