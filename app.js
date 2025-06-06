// Dashboard Application JavaScript

class AvaadaDashboard {
    constructor() {
        this.currentSection = 'overview';
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupProjectFilters();
        this.initCharts();
        this.setupInteractiveElements();
    }

    // Navigation Setup
    setupNavigation() {
        const menuItems = document.querySelectorAll('.menu-item');
        const sections = document.querySelectorAll('.section');

        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = item.getAttribute('data-section');
                this.switchSection(targetSection);
            });
        });
    }

    switchSection(sectionName) {
        // Remove active class from all menu items and sections
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Add active class to current menu item and section
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
        document.getElementById(sectionName).classList.add('active');

        this.currentSection = sectionName;

        // Initialize charts when switching to relevant sections
        if (sectionName === 'capability') {
            setTimeout(() => this.initMaturityChart(), 100);
        }
        if (sectionName === 'resources') {
            setTimeout(() => this.initBudgetChart(), 100);
        }
        if (sectionName === 'phases') {
            setTimeout(() => this.initMilestoneChart(), 100);
        }
    }

    // Project Portfolio Filtering
    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                this.currentFilter = filter;
            });
        });
    }

    filterProjects(filter) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all') {
                card.style.display = 'block';
                this.animateCardIn(card);
            } else {
                // Map filter values to category values
                const filterMap = {
                    'quick-wins': 'quick-wins',
                    'strategic': 'strategic', 
                    'internal': 'internal',
                    'transformational': 'transformational'
                };
                
                if (category === filterMap[filter]) {
                    card.style.display = 'block';
                    this.animateCardIn(card);
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    animateCardIn(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50);
    }

    // Chart Initialization
    initCharts() {
        // Initialize charts that are visible on page load
        if (this.currentSection === 'overview') {
            // Charts are images in overview, no initialization needed
        }
    }

    initMaturityChart() {
        const canvas = document.getElementById('maturityChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Clear any existing chart
        if (this.maturityChart) {
            this.maturityChart.destroy();
        }

        this.maturityChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Data & Analytics',
                    'ML Engineering', 
                    'AI Governance',
                    'Technology Infrastructure',
                    'Business Integration'
                ],
                datasets: [{
                    label: 'Current State',
                    data: [2, 1, 1, 2, 2],
                    backgroundColor: 'rgba(33, 128, 141, 0.2)',
                    borderColor: 'rgba(33, 128, 141, 1)',
                    pointBackgroundColor: 'rgba(33, 128, 141, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(33, 128, 141, 1)'
                }, {
                    label: 'Target State',
                    data: [4, 3, 4, 5, 4],
                    backgroundColor: 'rgba(31, 184, 198, 0.2)',
                    borderColor: 'rgba(31, 184, 198, 1)',
                    pointBackgroundColor: 'rgba(31, 184, 198, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(31, 184, 198, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 5,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                const levels = ['', 'Initial', 'Developing', 'Defined', 'Managed', 'Optimized'];
                                return levels[value] || '';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    initBudgetChart() {
        const canvas = document.getElementById('budgetChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Clear any existing chart
        if (this.budgetChart) {
            this.budgetChart.destroy();
        }

        this.budgetChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Partnerships', 'Internal Team', 'Infrastructure'],
                datasets: [{
                    data: [40, 40, 20], // Phase 2 allocation
                    backgroundColor: [
                        '#1FB8CD',
                        '#FFC185', 
                        '#B4413C'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    initMilestoneChart() {
        const canvas = document.getElementById('milestoneChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Clear any existing chart
        if (this.milestoneChart) {
            this.milestoneChart.destroy();
        }

        this.milestoneChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Month 0', 'Month 6', 'Month 12', 'Month 18', 'Month 24', 'Month 30', 'Month 36'],
                datasets: [{
                    label: 'Internal Capability %',
                    data: [20, 30, 40, 50, 60, 70, 80],
                    backgroundColor: 'rgba(33, 128, 141, 0.2)',
                    borderColor: 'rgba(33, 128, 141, 1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Partner Dependency %',
                    data: [80, 70, 60, 50, 40, 30, 20],
                    backgroundColor: 'rgba(255, 193, 133, 0.2)',
                    borderColor: 'rgba(255, 193, 133, 1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Interactive Elements Setup
    setupInteractiveElements() {
        this.setupProgressBars();
        this.setupRiskMatrix();
        this.setupMetricCards();
    }

    setupProgressBars() {
        // Animate progress bars when they come into view
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    progressBar.style.width = '0%';
                    
                    setTimeout(() => {
                        progressBar.style.transition = 'width 1.5s ease-out';
                        progressBar.style.width = width;
                    }, 100);
                }
            });
        }, observerOptions);

        progressBars.forEach(bar => observer.observe(bar));
    }

    setupRiskMatrix() {
        const riskItems = document.querySelectorAll('.risk-item');
        
        riskItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const riskType = item.getAttribute('data-risk');
                this.showRiskDetails(riskType);
            });
        });
    }

    showRiskDetails(riskType) {
        const riskData = {
            talent: {
                title: 'Talent Acquisition Challenges',
                description: 'Difficulty in recruiting qualified AI/ML professionals in a competitive market.',
                mitigation: 'Progressive hiring strategy, competitive compensation packages, partnership-based skill development programs.',
                owner: 'HR Director & AI Lead',
                timeline: 'Ongoing',
                status: 'Active'
            },
            tech: {
                title: 'Technology Integration Complexity',
                description: 'Challenges in integrating new AI/ML technologies with existing enterprise systems.',
                mitigation: 'Pilot projects, gradual integration approach, expert consultation and vendor support.',
                owner: 'CTO & Technology Lead',
                timeline: '6-18 months',
                status: 'Monitoring'
            },
            change: {
                title: 'Change Management Resistance',
                description: 'Employee resistance to AI/ML adoption and workflow changes.',
                mitigation: 'Comprehensive training programs, early wins demonstration, stakeholder engagement.',
                owner: 'Change Management Lead',
                timeline: '12-24 months',
                status: 'Controlled'
            },
            budget: {
                title: 'Budget Constraints',
                description: 'Potential budget limitations affecting transformation timeline and scope.',
                mitigation: 'Phased implementation approach, clear ROI demonstration, executive sponsorship.',
                owner: 'CFO & Program Director',
                timeline: 'Ongoing',
                status: 'Controlled'
            }
        };

        const risk = riskData[riskType];
        if (risk) {
            // Create a more user-friendly modal-style display
            this.showModal(risk);
        }
    }

    showModal(risk) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('riskModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'riskModal';
            modal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 id="modalTitle"></h3>
                            <button class="modal-close" onclick="document.getElementById('riskModal').remove()">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="risk-detail">
                                <h4>Description</h4>
                                <p id="modalDescription"></p>
                            </div>
                            <div class="risk-detail">
                                <h4>Mitigation Strategy</h4>
                                <p id="modalMitigation"></p>
                            </div>
                            <div class="risk-detail">
                                <h4>Owner</h4>
                                <p id="modalOwner"></p>
                            </div>
                            <div class="risk-detail">
                                <h4>Timeline</h4>
                                <p id="modalTimeline"></p>
                            </div>
                            <div class="risk-detail">
                                <h4>Status</h4>
                                <p id="modalStatus"></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add modal styles
            const style = document.createElement('style');
            style.textContent = `
                #riskModal .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                #riskModal .modal-content {
                    background-color: var(--color-surface);
                    border-radius: var(--radius-lg);
                    padding: var(--space-24);
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: var(--shadow-lg);
                }
                #riskModal .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--space-16);
                    border-bottom: 1px solid var(--color-border);
                    padding-bottom: var(--space-12);
                }
                #riskModal .modal-close {
                    background: none;
                    border: none;
                    font-size: var(--font-size-2xl);
                    cursor: pointer;
                    color: var(--color-text-secondary);
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                #riskModal .modal-close:hover {
                    color: var(--color-text);
                }
                #riskModal .risk-detail {
                    margin-bottom: var(--space-16);
                }
                #riskModal .risk-detail h4 {
                    color: var(--color-primary);
                    margin-bottom: var(--space-8);
                }
                #riskModal .risk-detail p {
                    margin: 0;
                    color: var(--color-text);
                }
            `;
            modal.appendChild(style);
            document.body.appendChild(modal);
        }

        // Update modal content
        document.getElementById('modalTitle').textContent = risk.title;
        document.getElementById('modalDescription').textContent = risk.description;
        document.getElementById('modalMitigation').textContent = risk.mitigation;
        document.getElementById('modalOwner').textContent = risk.owner;
        document.getElementById('modalTimeline').textContent = risk.timeline;
        document.getElementById('modalStatus').textContent = risk.status;

        // Close modal when clicking overlay
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                modal.remove();
            }
        });
    }

    setupMetricCards() {
        // Add hover effects and click interactions for metric cards
        const metricCards = document.querySelectorAll('.metric-card');
        
        metricCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
                card.style.transition = 'transform 0.2s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // Update Dashboard Data (simulated real-time updates)
    updateMetrics() {
        // This would typically fetch real data from an API
        const currentPhaseProgress = Math.min(100, 33 + Math.random() * 10);
        const internalCapability = Math.min(100, 40 + Math.random() * 5);
        const teamSize = Math.floor(8 + Math.random() * 2);
        const activeProjects = Math.floor(12 + Math.random() * 3);

        // Update progress bars
        const progressBars = document.querySelectorAll('.progress-fill');
        if (progressBars.length > 0) {
            progressBars[0].style.width = currentPhaseProgress + '%';
            progressBars[1].style.width = internalCapability + '%';
            progressBars[2].style.width = (teamSize / 25 * 100) + '%';
        }

        // Update metric values
        const metricValues = document.querySelectorAll('.metric-value');
        if (metricValues.length >= 4) {
            metricValues[1].textContent = Math.round(internalCapability) + '%';
            metricValues[2].textContent = teamSize;
            metricValues[3].textContent = activeProjects;
        }
    }

    // Utility Functions
    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.round(start + (end - start) * progress);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    formatPercentage(value) {
        return Math.round(value) + '%';
    }
}

// Data Management
class DashboardData {
    constructor() {
        this.phases = [
            {
                name: "Phase 1: Partner-Led with Internal Shadowing",
                timeline: "0-12 months",
                objectives: "Establish foundation through partnerships while building core internal capabilities",
                keyActivities: ["Partner selection", "Core team formation", "Infrastructure development", "Knowledge transfer"],
                successMetrics: ["2-3 successful POCs", "20% internal capability", "80% partner dependency", "Team of 3-5 people"]
            },
            {
                name: "Phase 2: Co-Development & Targeted Internal Builds",
                timeline: "6-24 months", 
                objectives: "Develop targeted internal capabilities while maintaining strategic partnerships",
                keyActivities: ["Strategic hiring", "Joint development projects", "Internal project launches", "Capability expansion"],
                successMetrics: ["5-7 production systems", "50% internal capability", "50% partner dependency", "Team of 12-18 people"]
            },
            {
                name: "Phase 3: Mature Internal Capability",
                timeline: "18+ months",
                objectives: "Achieve internal leadership with selective strategic partnerships", 
                keyActivities: ["Independent development", "Innovation leadership", "Specialized partnerships", "Industry recognition"],
                successMetrics: ["10+ production systems", "80% internal capability", "20% partner dependency", "Team of 25+ people"]
            }
        ];

        this.projectCategories = [
            {
                name: "Quick Wins",
                complexity: 1,
                valuePotential: 2,
                timeToValue: 4,
                externalDependency: 1,
                examples: ["Document Processing Automation", "Workflow Streamlining", "Basic Energy Analytics"],
                timeline: "1-3 months"
            },
            {
                name: "Strategic Partnerships", 
                complexity: 4,
                valuePotential: 5,
                timeToValue: 2,
                externalDependency: 5,
                examples: ["Energy Forecasting", "Agentic Automation", "Digital Twin Modeling"],
                timeline: "4-9 months"
            },
            {
                name: "Internal Innovation",
                complexity: 3,
                valuePotential: 3, 
                timeToValue: 3,
                externalDependency: 2,
                examples: ["Predictive Maintenance", "AI-Powered Trading Platform"],
                timeline: "3-6 months"
            },
            {
                name: "Transformational Initiatives",
                complexity: 5,
                valuePotential: 5,
                timeToValue: 1,
                externalDependency: 3,
                examples: ["Smart Grid Optimization", "Energy Storage Optimization"],
                timeline: "12-18 months"
            }
        ];

        this.capabilityProgress = [
            {month: 0, internal: 20, partner: 80},
            {month: 6, internal: 30, partner: 70},
            {month: 12, internal: 40, partner: 60},
            {month: 18, internal: 50, partner: 50},
            {month: 24, internal: 60, partner: 40},
            {month: 30, internal: 70, partner: 30},
            {month: 36, internal: 80, partner: 20}
        ];
    }

    getPhaseData() {
        return this.phases;
    }

    getProjectCategories() {
        return this.projectCategories;
    }

    getCapabilityProgress() {
        return this.capabilityProgress;
    }
}

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new AvaadaDashboard();
    const data = new DashboardData();
    
    // Set up periodic updates (every 30 seconds)
    setInterval(() => {
        dashboard.updateMetrics();
    }, 30000);
    
    // Export dashboard instance for debugging
    window.dashboard = dashboard;
    window.dashboardData = data;
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AvaadaDashboard, DashboardData };
}