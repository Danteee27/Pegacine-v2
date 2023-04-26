import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
} from '@mui/icons-material';
import { useRef, useState } from 'react';
import ItemList from '../itemList/ItemList';
import './topList.css';
import ItemTopList from "../itemTopList/ItemTopList";

export default function TopList() {
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);

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
            <span className="listTitle">Action movie</span>
            <div className="wrapper">
                <ArrowBackIosOutlined
                    className="sliderArrow left"
                    onClick={() => handleClick('left')}
                    style={{ display: !isMoved && 'none' }}
                />
                <div className="container" ref={listRef}>
                    <ItemTopList index={0} />
                    <ItemTopList index={1} />
                    <ItemTopList index={2} />
                    <ItemTopList index={3} />
                    <ItemTopList index={4} />
                    <ItemTopList index={5} />
                    <ItemTopList index={6} />
                    <ItemTopList index={7} />
                    <ItemTopList index={8} />
                    <ItemTopList index={9} />
                </div>
                <ArrowForwardIosOutlined
                    className="sliderArrow right"
                    onClick={() => handleClick('right')}
                />
            </div>
        </div>
    );
}
