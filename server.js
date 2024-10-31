const express = require("express");  
const path = require("path");        
const projectData = require("./modules/projects");  

const app = express();               
app.use(express.static('public')); 


projectData.initialize().then(() => {
  app.listen(8000, () => {            
    console.log("Server is running on port 8000");  
  });
}).catch(err => {                     
  console.error("Failed to initialize project data", err);  
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html")); 
});


app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html")); 
});


app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;    
  if (sector) {                       
    projectData.getProjectsBySector(sector)  
      .then(projects => res.json(projects))  
      .catch(err => res.status(404).sendFile(path.join(__dirname, "views", "404.html"))); 
  } else {                           
    projectData.getAllProjects()      
      .then(projects => res.json(projects))  
      .catch(err => res.status(404).sendFile(path.join(__dirname, "views", "404.html")));
  }
});
/*
app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;
  if (sector) {
    projectData.getProjectsBySector(sector)
      .then(projects => {
        if (projects.length > 0) {
          res.json(projects); 
        } else {
          // Serve the 404.html page if no projects are found for the sector
          res.status(404).sendFile(path.join(__dirname, "views", "404.html"), err => {
            if (err) {
              res.status(500).json({ error: "Error loading 404 page" });  
            }
          });
        }
      })
      .catch(err => {
        console.error("Error fetching projects by sector:", err);  
        res.status(500).json({ error: "An error occurred while fetching projects by sector" }); 
      });
  } else {
    
    projectData.getAllProjects()
      .then(projects => res.json(projects))
      .catch(err => {
        console.error("Error fetching all projects:", err); 
        res.status(500).json({ error: "An error occurred while fetching all projects" });
      });
  }
});
*/

app.get("/solutions/projects/:id", (req, res) => {
  const projectId = parseInt(req.params.id, 10); 
  projectData.getProjectById(projectId)          
    .then(project => res.json(project))         
    .catch(err => res.status(404).sendFile(path.join(__dirname, "views", "404.html"))); 
});


app.use((req, res, next) => {
  res.status(404).send("404 - We're unable to find what you're looking for.");  
});
