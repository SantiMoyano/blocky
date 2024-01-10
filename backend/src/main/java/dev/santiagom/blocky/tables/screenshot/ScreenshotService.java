package dev.santiagom.blocky.tables.screenshot;

import dev.santiagom.blocky.tables.project.Project;
import dev.santiagom.blocky.tables.project.ProjectRepository;
import dev.santiagom.blocky.tables.screenshot.dtos.ScreenshotDTO;
import dev.santiagom.blocky.tables.screenshot.dtos.ScreenshotResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScreenshotService {

    @Autowired
    private ScreenshotRepository screenshotRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<ScreenshotResponseDTO> allScreenshots() {
        // Return a list of ScreenshotResponseDTO by mapping on the repository
        return screenshotRepository.findAll()
                .stream()
                .map(ss -> new ScreenshotResponseDTO(ss.getName(), ss.getUrl()))
                .collect(Collectors.toList());
    }

    public ScreenshotResponseDTO addScreenshot(ScreenshotDTO screenshot) {
        // Search project by ID
        Project project = projectRepository.findById(screenshot.getProjectId()).orElseThrow();

        // Create and save the new screenshot
        screenshotRepository.save(
                Screenshot.builder()
                        .name(screenshot.getName())
                        .url(screenshot.getUrl())
                        .project(project)
                        .build()
        );

        // Return simple Screenshot Response
        return new ScreenshotResponseDTO(screenshot.getName(), screenshot.getUrl());
    }
}
