package dev.santiagom.blocky.tables.tech;

import dev.santiagom.blocky.tables.project.Project;
import dev.santiagom.blocky.tables.project.ProjectRepository;
import dev.santiagom.blocky.tables.project.ProjectService;
import dev.santiagom.blocky.tables.tech.dtos.TechDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechService {

    @Autowired
    private TechRepository techRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<Tech> allTechs() {
        return techRepository.findAll();
    }

    public Tech createTech(TechDTO tech) {
        Project project = projectRepository.findById(tech.getProjectId()).orElseThrow();
        return techRepository.save(
                Tech.builder()
                        .name(tech.getName())
                        .color(tech.getColor())
                        .project(project)
                        .build()
        );
    }
}
