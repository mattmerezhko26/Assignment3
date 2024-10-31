const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");
let projects = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projectData.forEach(project => {
                const sector = sectorData.find(sector => sector.id === project.sector_id); 
                let sectorValue ;  
                if (sector) {  
                    sectorValue = sector.sector_name;  
                } else {  
                    sectorValue = "Unknown";  
                }  
              
                projects.push({
                    ...project,
                    sector: sectorValue
                });
            });
            resolve();  
        } catch (error) {
            reject("An error occurred during initialization.");
        }
    });
}

function getAllProjects() {
    return new Promise((resolve, reject) => {
        try {
            if (projects.length > 0) {
                resolve(projects);  
            } else {
                reject("Project data is not initialized. Please run Initialize() first.");
            }
        } catch (error) {
            reject("An error occurred while retrieving the projects.");
        }
    });
}

function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        try {
            const project = projects.find(project => project.id === projectId);  
            if (project) {
                resolve(project);  
            } else {
                reject(`Unable to find a project with ID: ${projectId}`);
            }
        } catch (error) {
            reject("An error occurred while finding the project.");
        }
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        try {
            // Filter projects by sector (case-insensitive match)
            const matchingProjects = projects.filter(project =>
                project.sector.toLowerCase().includes(sector.toLowerCase())
            );
            
            if (matchingProjects.length > 0) {
                resolve(matchingProjects);  // Resolve with the found projects
            } else {
                reject(`No projects found in the sector: ${sector}`);
            }
        } catch (error) {
            reject("An error occurred while finding projects by sector.");
        }
    });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };
