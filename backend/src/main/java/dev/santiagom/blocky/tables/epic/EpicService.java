package dev.santiagom.blocky.tables.epic;

import dev.santiagom.blocky.tables.epic.dtos.EpicDTO;
import dev.santiagom.blocky.tables.epic.dtos.EpicResponseDTO;
import dev.santiagom.blocky.tables.project.Project;
import dev.santiagom.blocky.tables.project.ProjectRepository;
import dev.santiagom.blocky.tables.project.dtos.NewProjectDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EpicService {

    @Autowired
    private EpicRepository epicRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<EpicResponseDTO> allEpics() {
        // Retrieve a list of Epics from the repository
        List<Epic> epics = epicRepository.findAll();

        // Use Stream API to transform each Epic into EpicResponseDTO and collect them into a list
        return epics.stream()
                .map(epic -> new EpicResponseDTO(epic.getName(), epic.getProgress()))
                .collect(Collectors.toList());
    }

    public EpicResponseDTO createEpic(EpicDTO epic) {
        // Search project by ID on project repository
        Project project = projectRepository.findById(epic.getProjectId()).orElseThrow();

        // Save new Epic on repository
        epicRepository.save(
                Epic.builder()
                        .name(epic.getName())
                        .progress(0)
                        .project(project)
                        .build()
        );

        // Return simple Epic response
        return new EpicResponseDTO(epic.getName(), project.getProgress());
    }

    public EpicResponseDTO updateEpic(Long epicId, String epicName) {
        // Search epic by ID
        Epic epicToUpdate = epicRepository.findById(epicId).orElseThrow();

        // Update and save Epic
        epicToUpdate.setName(epicName);
        epicRepository.save(epicToUpdate);

        // Return simple Epic response
        return new EpicResponseDTO(epicName, epicToUpdate.getProgress());
    }
}
