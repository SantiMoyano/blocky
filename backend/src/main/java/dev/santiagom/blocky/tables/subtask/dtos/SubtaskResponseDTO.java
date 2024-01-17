package dev.santiagom.blocky.tables.subtask.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubtaskResponseDTO {
    private Long id;
    private String description;
    private Boolean isDone;
    private Long taskId;
}
