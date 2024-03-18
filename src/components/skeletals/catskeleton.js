import Slider from "react-slick";

const CatSkeleton = ({slideToShow}) => {
 const settings = {
  dots: false,
  arrows:true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 6000,
  slidesToShow: slideToShow,
  slidesToScroll: 3
};
 return ( <>
   <Slider {...settings}>
    <div>
     <div className="cat-img-container my-b-shadow "> <span className="load-shine"></span></div>
     <div className="my-mother centered down-8 xs-down-5" ><span className="px13 loader-text bg-faded"><span className="load-shine"></span></span></div>
    </div>
    <div>
    <div className="cat-img-container my-b-shadow "> <span className="load-shine"></span></div>
     <div className="my-mother centered down-8 xs-down-5"><span className="px13 loader-text bg-faded"><span className="load-shine"></span></span></div>
    </div>
    <div>
    <div className="cat-img-container my-b-shadow "> <span className="load-shine"></span></div>
     <div className="my-mother centered down-8 xs-down-5"><span className="px13 loader-text bg-faded"><span className="load-shine"></span></span></div>
    </div>
    <div>
    <div className="cat-img-container my-b-shadow "> <span className="load-shine"></span></div>
     <div className="my-mother centered down-8 xs-down-5"><span className="px13 loader-text bg-faded"><span className="load-shine"></span></span></div>
    </div>
    <div>
    <div className="cat-img-container my-b-shadow "> <span className="load-shine"></span></div>
     <div className="my-mother centered down-8 xs-down-5"><span className="px13 loader-text bg-faded"><span className="load-shine"></span></span></div>
    </div>
    <div>
    <div className="cat-img-container my-b-shadow "> <span className="load-shine"></span></div>
     <div className="my-mother centered down-8 xs-down-5"><span className="px13 loader-text bg-faded"><span className="load-shine"></span></span></div>
    </div>
   </Slider>
 </> );
}
 
export default CatSkeleton;