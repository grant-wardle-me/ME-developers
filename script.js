// Developers Data (Sample)
const developers = [
    { id: 1, name: 'ABC Developers' },
    { id: 2, name: 'XYZ Construction' },
    { id: 3, name: 'LMN Builders' }
];

// Development Types Data (Sample)
const developmentTypes = [
    { id: 1, name: 'Residential' },
    { id: 2, name: 'Regeneration' },
    { id: 3, name: 'Commercial' }
];

// Upper-Tier Local Authorities in the Midlands
const partners = [
    // West Midlands
    { id: 1, name: 'Birmingham City Council' },
    { id: 2, name: 'Coventry City Council' },
    { id: 3, name: 'Dudley Metropolitan Borough Council' },
    { id: 4, name: 'Sandwell Metropolitan Borough Council' },
    { id: 5, name: 'Solihull Metropolitan Borough Council' },
    { id: 6, name: 'Walsall Metropolitan Borough Council' },
    { id: 7, name: 'Wolverhampton City Council' },

    // East Midlands
    { id: 8, name: 'Derby City Council' },
    { id: 9, name: 'Leicester City Council' },
    { id: 10, name: 'Nottingham City Council' },
    { id: 11, name: 'Rutland County Council' },
    { id: 12, name: 'Derbyshire County Council' },
    { id: 13, name: 'Leicestershire County Council' },
    { id: 14, name: 'Lincolnshire County Council' },
    { id: 15, name: 'Northamptonshire County Council' },
    { id: 16, name: 'Nottinghamshire County Council' }
];

// Example projects data
const projects = [
    { id: 1, name: 'Sunrise Apartments', developerId: 1, developmentTypeId: 1, partnerId: 1, location: 'Birmingham' },
    { id: 2, name: 'Riverfront Redevelopment', developerId: 2, developmentTypeId: 2, partnerId: 8, location: 'Derby' },
    { id: 3, name: 'Downtown Mall', developerId: 3, developmentTypeId: 3, partnerId: 10, location: 'Nottingham' }
];

// Populate Filters
function populateFilters() {
    const developerFilter = document.getElementById('developerFilter');
    const developmentTypeFilter = document.getElementById('developmentTypeFilter');
    const partnerFilter = document.getElementById('partnerFilter');

    developers.forEach(dev => {
        const option = document.createElement('option');
        option.value = dev.id;
        option.textContent = dev.name;
        developerFilter.appendChild(option);
    });

    developmentTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.id;
        option.textContent = type.name;
        developmentTypeFilter.appendChild(option);
    });

    partners.forEach(partner => {
        const option = document.createElement('option');
        option.value = partner.id;
        option.textContent = partner.name;
        partnerFilter.appendChild(option);
    });
}

// Populate Table
function populateTable() {
    const tbody = document.querySelector('#projectsTable tbody');
    tbody.innerHTML = ''; // Clear the table body

    const filteredProjects = projects.filter(project => {
        const developerMatch = !developerFilter.value || project.developerId === parseInt(developerFilter.value);
        const developmentTypeMatch = !developmentTypeFilter.value || project.developmentTypeId === parseInt(developmentTypeFilter.value);
        const partnerMatch = !partnerFilter.value || project.partnerId === parseInt(partnerFilter.value);
        return developerMatch && developmentTypeMatch && partnerMatch;
    });

    filteredProjects.forEach(project => {
        const developer = developers.find(dev => dev.id === project.developerId).name;
        const developmentType = developmentTypes.find(type => type.id === project.developmentTypeId).name;
        const partner = partners.find(partner => partner.id === project.partnerId).name;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.name}</td>
            <td>${developer}</td>
            <td>${developmentType}</td>
            <td>${partner}</td>
            <td>${project.location}</td>
        `;
        tbody.appendChild(row);
    });
}

// Initialize Chart
function initializeChart() {
    const ctx = document.getElementById('projectsChart').getContext('2d');

    const data = {
        labels: developers.map(dev => dev.name),
        datasets: [{
            label: 'Number of Projects',
            data: developers.map(dev => projects.filter(project => project.developerId === dev.id).length),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    new Chart(ctx, config);
}

// Event Listeners for Filters
document.getElementById('developerFilter').addEventListener('change', populateTable);
document.getElementById('developmentTypeFilter').addEventListener('change', populateTable);
document.getElementById('partnerFilter').addEventListener('change', populateTable);

// Initial Load
populateFilters();
populateTable();
initializeChart();
