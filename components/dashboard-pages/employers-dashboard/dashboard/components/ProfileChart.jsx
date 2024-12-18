
'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from "chart.js";
import { useSelector } from "react-redux";
import { Line, Bar } from "react-chartjs-2";
// import { faker } from "@faker-js/faker";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);


export const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        stepSize: 1
      }
    }
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },

    tooltips: {
      position: "nearest",
      mode: "index",
      intersect: false,
      yPadding: 10,
      xPadding: 10,
      caretSize: 4,
      backgroundColor: "rgba(72, 241, 12, 1)",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "#1967d2",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 4,
    },
  },
};





const ProfileChart = () => {

  const { statistics } = useSelector((state) => state.dashboard);

  const labels = statistics?.jobsByCompany.map(item =>
    item.companyName
  );
  const values = statistics?.jobsByCompany.map(item =>
    item.jobCount
  );


  const data = {
    labels,
    datasets: [
      {
        label: "Jobs",
        borderColor: "#1967d2",
        backgroundColor: "#1967d2",
        data: values,
        fill: false,
      },
    ],
  };

  useEffect(() => {
    console.log(labels)
  }, [statistics])

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Jobs By Company</h4>
        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          {/* <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 year</option>
          </select> */}
        </div>
      </div>
      {/* End widget top bar */}

      <div className="widget-content">
        <Bar options={options} data={data} />
      </div>
      {/* End  profile chart */}
    </div>
  );
};

export default ProfileChart;
