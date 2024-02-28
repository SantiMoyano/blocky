package dev.santiagom.blocky.tables.feature.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeatureDTO {

    private String name;
    private String description;
    private Long categoryId;
    private Long epicId;
}
