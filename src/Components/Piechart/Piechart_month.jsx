import React, { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";
import './summaryItem_month.css'
import { getToken } from "../Login/services/auth";


export const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  const cal = (value) => {
    const h = Math.round(value/60)
    const m = Math.round(value%60)
    return (`${h} hours ${m} minutes`)
  }

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#36a2eb">
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="#CCF0DD"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${payload.name}, Total time : ${cal(value)}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function PieChartMonth() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [summary, setSummary] = useState([]);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  //Fetch data from database to show schedule
  const fetchData = () => {
    axios
    .get(`${import.meta.env.VITE_API_URL}/users/me/activities/summaryMonth`, {headers: {authorization: `Bearer ${getToken()}`}})
    .then((res) => {
      const datas = res.data;
      const summary = datas.map((data) => ({
        user: data._id.user,
        month: data._id.month,
        type: data._id.type,
        hour: (data.total_hour),
        minute: data.total_minute,
        total: data.total
      }))
      setSummary(summary);
    })
    .catch((err) => {
      alert(err)
    })
  }


  useEffect(() => {
    fetchData();
  }, [])

  console.table(summary)

  const data = summary.map((data) => (
    {
      name: data.type,
      value: data.total,
    }
  ))

  const cal = (value) => {
    const h = Math.round(value/60)
    const m = Math.round(value%60)
    return (`${h} hours ${m} minutes`)
  }

  const COLORS = ['#007CBE', '#009689','#FFA3AF', '#FBAF00', '#FF8042','#FFBD74','#00AF54' ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="p-container">
      <div  className="pieChart">
        <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={onPieEnter}
            labelLine={false}
            label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
          </Pie>
        </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="summary-card">
                {summary.map((data, index) => (
                    <div className="card" key={index}>
                        <div className="card-content" key={index}>
                                <h3>{`Month : ${data.month}`}</h3>
                                <p>{`Type of actvity : ${data.type}`}</p>
                                <p>{`Total time hour : ${cal(data.total)}`}</p>
                        </div>
                    </div>
                  ))}
        </div>
    </div>
  );
}


