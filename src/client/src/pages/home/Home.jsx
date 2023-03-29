import Navbar from '../../components/navbar/Navbar';
import HighLight from '../../components/highlight/HighLight';
import List from '../../components/list/List';
import './home.scss';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <HighLight />
      <List />
      <List />
      <List />
      <List />
    </div>
  );
};

export default Home;
