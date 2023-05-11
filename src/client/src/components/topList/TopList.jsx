import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from '@mui/icons-material';
import { useRef, useState } from 'react';
import ItemList from '../itemList/ItemList';
import './topList.css';
import { axiosInstance3 } from '../../axios';
import ItemTopList from '../itemTopList/ItemTopList';

export default function List({ movieDataList, title }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [openDialog, handleDisplay] = useState(false);
  const [movies, setMovies] = useState([]);
  console.log('movieDataList At top List: ', movieDataList);

  async function fetchMoviesData() {
    const request = await axiosInstance3.get(
      'http://localhost:3000/api/user/profiles/my_list?profile_id=2&page=1&pageSize=999',
    );
    console.log('request: ', request.data.items[0].MyListMovies);
    setMovies(request.data.items[0].MyListMovies);
    return request;
  }

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === 'left' && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === 'right' && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick('left')}
          style={{ display: !isMoved && 'none' }}
        />
        <div className="container" ref={listRef}>
          <ItemTopList index={0} movieData={movieDataList[0]} />
          <ItemTopList index={1} movieData={movieDataList[1]} />
          <ItemTopList index={2} movieData={movieDataList[2]} />
          <ItemTopList index={3} movieData={movieDataList[3]} />
          <ItemTopList index={4} movieData={movieDataList[4]} />
          <ItemTopList index={5} movieData={movieDataList[5]} />
          <ItemTopList index={6} movieData={movieDataList[6]} />
          <ItemTopList index={7} movieData={movieDataList[7]} />
          <ItemTopList index={8} movieData={movieDataList[8]} />
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
}
