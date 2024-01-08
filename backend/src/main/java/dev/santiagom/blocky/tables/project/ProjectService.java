package dev.santiagom.blocky.tables.project;

import dev.santiagom.blocky.tables.epic.Epic;
import dev.santiagom.blocky.tables.project.dtos.NewProjectDTO;
import dev.santiagom.blocky.tables.screenshot.Screenshot;
import dev.santiagom.blocky.tables.tech.Tech;
import dev.santiagom.blocky.tables.user.User;
import dev.santiagom.blocky.tables.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;

    public List<Project> allProjects() {
        return projectRepository.findAll();
    }

    public Project createProject(NewProjectDTO dto, String token) {
        User user = userService.findUserByToken(token);
        if (user == null)
            return null;
        return projectRepository.save(Project.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .goal(dto.getGoal())
                .progress(0)
                .user(user)
                .epics(new ArrayList<Epic>())
                .tech(new ArrayList<Tech>())
                .screenshots(new ArrayList<Screenshot>())
                .build());
    }
}
