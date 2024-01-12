package dev.santiagom.blocky.tables.project;

import dev.santiagom.blocky.tables.project.dtos.NewProjectDTO;
import dev.santiagom.blocky.tables.project.dtos.ProjectResponseDTO;
import dev.santiagom.blocky.tables.user.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/project")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects(
            @RequestHeader("Authorization") String token) {
        System.out.println(token);
        return new ResponseEntity<List<ProjectResponseDTO>>(projectService.allProjects(token), HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponseDTO> getProject(@PathVariable Long id) {
        return new ResponseEntity<ProjectResponseDTO>(projectService.getProject(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createProject(@RequestHeader("Authorization") String token,
            @RequestBody NewProjectDTO dto) {
        try {
            return new ResponseEntity<ProjectResponseDTO>(projectService.createProject(dto, token), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating project", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectResponseDTO>
        updateProject(@PathVariable Long projectId, @RequestBody NewProjectDTO project) {
        return new ResponseEntity<ProjectResponseDTO>(projectService.updateProject(projectId, project), HttpStatus.OK);
    }
}
