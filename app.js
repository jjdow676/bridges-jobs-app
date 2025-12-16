/**
 * Bridges Jobs - Job Board App
 * Displays job listings from Salesforce for Bridges participants
 */

// Configuration
const CONFIG = {
    // Update this to your Salesforce Site URL
    apiUrl: 'https://bridgestowork.my.site.com/forms/services/apexrest/jobs',
    pageSize: 10
};

// App State
const appState = {
    jobs: [],
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    filters: {
        keyword: '',
        location: '',
        site: '',
        employmentType: '',
        category: ''
    }
};

// DOM Elements
const elements = {
    searchForm: document.getElementById('search-form'),
    keyword: document.getElementById('keyword'),
    location: document.getElementById('location'),
    site: document.getElementById('site'),
    employmentType: document.getElementById('employment-type'),
    category: document.getElementById('category'),
    sortBy: document.getElementById('sort-by'),
    resultsHeader: document.getElementById('results-header'),
    resultsCount: document.getElementById('results-count'),
    loadingState: document.getElementById('loading-state'),
    emptyState: document.getElementById('empty-state'),
    noResultsState: document.getElementById('no-results-state'),
    jobListings: document.getElementById('job-listings'),
    pagination: document.getElementById('pagination'),
    prevPage: document.getElementById('prev-page'),
    nextPage: document.getElementById('next-page'),
    pageInfo: document.getElementById('page-info'),
    modal: document.getElementById('job-modal'),
    modalContent: document.getElementById('job-detail-content')
};

// Initialize app
document.addEventListener('DOMContentLoaded', init);

function init() {
    setupEventListeners();

    // Check for URL params (for sharing links)
    const params = new URLSearchParams(window.location.search);
    if (params.has('keyword') || params.has('site') || params.has('location')) {
        loadFiltersFromParams(params);
        searchJobs();
    }
}

function setupEventListeners() {
    // Search form
    elements.searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        appState.currentPage = 1;
        searchJobs();
    });

    // Pagination
    elements.prevPage.addEventListener('click', () => {
        if (appState.currentPage > 1) {
            appState.currentPage--;
            searchJobs();
        }
    });

    elements.nextPage.addEventListener('click', () => {
        if (appState.currentPage < appState.totalPages) {
            appState.currentPage++;
            searchJobs();
        }
    });

    // Sort change
    elements.sortBy.addEventListener('change', () => {
        sortJobs();
        renderJobs();
    });

    // Modal close
    elements.modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
    elements.modal.querySelector('.modal-close').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function loadFiltersFromParams(params) {
    if (params.has('keyword')) elements.keyword.value = params.get('keyword');
    if (params.has('location')) elements.location.value = params.get('location');
    if (params.has('site')) elements.site.value = params.get('site');
    if (params.has('type')) elements.employmentType.value = params.get('type');
    if (params.has('category')) elements.category.value = params.get('category');
}

async function searchJobs() {
    // Update filters from form
    appState.filters.keyword = elements.keyword.value.trim();
    appState.filters.location = elements.location.value.trim();
    appState.filters.site = elements.site.value;
    appState.filters.employmentType = elements.employmentType.value;
    appState.filters.category = elements.category.value;

    // Show loading
    showLoading(true);

    // Build query params
    const params = new URLSearchParams();
    params.set('page', appState.currentPage);
    params.set('pageSize', CONFIG.pageSize);

    if (appState.filters.keyword) params.set('keyword', appState.filters.keyword);
    if (appState.filters.site) params.set('city', appState.filters.site);
    if (appState.filters.employmentType) params.set('employmentType', appState.filters.employmentType);
    if (appState.filters.category) params.set('category', appState.filters.category);

    // Handle location - could be city, state, or zip
    if (appState.filters.location) {
        const loc = appState.filters.location;
        if (/^\d{5}$/.test(loc)) {
            params.set('zipCode', loc);
        } else {
            params.set('city', loc);
        }
    }

    try {
        const response = await fetch(`${CONFIG.apiUrl}?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (data.success) {
            appState.jobs = data.jobs || [];
            appState.totalCount = data.totalCount || 0;
            appState.totalPages = data.totalPages || 1;
            sortJobs();
            renderResults();
        } else {
            showError(data.message || 'Failed to load jobs');
        }
    } catch (error) {
        console.error('Search error:', error);
        showError('Unable to connect to job service. Please try again.');
    }

    showLoading(false);
}

function sortJobs() {
    const sortBy = elements.sortBy.value;

    appState.jobs.sort((a, b) => {
        switch (sortBy) {
            case 'title':
                return (a.title || '').localeCompare(b.title || '');
            case 'company':
                return (a.company || '').localeCompare(b.company || '');
            case 'date':
            default:
                return new Date(b.postedDate || 0) - new Date(a.postedDate || 0);
        }
    });
}

function renderResults() {
    // Hide all display states first
    elements.emptyState.hidden = true;
    elements.noResultsState.hidden = true;
    elements.resultsHeader.hidden = true;
    elements.pagination.hidden = true;
    elements.jobListings.innerHTML = '';

    if (appState.jobs.length === 0) {
        // Show no results or empty state
        if (hasActiveFilters()) {
            elements.noResultsState.hidden = false;
        } else {
            elements.emptyState.hidden = false;
        }
        return;
    }

    // Show results
    elements.resultsHeader.hidden = false;
    elements.resultsCount.textContent = `${appState.totalCount} job${appState.totalCount !== 1 ? 's' : ''} found`;

    renderJobs();

    // Pagination
    if (appState.totalPages > 1) {
        elements.pagination.hidden = false;
        elements.pageInfo.textContent = `Page ${appState.currentPage} of ${appState.totalPages}`;
        elements.prevPage.disabled = appState.currentPage <= 1;
        elements.nextPage.disabled = appState.currentPage >= appState.totalPages;
    }
}

function renderJobs() {
    elements.jobListings.innerHTML = appState.jobs.map(job => createJobCard(job)).join('');

    // Add click handlers
    elements.jobListings.querySelectorAll('.job-card').forEach((card, index) => {
        card.addEventListener('click', () => showJobDetail(appState.jobs[index]));
    });
}

function createJobCard(job) {
    const postedDate = job.postedDate ? formatDate(job.postedDate) : 'Recently';
    const salary = formatSalary(job.salaryMin, job.salaryMax);
    const description = truncate(stripHtml(job.description || ''), 150);

    return `
        <article class="job-card" data-id="${job.id}">
            <div class="job-card-header">
                <div>
                    <h3 class="job-title">${escapeHtml(job.title || 'Untitled Position')}</h3>
                    <p class="job-company">${escapeHtml(job.company || 'Company')}</p>
                </div>
                <div class="job-badges">
                    ${job.employmentType ? `<span class="badge badge-primary">${escapeHtml(job.employmentType)}</span>` : ''}
                    ${job.remoteFriendly ? '<span class="badge badge-remote">Remote</span>' : ''}
                </div>
            </div>
            <div class="job-meta">
                ${job.location || job.city ? `
                    <span class="job-meta-item">
                        <span>&#128205;</span>
                        ${escapeHtml(job.location || `${job.city}, ${job.state}`)}
                    </span>
                ` : ''}
                ${salary ? `
                    <span class="job-meta-item">
                        <span>&#128176;</span>
                        ${salary}
                    </span>
                ` : ''}
                ${job.category ? `
                    <span class="job-meta-item">
                        <span>&#128193;</span>
                        ${escapeHtml(job.category)}
                    </span>
                ` : ''}
            </div>
            ${description ? `<p class="job-description-preview">${escapeHtml(description)}</p>` : ''}
            <div class="job-footer">
                <span class="job-date">Posted ${postedDate}</span>
                <button class="view-job-btn">View Details</button>
            </div>
        </article>
    `;
}

function showJobDetail(job) {
    const salary = formatSalary(job.salaryMin, job.salaryMax);
    const postedDate = job.postedDate ? formatDate(job.postedDate) : 'Recently';

    elements.modalContent.innerHTML = `
        <div class="job-detail-header">
            <h2 class="job-detail-title">${escapeHtml(job.title || 'Untitled Position')}</h2>
            <p class="job-detail-company">${escapeHtml(job.company || 'Company')}</p>
            <div class="job-detail-meta">
                ${job.location || job.city ? `
                    <span>&#128205; ${escapeHtml(job.location || `${job.city}, ${job.state}`)}</span>
                ` : ''}
                ${job.employmentType ? `<span>&#128188; ${escapeHtml(job.employmentType)}</span>` : ''}
                ${salary ? `<span>&#128176; ${salary}</span>` : ''}
                ${job.remoteFriendly ? '<span>&#127968; Remote Available</span>' : ''}
            </div>
        </div>

        ${job.description ? `
            <div class="job-detail-section">
                <h3>Job Description</h3>
                <div class="job-detail-description">${formatDescription(job.description)}</div>
            </div>
        ` : ''}

        <div class="job-detail-section">
            <h3>Details</h3>
            <div class="job-detail-meta">
                ${job.category ? `<span>Category: ${escapeHtml(job.category)}</span>` : ''}
                <span>Posted: ${postedDate}</span>
                <span>Job ID: ${escapeHtml(job.jobNumber || job.id)}</span>
            </div>
        </div>

        <div class="job-detail-actions">
            ${job.sourceUrl ? `
                <a href="${escapeHtml(job.sourceUrl)}" target="_blank" rel="noopener noreferrer" class="apply-btn">
                    Apply Now
                </a>
            ` : `
                <p style="color: var(--text-secondary); text-align: center; width: 100%;">
                    Contact your Bridges representative to learn more about this opportunity.
                </p>
            `}
        </div>
    `;

    elements.modal.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    elements.modal.hidden = true;
    document.body.style.overflow = '';
}

function showLoading(show) {
    appState.isLoading = show;
    elements.loadingState.hidden = !show;

    const searchBtn = elements.searchForm.querySelector('.search-btn');
    const btnText = searchBtn.querySelector('.btn-text');
    const btnSpinner = searchBtn.querySelector('.btn-spinner');

    searchBtn.disabled = show;
    btnText.hidden = show;
    btnSpinner.hidden = !show;
}

function showError(message) {
    elements.emptyState.hidden = true;
    elements.noResultsState.hidden = false;
    elements.noResultsState.querySelector('h3').textContent = 'Error';
    elements.noResultsState.querySelector('p').textContent = message;
}

function hasActiveFilters() {
    return appState.filters.keyword ||
           appState.filters.location ||
           appState.filters.site ||
           appState.filters.employmentType ||
           appState.filters.category;
}

// Utility functions
function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${diffDays >= 14 ? 's' : ''} ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatSalary(min, max) {
    if (!min && !max) return '';

    const formatNum = (n) => {
        if (n >= 1000) {
            return '$' + (n / 1000).toFixed(0) + 'k';
        }
        return '$' + n.toLocaleString();
    };

    if (min && max) {
        if (min === max) return formatNum(min) + '/year';
        return `${formatNum(min)} - ${formatNum(max)}/year`;
    }
    return (min ? formatNum(min) : formatNum(max)) + '/year';
}

function formatDescription(text) {
    if (!text) return '';
    // Convert line breaks and basic formatting
    return escapeHtml(text)
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function truncate(str, length) {
    if (!str || str.length <= length) return str;
    return str.substring(0, length) + '...';
}

function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
