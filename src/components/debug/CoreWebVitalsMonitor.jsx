import React, { useState, useEffect } from 'react';
import usePerformanceMetrics from '../../hooks/usePerformanceMetrics';

/**
 * Component hiển thị Core Web Vitals realtime cho development
 */
const CoreWebVitalsMonitor = () => {
  const { metrics, getPerformanceGrade } = usePerformanceMetrics();
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);

  // Chỉ hiển thị trong development mode
  if (import.meta.env.PROD) {
    return null;
  }

  // Toggle visibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - 150,
        y: e.clientY - 20
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const getScoreColor = (score, thresholds) => {
    if (score === null) return '#gray';
    if (score <= thresholds.good) return '#10b981'; // green
    if (score <= thresholds.needs) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  const formatMetric = (value, unit = 'ms') => {
    if (value === null) return 'N/A';
    return `${Math.round(value)}${unit}`;
  };

  const grade = getPerformanceGrade();

  if (!isVisible) {
    return (
      <div 
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-lg text-xs cursor-pointer hover:bg-blue-700 z-50"
        onClick={() => setIsVisible(true)}
      >
        Show CWV (Ctrl+Shift+P)
      </div>
    );
  }

  return (
    <div 
      className="fixed bg-gray-900 text-white p-4 rounded-lg shadow-2xl text-xs font-mono z-50 select-none"
      style={{ left: position.x, top: position.y, width: '300px' }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex justify-between items-center mb-3 cursor-move">
        <h3 className="font-bold text-sm">Core Web Vitals</h3>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded text-xs font-bold ${
            grade >= 90 ? 'bg-green-600' : 
            grade >= 70 ? 'bg-yellow-600' : 'bg-red-600'
          }`}>
            {grade}/100
          </span>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>FCP (First Contentful Paint):</span>
          <span style={{ color: getScoreColor(metrics.fcp, { good: 1800, needs: 3000 }) }}>
            {formatMetric(metrics.fcp)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>LCP (Largest Contentful Paint):</span>
          <span style={{ color: getScoreColor(metrics.lcp, { good: 2500, needs: 4000 }) }}>
            {formatMetric(metrics.lcp)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>FID (First Input Delay):</span>
          <span style={{ color: getScoreColor(metrics.fid, { good: 100, needs: 300 }) }}>
            {formatMetric(metrics.fid)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>CLS (Cumulative Layout Shift):</span>
          <span style={{ color: getScoreColor(metrics.cls * 1000, { good: 100, needs: 250 }) }}>
            {formatMetric(metrics.cls * 1000, '')}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>TTFB (Time to First Byte):</span>
          <span style={{ color: getScoreColor(metrics.ttfb, { good: 800, needs: 1800 }) }}>
            {formatMetric(metrics.ttfb)}
          </span>
        </div>
        
        <div className="flex justify-between border-t border-gray-700 pt-2">
          <span>Load Time:</span>
          <span style={{ color: getScoreColor(metrics.loadTime, { good: 3000, needs: 5000 }) }}>
            {formatMetric(metrics.loadTime)}
          </span>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-400">
        Drag to move • Ctrl+Shift+P to toggle
      </div>
    </div>
  );
};

export default CoreWebVitalsMonitor;
