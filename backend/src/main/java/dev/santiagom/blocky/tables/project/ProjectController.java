package dev.santiagom.blocky.tables.project;

import dev.santiagom.blocky.tables.project.dtos.NewProjectDTO;
import dev.santiagom.blocky.tables.user.exceptions.UserNotFoundException;
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
    public ResponseEntity<?> createProject(@RequestHeader("Authorization") String token,
            @RequestBody NewProjectDTO dto) {
        try {
            return new ResponseEntity<Project>(projectService.createProject(dto, token), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating project", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
