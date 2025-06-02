# Bicomex Web - Quick Start & Test Script
# Script nhanh để build, deploy và test performance

Write-Host "🚀 BICOMEX WEB - PERFORMANCE OPTIMIZATION SUITE" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
Write-Host ""

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: Vui lòng chạy script từ thư mục gốc của dự án" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Bước 1: Building production version..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Vui lòng kiểm tra lỗi và thử lại." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build thành công!" -ForegroundColor Green
Write-Host ""

Write-Host "🌐 Bước 2: Khởi chạy HTTP server..." -ForegroundColor Yellow
Write-Host "Server sẽ chạy tại: http://localhost:8080" -ForegroundColor Cyan
Write-Host ""

# Start HTTP server in background
Start-Process -WindowStyle Hidden -FilePath "python" -ArgumentList "-m","http.server","8080" -WorkingDirectory "dist"

# Wait for server to start
Start-Sleep -Seconds 2

Write-Host "✅ Server đã khởi chạy!" -ForegroundColor Green
Write-Host ""

Write-Host "🔍 Bước 3: Mở website để xem..." -ForegroundColor Yellow
Start-Process "http://localhost:8080"

Write-Host "✅ Website đã mở trong trình duyệt!" -ForegroundColor Green
Write-Host ""

Write-Host "📊 Bước 4: Các công cụ kiểm tra có sẵn:" -ForegroundColor Yellow
Write-Host "   🎯 Performance Panel: Mở DevTools để xem metrics" -ForegroundColor Gray
Write-Host "   📱 PWA Install: Nhấn nút install trong address bar" -ForegroundColor Gray
Write-Host "   🔧 Service Worker: Kiểm tra trong DevTools > Application" -ForegroundColor Gray
Write-Host ""

Write-Host "🚀 LIGHTHOUSE AUDIT:" -ForegroundColor Yellow
Write-Host "   Để chạy audit performance:" -ForegroundColor Gray
Write-Host "   PowerShell -ExecutionPolicy Bypass -File ./audit-performance.ps1" -ForegroundColor Cyan
Write-Host ""

Write-Host "📝 Các tính năng tối ưu đã được kích hoạt:" -ForegroundColor Green
Write-Host "   ✅ Service Worker với intelligent caching" -ForegroundColor Gray
Write-Host "   ✅ PWA installation prompts" -ForegroundColor Gray
Write-Host "   ✅ Core Web Vitals monitoring" -ForegroundColor Gray
Write-Host "   ✅ Resource preloading & critical CSS" -ForegroundColor Gray
Write-Host "   ✅ Bundle optimization & compression" -ForegroundColor Gray
Write-Host ""

Write-Host "🎉 BICOMEX WEB READY TO GO!" -ForegroundColor Green
Write-Host "💡 Tip: Mở DevTools để xem Performance Panel" -ForegroundColor Yellow
Write-Host ""

# Keep the script running to show server status
Write-Host "⏸️  Nhấn Ctrl+C để dừng server và thoát..." -ForegroundColor Cyan
Write-Host ""

try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} catch {
    Write-Host ""
    Write-Host "🛑 Đang dừng server..." -ForegroundColor Yellow
    
    # Kill Python HTTP server
    Get-Process | Where-Object {$_.ProcessName -eq "python" -and $_.CommandLine -like "*http.server*8080*"} | Stop-Process -Force
    
    Write-Host "✅ Server đã dừng. Cảm ơn bạn đã sử dụng Bicomex Web!" -ForegroundColor Green
}
