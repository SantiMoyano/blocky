package dev.santiagom.blocky.tables.task.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponseDTO {
    private String name;
    private int progress;
    private Long categoryId;
    private Long epicId;
}
