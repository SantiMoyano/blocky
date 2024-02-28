package dev.santiagom.blocky.tables.feature.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeatureResponseDTO {
    private Long id;
    private String name;
    private String description;
    private int progress;
    private Long categoryId;
    private Long epicId;
}
