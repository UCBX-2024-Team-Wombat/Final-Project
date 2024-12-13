import myImage from '../../assets/HomeImage.png';

const Home = () => {
  return (
    <>
      <div>
      <h1 className="text-center pb-3 mb-2">Welcome to the Skill Share Hub</h1>
      <p className="text-center pb-3 mb-2">This is a platform designed to facilitate skill exchanges between users. Here, you can trade your skills with others to learn something new. Enjoy!</p>
      <img className="mx-auto d-block" style={{ width:'400px'}}  src={myImage} alt="thinking/skills image" />
      </div>
    </>
  );
};

export default Home;
