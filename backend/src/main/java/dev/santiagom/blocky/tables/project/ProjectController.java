package dev.santiagom.blocky.tables.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/project")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    public ResponseEntity<List<Project>> getAllUsers() {
        return new ResponseEntity<List<Project>>(projectService.allProjects(), HttpStatus.OK);
    }
}
