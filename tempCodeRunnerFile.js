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