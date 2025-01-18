import Banner from '../components/Banner'

import '../assets/styles/pages/Home.css'

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="home-header"></div>
      <Banner title={'ANNIVERSARY DROP'} />
      <Banner title={'footwear'} />
    </div>
  )
}

export default Home
