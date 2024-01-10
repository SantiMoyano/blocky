package dev.santiagom.blocky.tables.tech;

import dev.santiagom.blocky.tables.project.Project;
import dev.santiagom.blocky.tables.project.ProjectRepository;
import dev.santiagom.blocky.tables.tech.dtos.TechDTO;
import dev.santiagom.blocky.tables.tech.dtos.TechResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TechService {

    @Autowired
    private TechRepository techRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<TechResponseDTO> allTechs() {
        return techRepository.findAll()
                .stream()
                .map(t -> new TechResponseDTO(
                        t.getName(),
                        t.getColor(),
                        t.getProject().getId()))
                .collect(Collectors.toList());
    }

    public TechResponseDTO createTech(TechDTO tech) {
        Project project = projectRepository.findById(tech.getProjectId()).orElseThrow();
        techRepository.save(
                Tech.builder()
                        .name(tech.getName())
                        .color(tech.getColor())
                        .project(project)
                        .build()
        );
        return new TechResponseDTO(tech.getName(), tech.getColor(), tech.getProjectId());
    }

    public TechResponseDTO updateTech(Long techId, TechDTO tech) {
        Tech techToUpdate = techRepository.findById(techId).orElseThrow();

        techToUpdate.setName(tech.getName());
        techToUpdate.setColor(tech.getColor());
        techRepository.save(techToUpdate);

        return new TechResponseDTO(tech.getName(), tech.getColor(), tech.getProjectId());
    }
}
