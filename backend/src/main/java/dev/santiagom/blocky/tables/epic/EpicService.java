package dev.santiagom.blocky.tables.epic;

import dev.santiagom.blocky.tables.epic.dtos.EpicDTO;
import dev.santiagom.blocky.tables.epic.dtos.EpicResponseDTO;
import dev.santiagom.blocky.tables.project.Project;
import dev.santiagom.blocky.tables.project.ProjectRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    public List<EpicResponseDTO> allEpics(Long projectId) {
        // Retrieve a list of Epics from the repository
        List<Epic> epics = epicRepository.findAllByProject_Id(projectId);

        // Use Stream API to transform each Epic into EpicResponseDTO and collect them into a list
        return epics.stream()
                .map(epic -> new EpicResponseDTO(
                        epic.getId(),
                        epic.getName(),
                        epic.getDescription(),
                        epic.getProgress()))
                .collect(Collectors.toList());
    }

    public EpicResponseDTO epicDetails(Long id) {
        Epic epic = epicRepository.findById(id).orElseThrow();
        return new EpicResponseDTO(
                epic.getId(), epic.getName(), epic.getDescription(), epic.getProgress());
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
        return new EpicResponseDTO(null, epic.getName(), epic.getDescription(), project.getProgress());
    }

    public EpicResponseDTO updateEpic(Long epicId, EpicDTO epic) {
        // Search epic by ID
        Epic epicToUpdate = epicRepository.findById(epicId).orElseThrow();

        // Update and save Epic
        epicToUpdate.setName(epic.getName());
        epicToUpdate.setDescription(epic.getDescription());
        epicRepository.save(epicToUpdate);

        // Return simple Epic response
        return new EpicResponseDTO(epicId, epic.getName(), epicToUpdate.getDescription(), epicToUpdate.getProgress());
    }
}
