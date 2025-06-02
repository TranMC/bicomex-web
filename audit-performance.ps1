# Lighthouse Performance Audit Script for Windows PowerShell
# Chạy Lighthouse audit để đo lường hiệu suất và PWA compliance

Write-Host "🚀 Bắt đầu Lighthouse audit cho Bicomex Web..." -ForegroundColor Green
Write-Host "📊 URL: http://localhost:8080" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra nếu lighthouse đã được cài đặt
try {
    lighthouse --version | Out-Null
    Write-Host "✅ Lighthouse đã sẵn sàng" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Lighthouse chưa được cài đặt. Đang cài đặt..." -ForegroundColor Yellow
    npm install -g lighthouse
}

# Tạo thư mục reports nếu chưa có
if (!(Test-Path "reports")) {
    New-Item -ItemType Directory -Path "reports"
    Write-Host "📁 Đã tạo thư mục reports" -ForegroundColor Green
}

# Chạy Lighthouse audit với các categories chính
Write-Host "🔍 Đang chạy Lighthouse audit cho mobile..." -ForegroundColor Yellow
lighthouse http://localhost:8080 `
  --output html `
  --output-path ./reports/lighthouse-report.html `
  --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" `
  --form-factor=mobile `
  --throttling-method=simulate `
  --quiet

Write-Host ""
Write-Host "✅ Mobile audit hoàn tất!" -ForegroundColor Green
Write-Host "📄 Báo cáo đã được lưu tại: ./reports/lighthouse-report.html" -ForegroundColor Cyan
Write-Host ""

# Chạy audit cho desktop
Write-Host "🖥️  Đang chạy audit cho desktop..." -ForegroundColor Yellow
lighthouse http://localhost:8080 `
  --output html `
  --output-path ./reports/lighthouse-desktop-report.html `
  --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" `
  --form-factor=desktop `
  --throttling-method=simulate `
  --quiet

Write-Host ""
Write-Host "✅ Desktop audit hoàn tất!" -ForegroundColor Green
Write-Host "📄 Báo cáo desktop đã được lưu tại: ./reports/lighthouse-desktop-report.html" -ForegroundColor Cyan
Write-Host ""

# Tạo báo cáo JSON cho phân tích chi tiết
Write-Host "📈 Tạo báo cáo JSON cho phân tích..." -ForegroundColor Yellow
lighthouse http://localhost:8080 `
  --output json `
  --output-path ./reports/lighthouse-data.json `
  --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" `
  --form-factor=mobile `
  --quiet

Write-Host ""
Write-Host "🎉 Tất cả audit đã hoàn tất!" -ForegroundColor Green
Write-Host "📁 Các báo cáo có sẵn trong thư mục 'reports/'" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Để xem kết quả:" -ForegroundColor White
Write-Host "   - Mobile: reports/lighthouse-report.html" -ForegroundColor Gray
Write-Host "   - Desktop: reports/lighthouse-desktop-report.html" -ForegroundColor Gray
Write-Host "   - Raw Data: reports/lighthouse-data.json" -ForegroundColor Gray
Write-Host ""
Write-Host "💡 Mở báo cáo bằng lệnh: start reports/lighthouse-report.html" -ForegroundColor Yellow
