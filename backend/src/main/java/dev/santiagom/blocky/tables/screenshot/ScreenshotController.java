package dev.santiagom.blocky.tables.screenshot;

import dev.santiagom.blocky.tables.screenshot.dtos.ScreenshotDTO;
import dev.santiagom.blocky.tables.screenshot.dtos.ScreenshotResponseDTO;
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
    public ResponseEntity<List<ScreenshotResponseDTO>> getAllScreenshots() {
        return new ResponseEntity<List<ScreenshotResponseDTO>>(screenshotService.allScreenshots(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ScreenshotResponseDTO> addScreenshot(@RequestBody ScreenshotDTO screenshot) {
        return new ResponseEntity<ScreenshotResponseDTO>(screenshotService.addScreenshot(screenshot), HttpStatus.CREATED);
    }

    @PutMapping("/{screenshotId}")
    public ResponseEntity<ScreenshotResponseDTO> updateScreenshot(
            @PathVariable Long screenshotId, @RequestBody ScreenshotDTO screenshot) {
        return new ResponseEntity<ScreenshotResponseDTO>(screenshotService.updateScreenshot(screenshotId, screenshot), HttpStatus.OK);
    }
}
