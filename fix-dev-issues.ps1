# Fix Development Issues Script
# Script để khắc phục vấn đề development server

Write-Host "🔧 BICOMEX WEB - FIX DEVELOPMENT ISSUES" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green
Write-Host ""

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: Vui lòng chạy script từ thư mục gốc của dự án" -ForegroundColor Red
    exit 1
}

Write-Host "🧹 Bước 1: Cleaning node_modules và cache..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "✅ Đã xóa node_modules" -ForegroundColor Green
}

if (Test-Path "package-lock.json") {
    Remove-Item -Force "package-lock.json"
    Write-Host "✅ Đã xóa package-lock.json" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Bước 2: Reinstalling dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependencies đã được cài đặt!" -ForegroundColor Green
Write-Host ""

Write-Host "🧹 Bước 3: Clearing Vite cache..." -ForegroundColor Yellow
if (Test-Path "node_modules/.vite") {
    Remove-Item -Recurse -Force "node_modules/.vite"
    Write-Host "✅ Đã xóa Vite cache" -ForegroundColor Green
}

if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✅ Đã xóa dist folder" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Bước 4: Starting development server..." -ForegroundColor Yellow
Write-Host "Dev server sẽ chạy mà không có Service Worker" -ForegroundColor Cyan
Write-Host ""

# Start dev server
npm run dev

Write-Host ""
Write-Host "💡 TROUBLESHOOTING TIPS:" -ForegroundColor Yellow
Write-Host "   - Service Worker đã được disable trong development mode" -ForegroundColor Gray
Write-Host "   - Nếu vẫn bị stuck, hãy hard refresh (Ctrl+Shift+R)" -ForegroundColor Gray
Write-Host "   - Kiểm tra DevTools Console để xem lỗi chi tiết" -ForegroundColor Gray
Write-Host "   - Đảm bảo không có extension nào can thiệp" -ForegroundColor Gray
