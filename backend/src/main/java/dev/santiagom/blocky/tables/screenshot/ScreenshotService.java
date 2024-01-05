package dev.santiagom.blocky.tables.screenshot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScreenshotService {

    @Autowired
    private ScreenshotRepository screenshotRepository;

    public List<Screenshot> allScreenshots() {
        return screenshotRepository.findAll();
    }
}
