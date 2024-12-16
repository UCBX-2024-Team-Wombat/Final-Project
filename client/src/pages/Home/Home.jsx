import myImage from "../../assets/HomeImage.png";
import { useGlobalContext } from "../../utils/GlobalState";
import HomeStyleRouter from "./HomeStyleRouter";
import "./home.css";

const Home = () => {
  const [state] = useGlobalContext();
  const styleRouter = new HomeStyleRouter(state);

  return (
    <>
      <div>
        <div>
          {state.isMobile ? (
            <>
              <h4 className="text-center">Welcome to</h4>
              <h1 className="text-center pb-3 mb-2">Skill Share Hub!</h1>
            </>
          ) : (
            <h1 className="text-center pb-3 mb-2">
              Welcome to Skill Share Hub!
            </h1>
          )}
        </div>
        <div className="d-flex justify-content-center">
          <p className={styleRouter.description}>
            This is a platform designed to facilitate skill exchanges between
            users. Here, you can trade your skills with others to learn
            something new. Enjoy!
          </p>
        </div>
        <img
          className={styleRouter.image}
          src={myImage}
          alt="thinking/skills image"
        />
      </div>
    </>
  );
};

export default Home;
