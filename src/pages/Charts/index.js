/* eslint-disable consistent-return */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as echarts from 'echarts';
import styles from './index.module.less';

const timeRanges = [
  { key: 'realtime', label: '实时' },
  { key: '1month', label: '近1月' },
  { key: '3months', label: '近3月' },
  { key: '6months', label: '近6月' },
  { key: '1year', label: '近1年' },
  { key: '3years', label: '近3年' },
];

const fetchChartData = async range => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/chart-data?range=${range}`
    );
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.error('获取图表数据失败:', error);
    return [];
  }
};

function useECharts(data, onHover) {
  const chartRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (instanceRef.current) {
      instanceRef.current.dispose();
    }

    const chart = echarts.init(chartRef.current);
    instanceRef.current = chart;

    const dates = data.map(item => item.date);
    const prices = data.map(item => item.price);
    const yields = data.map(item => item.yield);

    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 0,
        padding: 0,
        textStyle: {
          color: 'rgba(0,0,0,0)',
          fontSize: 0,
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#ccc',
            width: 1,
          },
        },
        formatter: () => '',
      },
      legend: {
        show: false,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: [
        {
          type: 'value',
          name: '',
          min: 0,
          max: 120,
          position: 'left',
          axisLine: {
            lineStyle: {
              color: '#e5e5e5',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#e5e5e5',
              type: 'dashed',
            },
          },
        },
        {
          type: 'value',
          name: '',
          min: 0,
          max: 30,
          position: 'right',
          axisLine: {
            lineStyle: {
              color: '#e5e5e5',
            },
          },
          splitLine: { show: false },
          axisLabel: {
            formatter: '{value}%',
          },
        },
      ],
      series: [
        {
          name: '中间价',
          type: 'line',
          yAxisIndex: 0,
          data: prices,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            color: '#dc5037',
            width: 2,
          },
          itemStyle: {
            color: '#dc5037',
          },
          emphasis: {
            itemStyle: {
              color: '#dc5037',
            },
          },
        },
        {
          name: '到期收益率',
          type: 'line',
          yAxisIndex: 1,
          data: yields,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            color: '#dcb966',
            width: 2,
          },
          itemStyle: {
            color: '#dcb966',
          },
          emphasis: {
            itemStyle: {
              color: '#dcb966',
            },
          },
        },
      ],
    };

    chart.setOption(option);

    chart.on('showTip', params => {
      if (onHover && data.length > 0) {
        let index = 0;
        if (params.batch && params.batch.length > 0) {
          index = params.batch[0].dataIndex;
        } else if (params.dataIndex !== undefined) {
          index = params.dataIndex;
        }
        const hoverData = data[index];
        if (hoverData) {
          onHover(hoverData);
        }
      }
    });

    chart.on('hideTip', () => {
      if (onHover) {
        onHover(null);
      }
    });

    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (instanceRef.current) {
        instanceRef.current.off('showTip');
        instanceRef.current.off('hideTip');
        instanceRef.current.dispose();
        instanceRef.current = null;
      }
    };
  }, [data, onHover]);

  return chartRef;
}

export default function ChartsPage() {
  const [currentRange, setCurrentRange] = useState('6months');
  const [data, setData] = useState([]);
  const [hoverData, setHoverData] = useState(null);

  const handleHover = useCallback(data => {
    setHoverData(data);
  }, []);

  const chartRef = useECharts(data, handleHover);

  const loadData = useCallback(async range => {
    setHoverData(null);
    const result = await fetchChartData(range);
    setData(result);
  }, []);

  useEffect(() => {
    loadData(currentRange);
  }, [currentRange, loadData]);

  const handleRangeChange = key => {
    setCurrentRange(key);
  };

  const latestData = data[data.length - 1];
  const displayData = hoverData || latestData;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>历史走势</h1>
        <div className={styles.stats}>
          <span className={styles.date}>
            {displayData?.date || '2026-05-14'}
          </span>
          <div className={styles.statItem}>
            <span
              className={styles.dot}
              style={{ backgroundColor: '#dc5037' }}
            ></span>
            <span className={styles.label}>中间价</span>
            <span className={styles.value} style={{ color: '#dc5037' }}>
              +{displayData?.price || 0}
            </span>
          </div>
          <div className={styles.statItem}>
            <span
              className={styles.dot}
              style={{ backgroundColor: '#dcb966' }}
            ></span>
            <span className={styles.label}>到期收益率</span>
            <span className={styles.value} style={{ color: '#dcb966' }}>
              +{displayData?.yield || 0}%
            </span>
          </div>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <div
          ref={chartRef}
          id="echarts-chart"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className={styles.rangeButtons}>
        {timeRanges.map(item => (
          <button
            type="button"
            key={item.key}
            className={`${styles.rangeBtn} ${
              currentRange === item.key ? styles.active : ''
            }`}
            onClick={() => handleRangeChange(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
