package dev.santiagom.blocky.tables.epic.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EpicResponseDTO {

    private String name;
    private int progress;
}