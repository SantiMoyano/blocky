package dev.santiagom.blocky.tables.epic.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EpicResponseDTO {

    private Long id;
    private String name;
    private String description;
    private int progress;
}
