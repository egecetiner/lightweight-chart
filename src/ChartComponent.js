import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export const ChartComponent = (props) => {
  const { data } = props;
  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const calculateSMA = (data, count) => {
      var avg = function (data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
          sum += data[i].close;
        }
        return sum / data.length;
      };
      var result = [];
      for (var i = count - 1, len = data.length; i < len; i++) {
        var val = avg(data.slice(i - count + 1, i));
        result.push({ time: data[i].time, value: val });
      }
      return result;
    };

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        backgroundColor: "#253248",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: {
          color: "#334158",
        },
        horzLines: {
          color: "#334158",
        },
      },
      priceScale: {
        borderColor: "#485c7b",
      },
      timeScale: {
        borderColor: "#485c7b",
      },
    });
    chart.timeScale().fitContent();

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
    });

    candleSeries.setData(data);

    var smaData = calculateSMA(data, 10);
    var smaLine = chart.addLineSeries({
      color: "rgba(4, 111, 232, 1)",
      lineWidth: 2,
    });
    smaLine.setData(smaData);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} />;
};
