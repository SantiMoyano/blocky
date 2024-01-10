package dev.santiagom.blocky.tables.project.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponseDTO {

    private String name;
    private String description;
    private String goal;
    private int progress;
}
