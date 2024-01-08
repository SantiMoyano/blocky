package dev.santiagom.blocky.tables.project;

import dev.santiagom.blocky.tables.project.dtos.NewProjectDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/project")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return new ResponseEntity<List<Project>>(projectService.allProjects(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestHeader("Authorization") String token,
            @RequestBody NewProjectDTO dto) {
        return new ResponseEntity<Project>(projectService.createProject(dto, token), HttpStatus.OK);
    }
}
