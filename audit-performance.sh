#!/bin/bash

# Lighthouse Performance Audit Script
# Chạy Lighthouse audit để đo lường hiệu suất và PWA compliance

echo "🚀 Bắt đầu Lighthouse audit cho Bicomex Web..."
echo "📊 URL: http://localhost:8080"
echo ""

# Kiểm tra nếu lighthouse đã được cài đặt
if ! command -v lighthouse &> /dev/null; then
    echo "⚠️  Lighthouse chưa được cài đặt. Đang cài đặt..."
    npm install -g lighthouse
fi

# Tạo thư mục reports nếu chưa có
mkdir -p reports

# Chạy Lighthouse audit với các categories chính
echo "🔍 Đang chạy Lighthouse audit..."
lighthouse http://localhost:8080 \
  --output html \
  --output-path ./reports/lighthouse-report.html \
  --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" \
  --form-factor=mobile \
  --throttling-method=simulate \
  --quiet

echo ""
echo "✅ Lighthouse audit hoàn tất!"
echo "📄 Báo cáo đã được lưu tại: ./reports/lighthouse-report.html"
echo ""

# Chạy audit cho desktop
echo "🖥️  Đang chạy audit cho desktop..."
lighthouse http://localhost:8080 \
  --output html \
  --output-path ./reports/lighthouse-desktop-report.html \
  --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" \
  --form-factor=desktop \
  --throttling-method=simulate \
  --quiet

echo ""
echo "✅ Desktop audit hoàn tất!"
echo "📄 Báo cáo desktop đã được lưu tại: ./reports/lighthouse-desktop-report.html"
echo ""

# Tạo báo cáo JSON cho phân tích chi tiết
echo "📈 Tạo báo cáo JSON cho phân tích..."
lighthouse http://localhost:8080 \
  --output json \
  --output-path ./reports/lighthouse-data.json \
  --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" \
  --form-factor=mobile \
  --quiet

echo ""
echo "🎉 Tất cả audit đã hoàn tất!"
echo "📁 Các báo cáo có sẵn trong thư mục 'reports/'"
echo ""
echo "📊 Để xem kết quả:"
echo "   - Mobile: reports/lighthouse-report.html"
echo "   - Desktop: reports/lighthouse-desktop-report.html"
echo "   - Raw Data: reports/lighthouse-data.json"
