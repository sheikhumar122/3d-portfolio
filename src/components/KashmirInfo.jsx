import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";

const KashmirInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Hi, I'm
        <span className='font-semibold mx-2 text-white'>Umar mohammad sheikh</span>
        👋
        <br />
        A Software Engineer from Kashmir
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          This is the winter view of Kashmir <br /> Let's explore the beauty of the Kashmir
        </p>

        <Link to='/contact' className='neo-brutalism-white neo-btn'>
        Let's talk
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

//   if (currentStage === 3) {
//     return (
//       <div className='info-box'>
//         <p className='font-medium text-center sm:text-xl'>
//           Led multiple projects to success over the years. <br /> Curious about the impact?
//         </p>

//         <Link to='/projects' className='neo-brutalism-white neo-btn'>
//           Visit my portfolio
//           <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
//         </Link>
//       </div>
//     );
//   }

//   if (currentStage === 4) {
//     return (
//       <div className='info-box'>
//       <p className='font-medium sm:text-xl text-center'>
//         Need a project done or looking for a dev? <br/> I'm just a few keystrokes away
//       </p>

//       <Link to='/contact' className='neo-brutalism-white neo-btn'>
//         Let's talk
//         <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
//       </Link>
//     </div>
//     );
//   }

  return null;
};

export default KashmirInfo;
