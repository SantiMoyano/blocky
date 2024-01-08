package dev.santiagom.blocky.tables.screenshot;

import dev.santiagom.blocky.tables.screenshot.dtos.ScreenshotDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/screenshot")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ScreenshotController {

    @Autowired
    private ScreenshotService screenshotService;

    @GetMapping
    public ResponseEntity<List<Screenshot>> getAllScreenshots() {
        return new ResponseEntity<List<Screenshot>>(screenshotService.allScreenshots(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Screenshot> addScreenshot(@RequestBody ScreenshotDTO screenshot) {
        return new ResponseEntity<Screenshot>(screenshotService.addScreenshot(screenshot), HttpStatus.CREATED);
    }
}
