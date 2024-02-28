package dev.santiagom.blocky.tables.feature;

import dev.santiagom.blocky.tables.feature.dtos.FeatureDTO;
import dev.santiagom.blocky.tables.feature.dtos.FeatureResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/feature")
@CrossOrigin(origins = {"http://localhost:3000"})
public class FeatureController {

    @Autowired
    private FeatureService featureService;

    @GetMapping("/{epicId}")
    public ResponseEntity<List<FeatureResponseDTO>> getAllFeatures(@PathVariable Long epicId) {
        return new ResponseEntity<List<FeatureResponseDTO>>(featureService.allFeatures(epicId), HttpStatus.OK);
    }
    @GetMapping("/details/{id}")
    public ResponseEntity<FeatureResponseDTO> getFeatureDetails(@PathVariable Long id) {
        return new ResponseEntity<FeatureResponseDTO>(featureService.getFeatureDetails(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<FeatureResponseDTO> createFeature(@RequestBody FeatureDTO feature) {
        return new ResponseEntity<FeatureResponseDTO>(featureService.createFeature(feature), HttpStatus.CREATED);
    }

    @PutMapping("/{featureId}")
    public ResponseEntity<FeatureResponseDTO> updateFeature(
            @PathVariable Long featureId, @RequestBody FeatureDTO feature) {
        return new ResponseEntity<FeatureResponseDTO>(featureService.updateFeature(featureId, feature), HttpStatus.OK);
    }

    @DeleteMapping("/{featureId}")
    public ResponseEntity<FeatureResponseDTO> deleteFeature(@PathVariable Long featureId) {
        return new ResponseEntity<FeatureResponseDTO>(featureService.deleteFeature(featureId), HttpStatus.OK);
    }
}
