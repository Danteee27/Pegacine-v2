import Navbar from '../../components/navbar/Navbar';
import HighLight from '../../components/highlight/HighLight';
import List from '../../components/list/List';
import './series.css';
import TopList from "../../components/topList/TopList";

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <div className={"genres"}></div>
            <HighLight />
            <TopList />
            <TopList />
            <TopList />
            <TopList />
        </div>
    );
};

export default Home;
