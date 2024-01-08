package dev.santiagom.blocky.tables.project.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewProjectDTO {

    private String name;
    private String description;
    private String goal;
}
