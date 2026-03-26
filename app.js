// 全球风险预警实时分析系统 - 主 JavaScript 文件

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('全球风险预警系统初始化...');
    
    // 初始化时间显示
    initTimeDisplay();
    
    // 初始化 Tab 切换
    initTabSwitching();
    
    // 初始化地图
    initMap();
    
    // 初始化图表
    initCharts();
    
    // 初始化地图图层控制
    initMapLayerControls();
    
    // 初始化设置页面交互
    initSettingsInteractions();
    
    console.log('系统初始化完成！');
});

// ==================== 时间显示 ====================
function initTimeDisplay() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        updateTime(timeElement);
        setInterval(() => updateTime(timeElement), 1000);
    }
}

function updateTime(element) {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Shanghai'
    };
    element.textContent = `当前时间：${now.toLocaleString('zh-CN', options)}`;
}

// ==================== Tab 切换 ====================
function initTabSwitching() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有 active 类
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加 active 类到当前选中的 tab
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            console.log(`切换到标签页：${targetTab}`);
        });
    });
}

// ==================== 地图初始化 ====================
let map = null;
let shippingLayer = null;
let airLayer = null;
let riskLayer = null;

function initMap() {
    const mapContainer = document.getElementById('world-map');
    if (!mapContainer) {
        console.error('未找到地图容器 #world-map');
        return;
    }
    
    try {
        // 创建地图，中心点设为赤道
        map = L.map('world-map').setView([20, 0], 2);
        
        // 添加底图（使用 CartoDB 的暗色主题）
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);
        
        // 初始化各图层（初始为空）
        initShippingLayer();
        initAirLayer();
        initRiskLayer();
        
        // 默认显示航运线路
        showShippingLayer();
        
        console.log('地图初始化成功');
    } catch (error) {
        console.error('地图初始化失败:', error);
    }
}

// ==================== 航运线路图层 ====================
function initShippingLayer() {
    shippingLayer = L.layerGroup();
    
    // 添加示例航运线路
    const shippingRoutes = [
        {
            name: "中欧航线",
            path: [[31.2304, 121.4737], [1.3521, 103.8198], [1.2897, 103.8501], [-25.2744, -57.5759], [51.5074, -0.1278]],
            status: "normal"
        },
        {
            name: "中美航线",
            path: [[31.2304, 121.4737], [35.6762, 139.6503], [37.7749, -122.4194]],
            status: "warning"
        },
        {
            name: "中东航线",
            path: [[31.2304, 121.4737], [25.2048, 55.2708], [30.0444, 31.2357]],
            status: "high-risk"
        }
    ];
    
    shippingRoutes.forEach(route => {
        const color = route.status === 'high-risk' ? '#ff4444' : route.status === 'warning' ? '#ffa500' : '#44aa44';
        const polyline = L.polyline(route.path, {
            color: color,
            weight: 3,
            opacity: 0.8,
            dashArray: '10, 10'
        }).bindPopup(`<strong>${route.name}</strong><br>状态：${route.status === 'high-risk' ? '高风险' : route.status === 'warning' ? '警告' : '正常'}`);
        
        shippingLayer.addLayer(polyline);
        
        // 添加港口标记
        route.path.forEach((port, index) => {
            const marker = L.circleMarker(port, {
                radius: 6,
                fillColor: color,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup(`${route.name} - 港口 ${index + 1}`);
            
            shippingLayer.addLayer(marker);
        });
    });
}

function showShippingLayer() {
    if (map && shippingLayer) {
        shippingLayer.addTo(map);
        if (airLayer) map.removeLayer(airLayer);
        if (riskLayer) map.removeLayer(riskLayer);
    }
}

// ==================== 空运线路图层 ====================
function initAirLayer() {
    airLayer = L.layerGroup();
    
    // 添加示例空运线路
    const airRoutes = [
        {
            name: "亚洲 - 欧洲空运",
            path: [[39.9042, 116.4074], [55.7558, 37.6173], [52.5200, 13.4050]],
            frequency: "每日 3 班"
        },
        {
            name: "亚洲 - 北美空运",
            path: [[35.6762, 139.6503], [47.6062, -122.3321], [37.7749, -122.4194]],
            frequency: "每日 5 班"
        },
        {
            name: "中国 - 东南亚空运",
            path: [[22.3193, 114.1694], [1.3521, 103.8198], [-6.2088, 106.8456]],
            frequency: "每日 8 班"
        }
    ];
    
    airRoutes.forEach(route => {
        const polyline = L.polyline(route.path, {
            color: '#4488ff',
            weight: 2,
            opacity: 0.9,
            dashArray: '5, 5'
        }).bindPopup(`<strong>${route.name}</strong><br>频率：${route.frequency}`);
        
        airLayer.addLayer(polyline);
        
        // 添加机场标记
        route.path.forEach((airport, index) => {
            const marker = L.circleMarker(airport, {
                radius: 5,
                fillColor: '#4488ff',
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.9
            }).bindPopup(`${route.name} - 机场 ${index + 1}`);
            
            airLayer.addLayer(marker);
        });
    });
}

function showAirLayer() {
    if (map && airLayer) {
        airLayer.addTo(map);
        if (shippingLayer) map.removeLayer(shippingLayer);
        if (riskLayer) map.removeLayer(riskLayer);
    }
}

// ==================== 风险热点图层 ====================
function initRiskLayer() {
    riskLayer = L.layerGroup();
    
    // 添加风险热点
    const riskPoints = [
        {
            location: [46.5197, 3.0588],
            name: "红海区域",
            level: "high",
            description: "航运安全威胁，保险费用上涨 300%"
        },
        {
            location: [36.7783, -119.4179],
            name: "美国西海岸",
            level: "medium",
            description: "港口拥堵，平均等待时间 7 天"
        },
        {
            location: [51.1657, 10.4515],
            name: "欧洲能源危机",
            level: "high",
            description: "天然气价格波动，影响生产成本"
        },
        {
            location: [-14.2350, -51.9253],
            name: "南美供应链",
            level: "low",
            description: "轻微波动，整体稳定"
        },
        {
            location: [30.3753, 69.3451],
            name: "中亚地区",
            level: "medium",
            description: "陆路运输受限"
        }
    ];
    
    riskPoints.forEach(point => {
        const color = point.level === 'high' ? '#ff0000' : point.level === 'medium' ? '#ffa500' : '#ffff00';
        const radius = point.level === 'high' ? 20 : point.level === 'medium' ? 15 : 10;
        
        const circle = L.circle(point.location, {
            color: color,
            fillColor: color,
            fillOpacity: 0.5,
            radius: 50000
        }).bindPopup(`<strong>${point.name}</strong><br>风险等级：${point.level === 'high' ? '高' : point.level === 'medium' ? '中' : '低'}<br>${point.description}`);
        
        riskLayer.addLayer(circle);
        
        // 添加中心标记
        const marker = L.circleMarker(point.location, {
            radius: radius,
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        });
        
        riskLayer.addLayer(marker);
    });
}

function showRiskLayer() {
    if (map && riskLayer) {
        riskLayer.addTo(map);
        if (shippingLayer) map.removeLayer(shippingLayer);
        if (airLayer) map.removeLayer(airLayer);
    }
}

// ==================== 地图图层控制 ====================
function initMapLayerControls() {
    const controlButtons = document.querySelectorAll('.control-btn');
    
    controlButtons.forEach(button => {
        button.addEventListener('click', function() {
            const layerType = this.getAttribute('data-layer');
            
            // 移除所有按钮的 active 类
            controlButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 切换图层
            if (layerType === 'shipping') {
                showShippingLayer();
            } else if (layerType === 'air') {
                showAirLayer();
            } else if (layerType === 'risk') {
                showRiskLayer();
            }
            
            console.log(`切换到图层：${layerType}`);
        });
    });
}

// ==================== 图表初始化 ====================
let energyChart = null;
let policyTrendChart = null;

function initCharts() {
    // 延迟初始化，确保 DOM 已加载
    setTimeout(() => {
        initEnergyChart();
        initPolicyTrendChart();
    }, 500);
}

function initEnergyChart() {
    const ctx = document.getElementById('energy-chart');
    if (!ctx) return;

    try {
        // 模拟K线数据: [开盘, 收盘, 最高, 最低]
        const candleData = [
            { open: 85.2, close: 86.1, high: 86.5, low: 84.8 },
            { open: 86.1, close: 85.8, high: 86.4, low: 85.5 },
            { open: 85.8, close: 87.2, high: 87.6, low: 85.5 },
            { open: 87.2, close: 86.9, high: 87.8, low: 86.5 },
            { open: 86.9, close: 88.1, high: 88.5, low: 86.7 },
            { open: 88.1, close: 87.4, high: 88.3, low: 86.9 }
        ];

        const labels = ['3/20', '3/21', '3/22', '3/23', '3/24', '3/25'];

        // 计算涨跌柱状图数据
        const priceChanges = candleData.map(d => d.close - d.open);
        const colors = priceChanges.map(change =>
            change >= 0 ? '#f87171' : '#34d399'
        );

        energyChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '涨跌',
                        data: priceChanges,
                        backgroundColor: colors,
                        borderColor: colors,
                        borderWidth: 0,
                        barPercentage: 0.5,
                        categoryPercentage: 0.8
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        titleColor: '#e2e8f0',
                        bodyColor: '#e2e8f0',
                        borderColor: 'rgba(96, 165, 250, 0.3)',
                        borderWidth: 1,
                        padding: 8,
                        callbacks: {
                            title: function(items) {
                                return items[0].label;
                            },
                            label: function(context) {
                                const idx = context.dataIndex;
                                const data = candleData[idx];
                                const change = (data.close - data.open).toFixed(2);
                                const percent = ((change / data.open) * 100).toFixed(1);
                                return [
                                    `开盘: $${data.open.toFixed(2)}`,
                                    `收盘: $${data.close.toFixed(2)}`,
                                    `最高: $${data.high.toFixed(2)}`,
                                    `最低: $${data.low.toFixed(2)}`,
                                    `涨跌: ${change > 0 ? '+' : ''}${change} (${percent}%)`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            font: { size: 9 },
                            color: '#64748b',
                            maxRotation: 0
                        },
                        border: { display: false }
                    },
                    y: {
                        position: 'right',
                        grid: {
                            color: 'rgba(255,255,255,0.03)',
                            drawBorder: false
                        },
                        ticks: {
                            font: { size: 9 },
                            color: '#64748b',
                            callback: function(value) {
                                return (value > 0 ? '+' : '') + value.toFixed(1);
                            }
                        },
                        border: { display: false }
                    }
                },
                layout: {
                    padding: { top: 5, bottom: 0, left: 0, right: 0 }
                }
            }
        });
    } catch (error) {
        console.error('能源图表初始化失败:', error);
    }
}

function initPolicyTrendChart() {
    const ctx = document.getElementById('policy-trend-chart');
    if (!ctx) return;
    
    try {
        policyTrendChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['政策收紧', '中性', '政策放松'],
                datasets: [{
                    label: '政策数量',
                    data: [12, 8, 5],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(255, 205, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 2
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('政策趋势图表初始化失败:', error);
    }
}

// ==================== 设置页面交互 ====================
function initSettingsInteractions() {
    // 范围滑块值显示
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(input => {
        input.addEventListener('input', function() {
            const valueSpan = this.parentElement.querySelector('.range-value');
            if (valueSpan) {
                let displayValue = this.value;
                if (this.id.includes('threshold') && !this.id.includes('port')) {
                    displayValue += '%';
                }
                valueSpan.textContent = displayValue;
            }
        });
    });
    
    // 保存配置按钮
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            alert('配置已保存！\n\n注意：此为演示版本，实际配置需要连接后端服务。');
        });
    }
    
    // 恢复默认按钮
    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (confirm('确定要恢复默认配置吗？')) {
                // 重置所有滑块
                document.getElementById('freight-threshold').value = 10;
                document.getElementById('exchange-threshold').value = 5;
                document.getElementById('port-threshold').value = 7;
                document.getElementById('payment-threshold').value = 20;
                
                // 触发 input 事件更新显示值
                document.querySelectorAll('input[type="range"]').forEach(input => {
                    input.dispatchEvent(new Event('input'));
                });
                
                alert('配置已恢复默认值！');
            }
        });
    }
    
    // 决策输出模块的按钮
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cardTitle = this.closest('.card-header').querySelector('h3').textContent;
            alert(`${cardTitle}\n\n功能开发中...\n此功能需要连接 AI 模型和数据库才能生成实时数据。`);
        });
    });
    
    // 预警看板中的详情按钮
    const detailBtns = document.querySelectorAll('.action-btn-small');
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const warningItem = this.closest('.warning-item');
            const title = warningItem.querySelector('.warning-title').textContent;
            alert(`${title}\n\n详细信息加载中...\n需要连接数据采集系统获取实时情报。`);
        });
    });
}

// ==================== 工具函数 ====================
function log(message) {
    console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
}

// 导出函数供外部调用（如果需要）
window.GlobalRiskSystem = {
    showShippingLayer,
    showAirLayer,
    showRiskLayer,
    initCharts,
    log
};

console.log('app.js 加载完成');
