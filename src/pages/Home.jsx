import Banner from '../components/Banner'

import '../assets/styles/pages/Home.css'

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* <div className="home-header"></div> */}
      <Banner title={'NEW LAUNCHES'} bgImage={'/images/first-header.webp'} />
      <Banner title={'ANNIVERSARY DROP'} bgImage={'/images/anniversary-banner.webp'}/>
      <Banner title={'FOOTWEAR'} bgImage={'/images/footwear-banner.webp'} />
    </div>
  )
}

export default Home
