import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData, revenueData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function Home() {

  return (
    <div className="home">
      {/* <FeaturedInfo /> */}
      <Chart data={userData} title="User Analytics" grid dataKey="New User" />
      <Chart data={revenueData} title="Revenue Analytics" grid dataKey="Revenue" />
      {/* <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div> */}
    </div>
  );
}