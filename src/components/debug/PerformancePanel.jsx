import React, { useState, useEffect } from 'react';
import usePerformanceMetrics from '../../hooks/usePerformanceMetrics';

/**
 * Component hiển thị Performance Panel trong development mode
 * Cho phép theo dõi Core Web Vitals real-time
 */
const PerformancePanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState({});
  const performanceData = usePerformanceMetrics();

  useEffect(() => {
    if (performanceData) {
      setMetrics(performanceData);
    }
  }, [performanceData]);

  // Chỉ hiển thị trong development mode
  if (import.meta.env.PROD) {
    return null;
  }

  const getScoreColor = (value, thresholds) => {
    if (!value) return '#gray';
    if (value <= thresholds.good) return '#22c55e'; // green
    if (value <= thresholds.needsImprovement) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const formatTime = (ms) => {
    if (!ms) return 'N/A';
    return `${Math.round(ms)}ms`;
  };

  const thresholds = {
    fcp: { good: 1800, needsImprovement: 3000 },
    lcp: { good: 2500, needsImprovement: 4000 },
    fid: { good: 100, needsImprovement: 300 },
    cls: { good: 0.1, needsImprovement: 0.25 },
    ttfb: { good: 800, needsImprovement: 1800 }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          zIndex: 10000,
          fontSize: '12px',
          fontWeight: 'bold'
        }}
      >
        PERF
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      minWidth: '300px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      zIndex: 10000,
      fontSize: '14px',
      fontFamily: 'monospace'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
          Core Web Vitals
        </h3>
        <button
          onClick={() => setIsVisible(false)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '0',
            width: '24px',
            height: '24px'
          }}
        >
          ×
        </button>
      </div>

      <div style={{ display: 'grid', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>FCP (First Contentful Paint):</span>
          <span style={{ 
            color: getScoreColor(metrics.fcp, thresholds.fcp),
            fontWeight: 'bold'
          }}>
            {formatTime(metrics.fcp)}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>LCP (Largest Contentful Paint):</span>
          <span style={{ 
            color: getScoreColor(metrics.lcp, thresholds.lcp),
            fontWeight: 'bold'
          }}>
            {formatTime(metrics.lcp)}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>FID (First Input Delay):</span>
          <span style={{ 
            color: getScoreColor(metrics.fid, thresholds.fid),
            fontWeight: 'bold'
          }}>
            {formatTime(metrics.fid)}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>CLS (Cumulative Layout Shift):</span>
          <span style={{ 
            color: getScoreColor(metrics.cls, thresholds.cls),
            fontWeight: 'bold'
          }}>
            {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>TTFB (Time to First Byte):</span>
          <span style={{ 
            color: getScoreColor(metrics.ttfb, thresholds.ttfb),
            fontWeight: 'bold'
          }}>
            {formatTime(metrics.ttfb)}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Load Time:</span>
          <span style={{ fontWeight: 'bold' }}>
            {formatTime(metrics.loadTime)}
          </span>
        </div>
      </div>

      <div style={{ 
        marginTop: '12px', 
        paddingTop: '12px',
        borderTop: '1px solid #e5e7eb',
        fontSize: '12px',
        color: '#6b7280'
      }}>
        <div>🟢 Good | 🟡 Needs Improvement | 🔴 Poor</div>
        <div style={{ marginTop: '4px' }}>
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default PerformancePanel;
