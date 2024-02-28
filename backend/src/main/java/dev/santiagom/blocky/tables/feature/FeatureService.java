package dev.santiagom.blocky.tables.feature;

import dev.santiagom.blocky.tables.category.Category;
import dev.santiagom.blocky.tables.category.CategoryRepository;
import dev.santiagom.blocky.tables.epic.Epic;
import dev.santiagom.blocky.tables.epic.EpicRepository;
import dev.santiagom.blocky.tables.epic.EpicService;
import dev.santiagom.blocky.tables.feature.dtos.FeatureDTO;
import dev.santiagom.blocky.tables.feature.dtos.FeatureResponseDTO;
import dev.santiagom.blocky.tables.task.Task;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class FeatureService {

    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private EpicRepository epicRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private EpicService epicService;

    public List<FeatureResponseDTO> allFeatures(Long epicId) {
        return featureRepository.findAllByEpic_Id(epicId)
                .stream()
                .map(f -> new FeatureResponseDTO(
                        f.getId(),
                        f.getName(),
                        f.getDescription(),
                        f.getProgress(),
                        f.getCategory().getId(),
                        f.getEpic().getId()))
                .collect(Collectors.toList());
    }

    public FeatureResponseDTO createFeature(FeatureDTO feature) {
        Epic epic = epicRepository.findById(feature.getEpicId()).orElseThrow();
        Category category = categoryRepository.findById(feature.getCategoryId()).orElseThrow();

        featureRepository.save(
                Feature.builder()
                        .name(feature.getName())
                        .description(feature.getDescription())
                        .progress(0)
                        .category(category)
                        .epic(epic)
                        .tasks(new ArrayList<Task>())
                        .build()
        );

        return new FeatureResponseDTO(null, feature.getName(), feature.getDescription(), 0, feature.getCategoryId(), feature.getEpicId());
    }

    public FeatureResponseDTO updateFeature(Long featureId, FeatureDTO feature) {
        // Retrieve the feature to be updated from the repository
        Feature featureToUpdate = featureRepository.findById(featureId).orElseThrow();

        // Update feature details with the new data
        featureToUpdate.setName(feature.getName());
        featureToUpdate.setDescription(feature.getDescription());

        // Check if a new category is selected and update the feature's category accordingly
        if (featureToUpdate.getCategory().getId() != feature.getCategoryId()) {
            Category newCategory = categoryRepository.findById(feature.getCategoryId()).orElseThrow();
            featureToUpdate.setCategory(newCategory);
        }
        featureRepository.save(featureToUpdate);

        // Return a featureResponseDTO containing the updated feature details
        return new FeatureResponseDTO(
                featureId,
                feature.getDescription(),
                feature.getName(),
                featureToUpdate.getProgress(),
                feature.getCategoryId(),
                feature.getEpicId());
    }

    public FeatureResponseDTO getFeatureDetails(Long id) {
        Feature feature = featureRepository.findById(id).orElseThrow();
        return new FeatureResponseDTO(
                feature.getId(),
                feature.getName(),
                feature.getDescription(),
                feature.getProgress(),
                feature.getCategory().getId(),
                feature.getEpic().getId());
    }

    public FeatureResponseDTO deleteFeature(Long featureId) {
        Feature feature = featureRepository.findById(featureId).orElseThrow();
        featureRepository.delete(feature);
        return new FeatureResponseDTO(
                feature.getId(),
                feature.getName(),
                feature.getDescription(),
                feature.getProgress(),
                feature.getCategory().getId(),
                feature.getEpic().getId());
    }

    public void updateProgress(Long featureId, int percentageCompleted) {
        Feature feature = featureRepository.findById(featureId).orElseThrow();
        feature.setProgress(percentageCompleted);
        featureRepository.save(feature);
        epicService.updateProgress(feature.getEpic().getId());
    }
}
