import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DoctorCard from "./DoctorCard";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Slider({ medcins }) {
  const doctorCards = medcins.map((doctor) => (
    <DoctorCard
      key={doctor.Id_Medcin}
      name={`${doctor.Nom}.${doctor.Prenom.charAt(0).toUpperCase()}`}
      specialty={doctor.Specialite_Medcin}
      profileImage={doctor.ProfileImage}
    />
  ));

  return (
    <div className="pt-24 mr-12 ml-12 ">
      <Carousel infinite responsive={responsive}>
        {doctorCards}
      </Carousel>
    </div>
  );
}
