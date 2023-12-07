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
  };

  const chartTypes = ["line", "radar", "bar", "scatter", "treemap"];
  const chartColors = ["#008FFB", "#00C454", "#FFBB44", "#FF6464", "#A67BFF"];

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the HomePage,{" "}
          <span className="text-blue-500">{userName}</span>!
        </h1>
        <button
          onClick={handleLogOut}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Log Out
        </button>
      </div>
      {chartTypes.map((chartType, index) => (
        <div className="mb-4" key={chartType}>
          <p className="text-center font-bold text-lg my-2">
            {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
          </p>
          <Chart
            options={{ ...chartOptions, colors: [chartColors[index]] }}
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
