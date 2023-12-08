import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import axios from "axios";
import { useAuth } from "../Hooks/useAuth";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!user) {
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
  }, [user, navigate]);

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
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto my-4 px-4">
      <div className="mb-4 flex text-center flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 ">
          {user ? `Welcome, ${user.name}!` : "Welcome to the HomePage!"}
        </h1>
        <button
          onClick={handleLogOut}
          className="bg-[#553fff] hover:bg-[#3d3bb7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {user ? "Logout 😦" : "User not available 😞"}
        </button>
      </div>
      {chartTypes.map((chartType, index) => (
        <div className="mb-4" key={chartType}>
          <p className="text-center font-bold text-lg my-2">
            {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
          </p>
          <div className="flex justify-center">
            <Chart
              options={{ ...chartOptions, colors: [chartColors[index]] }}
              series={[{ data: chartData }]}
              type={chartType as any}
              width="500"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
