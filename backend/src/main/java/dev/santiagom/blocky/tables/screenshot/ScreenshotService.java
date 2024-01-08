package dev.santiagom.blocky.tables.screenshot;

import dev.santiagom.blocky.tables.project.Project;
import dev.santiagom.blocky.tables.project.ProjectRepository;
import dev.santiagom.blocky.tables.screenshot.dtos.ScreenshotDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScreenshotService {

    @Autowired
    private ScreenshotRepository screenshotRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<Screenshot> allScreenshots() {
        return screenshotRepository.findAll();
    }

    public Screenshot addScreenshot(ScreenshotDTO screenshot) {
        Project project = projectRepository.findById(screenshot.getProjectId()).orElseThrow();
        return screenshotRepository.save(
                Screenshot.builder()
                        .name(screenshot.getName())
                        .url(screenshot.getUrl())
                        .project(project)
                        .build()
        );
    }
}
