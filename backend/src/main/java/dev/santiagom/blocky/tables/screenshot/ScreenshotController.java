package dev.santiagom.blocky.tables.screenshot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
