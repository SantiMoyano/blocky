package dev.santiagom.blocky.tables.epic;

import dev.santiagom.blocky.tables.epic.dtos.EpicDTO;
import dev.santiagom.blocky.tables.project.Project;
import dev.santiagom.blocky.tables.project.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EpicService {

    @Autowired
    private EpicRepository epicRepository;

    @Autowired
    ProjectRepository projectRepository;

    public List<Epic> allEpics() {
        return epicRepository.findAll();
    }

    public Epic createEpic(EpicDTO epic) {
        Project project = projectRepository.findById(epic.getProjectId()).orElseThrow();
        return epicRepository.save(
                Epic.builder()
                        .name(epic.getName())
                        .progress(0)
                        .project(project)
                        .build()
        );
    }
}
