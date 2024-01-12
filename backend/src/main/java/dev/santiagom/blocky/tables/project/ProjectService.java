package dev.santiagom.blocky.tables.project;

import dev.santiagom.blocky.tables.epic.Epic;
import dev.santiagom.blocky.tables.project.dtos.NewProjectDTO;
import dev.santiagom.blocky.tables.project.dtos.ProjectResponseDTO;
import dev.santiagom.blocky.tables.screenshot.Screenshot;
import dev.santiagom.blocky.tables.tech.Tech;
import dev.santiagom.blocky.tables.user.User;
import dev.santiagom.blocky.tables.user.UserService;
import dev.santiagom.blocky.tables.user.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;

    public List<ProjectResponseDTO> allProjects(String token) {
        // Retrieve user based on the provided authentication token
        User user = userService.findUserByToken(token);

        // Throw error if user was not found
        if (user == null) {
            throw new UserNotFoundException("User not found for token: " + token);
        }

        return projectRepository.findAllByUser(user)
                .stream()
                .map(project -> new ProjectResponseDTO(
                        project.getId(),
                        project.getName(),
                        project.getDescription(),
                        project.getGoal(),
                        project.getProgress()))
                .collect(Collectors.toList());
    }

    public ProjectResponseDTO createProject(NewProjectDTO dto, String token) {
        // Retrieve user based on the provided authentication token
        User user = userService.findUserByToken(token);

        // Throw error if user was not found
        if (user == null) {
            throw new UserNotFoundException("User not found for token: " + token);
        }

        // Save new project on the repository
        projectRepository.save(Project.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .goal(dto.getGoal())
                .progress(0)
                .user(user)
                .epics(new ArrayList<Epic>())
                .tech(new ArrayList<Tech>())
                .screenshots(new ArrayList<Screenshot>())
                .build());

        // Return DTO saving sensitive data
        return new ProjectResponseDTO(null, dto.getName(), dto.getDescription(), dto.getGoal(), 0);
    }

    public ProjectResponseDTO updateProject(Long projectId, NewProjectDTO data) {
        // Find project to update by ID
        Project projectToUpdate = projectRepository.findById(projectId).orElseThrow();

        // Update and save new data
        projectToUpdate.setName(data.getName());
        projectToUpdate.setDescription(data.getDescription());
        projectToUpdate.setGoal(data.getGoal());
        projectRepository.save(projectToUpdate);

        // return Project Response
        return new ProjectResponseDTO(projectToUpdate.getId(), data.getName(), data.getDescription(), data.getGoal(), projectToUpdate.getProgress());
    }
}
