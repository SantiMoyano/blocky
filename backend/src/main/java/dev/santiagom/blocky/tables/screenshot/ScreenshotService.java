package dev.santiagom.blocky.tables.screenshot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScreenshotService {

    @Autowired
    private ScreenshotRepository screenshotRepository;
}
