import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userName = localStorage.getItem("userName");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );

        const newData = response.data.slice(0, 20).map((item: any) => ({
          x: item.id,
          y: item.userId,
        }));

        setChartData(newData);
      } catch (error) {
        console.error("Error fetching data from the API", error);
      }
    };

    fetchData();
  }, [isLoggedIn, navigate]);

  const chartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    colors: ["#008FFB"],
  };

  const chartTypes = ["line", "radar", "bar", "scatter", "treemap"];

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the HomePage,{" "}
          <span className="text-blue-500">{userName}</span>!
        </h1>
      </div>
      {chartTypes.map((chartType) => (
        <div className="mb-4" key={chartType}>
          <p className="text-center font-bold text-lg my-2">
            {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
          </p>
          <Chart
            options={chartOptions}
            series={[{ data: chartData }]}
            type={chartType as any}
            width="500"
          />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
