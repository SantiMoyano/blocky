package dev.santiagom.blocky.tables.tech.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TechDTO {

    private String name;
    private String color;
    private Long projectId;
}
