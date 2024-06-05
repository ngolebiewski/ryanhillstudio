import { Carousel } from 'antd';

const contentStyle = {
  margin: '0', // Center horizontally
  height: '75vh',
  width: '100%',
  color: '#black',
  lineHeight: '50vh', // Center vertically
  textAlign: 'center',
  // background: '#bbbbbb',
};

const CarouselTest = () => {
  return (
    <Carousel arrows infinite={false} dots={false} className="custom-carousel">
      <div>
        <h3 style={contentStyle}><img src="https://api.ryanhill.studio/screenshot-2024-05-22-at-3-05-26-pm/" style={{ height: '100%' }} alt="Your Image"/></h3>
      </div>
      <div>
        <h3 style={contentStyle}><img src="https://api.ryanhill.studio/screenshot-2024-05-22-at-3-04-41-pm/" style={{ height: '100%' }} alt="Your Image"/></h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
}

export default CarouselTest;
